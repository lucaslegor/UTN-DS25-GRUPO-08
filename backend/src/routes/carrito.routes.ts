// src/routes/cart.routes.ts
import { Router } from 'express';
import * as ctrl from '../controllers/carrito.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { crearCarritoSchema, addItemSchema, setItemCantidadSchema } from '../validations/carrito.validation';

const router = Router();

// Admin/debug
router.get('/', authenticate, authorize('ADMIN'), ctrl.listAll);

// Crear carrito (devuelve idCarrito)
router.post('/', authenticate, authorize('USER', 'ADMIN'), validate(crearCarritoSchema), ctrl.createCart);

// Operaciones sobre un carrito
router.get('/:idCarrito', authenticate, authorize('USER', 'ADMIN'), ctrl.getCart);
router.delete('/:idCarrito', authenticate, authorize('USER', 'ADMIN'), ctrl.deleteCart);

// Ítems
router.post('/:idCarrito/items', authenticate, authorize('USER', 'ADMIN'), validate(addItemSchema), ctrl.addItem);
router.patch('/:idCarrito/items/:productId', authenticate, authorize('USER', 'ADMIN'), validate(setItemCantidadSchema), ctrl.setItemCantidad);
router.delete('/:idCarrito/items/:productId', authenticate, authorize('USER', 'ADMIN'), ctrl.removeItem);
router.delete('/:idCarrito/items', authenticate, authorize('USER', 'ADMIN'), ctrl.clearItems);

export default router;
