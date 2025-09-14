// src/routes/cart.routes.ts
import { Router } from 'express';
import * as ctrl from '../controllers/carrito.controller';

const router = Router();

// Admin/debug
router.get('/', ctrl.listAll);

// Crear carrito (devuelve idCarrito)
router.post('/', ctrl.createCart);

// Operaciones sobre un carrito
router.get('/:idCarrito', ctrl.getCart);
router.delete('/:idCarrito', ctrl.deleteCart);

// Ítems
router.post('/:idCarrito/items', ctrl.addItem); 
router.patch('/:idCarrito/items/:productId', ctrl.setItemCantidad); 
router.delete('/:idCarrito/items/:productId', ctrl.removeItem);
router.delete('/:idCarrito/items', ctrl.clearItems);

export default router;
