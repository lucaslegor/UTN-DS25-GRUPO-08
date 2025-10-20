// src/routes/cart.routes.ts
import { Router } from 'express';
import * as ctrl from '../controllers/carrito.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { crearCarritoSchema, addItemSchema, setItemCantidadSchema } from '../validations/carrito.validation';

const router = Router();

// Admin/debug
router.get('/', authenticate, authorize('ADMINISTRADOR'), ctrl.listAll);

// Crear carrito (devuelve idCarrito)
router.post('/', authenticate, authorize('USUARIO', 'ADMINISTRADOR'), validate(crearCarritoSchema), ctrl.createCart);

// Operaciones sobre un carrito
router.get('/:idCarrito', authenticate, authorize('USUARIO', 'ADMINISTRADOR'), ctrl.getCart);
router.delete('/:idCarrito', authenticate, authorize('USUARIO', 'ADMINISTRADOR'), ctrl.deleteCart);

// Ítems
router.post('/:idCarrito/items', authenticate, authorize('USUARIO', 'ADMINISTRADOR'), validate(addItemSchema), ctrl.addItem);
router.patch('/:idCarrito/items/:productId', authenticate, authorize('USUARIO', 'ADMINISTRADOR'), validate(setItemCantidadSchema), ctrl.setItemCantidad);
router.delete('/:idCarrito/items/:productId', authenticate, authorize('USUARIO', 'ADMINISTRADOR'), ctrl.removeItem);
router.delete('/:idCarrito/items', authenticate, authorize('USUARIO', 'ADMINISTRADOR'), ctrl.clearItems);

export default router;
