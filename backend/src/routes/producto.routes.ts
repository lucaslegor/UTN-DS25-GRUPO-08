import { Router } from "express";
import * as productoController from "../controllers/producto.controller";
import { validate } from "../middlewares/validation.middleware";
import { crearProductoSchema, actualizarProductoSchema } from "../validations/producto.validation";
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get("/",authorize('USER', 'ADMIN'), productoController.getAllProducts);
router.get("/:id",authorize('USER', 'ADMIN'), productoController.getProductById);
router.post("/",authorize('ADMIN'), validate(crearProductoSchema), productoController.createProduct);
router.put("/:id",authorize('ADMIN'), validate(actualizarProductoSchema), productoController.updateProduct);
router.delete("/:id",authorize('ADMIN'), productoController.deleteProduct);

export const productoRoutes = router;
