import { Router } from 'express';
import * as polizaController from '../controllers/poliza.controller';

const router = Router();

router.get('/', polizaController.getAllPolizas);
router.get('/:id', polizaController.getPolizaById);
router.post('/:idPedido', polizaController.createPoliza);
router.put('/:id', polizaController.updatePoliza);
router.delete('/:id', polizaController.deletePoliza);

export const polizaRoutes = router;
