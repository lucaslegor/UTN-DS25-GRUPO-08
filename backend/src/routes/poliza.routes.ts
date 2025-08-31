import { Router } from 'express';
import * as polizaController from '../controllers/poliza.controller';
import { validate } from '../middlewares/validation.middleware';
import { 
  crearPolizaSchema, 
  actualizarPolizaSchema
} from '../validations/poliza.validation';

const router = Router();

router.get('/', polizaController.getAllPolizas);
router.get('/:id', polizaController.getPolizaById);
router.post('/:idPedido', validate(crearPolizaSchema), polizaController.createPoliza);
router.put('/:id', validate(actualizarPolizaSchema), polizaController.updatePoliza);
router.delete('/:id', polizaController.deletePoliza);

export const polizaRoutes = router;
