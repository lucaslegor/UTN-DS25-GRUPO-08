import { Router } from "express";
import * as pagoController from '../controllers/pago.controller'

const router = Router();

// Rutas CRUD básicas
router.get('/', pagoController.getAllPagos);
router.get('/:id', pagoController.getPagoById);
router.post('/', pagoController.createPago);
router.put('/:id', pagoController.updatePago);
router.delete('/:id', pagoController.deletePago);

// Rutas adicionales específicas de pago
router.get('/pedido/:idPedido', pagoController.getPagosByPedido);
router.patch('/:id/estado', pagoController.updatePagoEstado);
router.post('/webhook', pagoController.procesarWebhook);

export const pagoRoutes = router;
