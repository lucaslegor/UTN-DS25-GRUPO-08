// ## Archivo   src/routes/pedido.routes.ts
import { Router } from 'express';
import * as pedidoController from '../controllers/pedido.controller';

const router = Router();

// GET /api/pedidos
router.get('/', pedidoController.listarPedidos);

// GET /api/pedidos/:id
router.get('/:id', pedidoController.obtenerPedidoPorId);

// POST /api/pedidos
router.post('/', pedidoController.crearPedido);

// PUT /api/pedidos/:id
router.put('/:id', pedidoController.actualizarPedido);

export const pedidoRoutes = router;
