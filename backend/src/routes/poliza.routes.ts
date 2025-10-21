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

// Aplicar autenticación a todas las rutas de pólizas
router.use(authenticate);

// Rutas que requieren solo autenticación (todos los usuarios autenticados)
router.get('/', polizaController.getAllPolizas);
router.get('/:id', polizaController.getPolizaById);
router.post('/:idSolicitud', uploadPoliza.single('file'), polizaController.createPoliza);

// Rutas que requieren rol ADMIN
// Permitir reemplazo de archivo de póliza vía multipart/form-data en PUT
router.put(
  '/:id',
  authorize('ADMINISTRADOR'),
  uploadPoliza.single('file'),
  // Si tu actualización también soporta campos JSON, puedes volver a agregar validate aquí
  // validate(actualizarPolizaSchema),
  polizaController.updatePoliza
);
router.delete('/:id', authorize('ADMINISTRADOR'), polizaController.deletePoliza);

export const polizaRoutes = router;
