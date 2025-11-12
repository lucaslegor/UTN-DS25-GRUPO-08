import { Router } from 'express';
import * as polizaController from '../controllers/poliza.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { 
  crearPolizaSchema, 
  actualizarPolizaSchema
} from '../validations/poliza.validation';
import { uploadPoliza } from '../middlewares/upload.middleware';

const router = Router();

router.use(authenticate);

router.get('/', polizaController.getAllPolizas);
router.get('/:id', polizaController.getPolizaById);
router.post('/:idSolicitud', uploadPoliza.single('file'), polizaController.createPoliza);

router.put(
  '/:id',
  authorize('ADMINISTRADOR'),
  uploadPoliza.single('file'),
  polizaController.updatePoliza
);
router.delete('/:id', authorize('ADMINISTRADOR'), polizaController.deletePoliza);

export const polizaRoutes = router;
