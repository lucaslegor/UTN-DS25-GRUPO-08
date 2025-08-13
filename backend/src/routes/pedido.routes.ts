// ## Archivo   src/routes/pedido.routes.ts
import { Router } from 'express';
import * as pedidoController from '../controllers/pedido.controller';

const router = Router();

// GET /api/pedidos
router.get('/', pedidoController.getAllPedidos);

// GET /api/pedidos/:id
router.get('/:id', pedidoController.getPedidoById);

// POST /api/pedidos
router.post('/', pedidoController.createPedido);

// PUT /api/pedidos/:id
router.put('/:id', pedidoController.updatePedido);

export const pedidoRoutes = router;
