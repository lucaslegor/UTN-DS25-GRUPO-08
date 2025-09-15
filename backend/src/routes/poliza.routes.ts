import { Router } from 'express';
import * as polizaController from '../controllers/poliza.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { 
  crearPolizaSchema, 
  actualizarPolizaSchema
} from '../validations/poliza.validation';

const router = Router();

// Aplicar autenticación a todas las rutas de pólizas
router.use(authenticate);

// Rutas que requieren solo autenticación (todos los usuarios autenticados)
router.get('/', polizaController.getAllPolizas);
router.get('/:id', polizaController.getPolizaById);
router.post('/:idPedido', validate(crearPolizaSchema), polizaController.createPoliza);

// Rutas que requieren rol ADMIN
router.put('/:id', authorize('ADMIN'), validate(actualizarPolizaSchema), polizaController.updatePoliza);
router.delete('/:id', authorize('ADMIN'), polizaController.deletePoliza);

export const polizaRoutes = router;
