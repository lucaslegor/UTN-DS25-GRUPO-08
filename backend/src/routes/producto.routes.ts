import { Router } from "express";
import * as productoController from '../controllers/producto.controller'

const router = Router();

router.get('/',productoController.getAllProducts);
router.get('/:id',productoController.getProductById);
router.post('/',productoController.createProduct);
router.put('/:id',productoController.updateProduct);
router.delete('/:id',productoController.deleteProduct);

export const productoRoutes = router;