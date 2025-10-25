import { Router } from "express";
import * as productoController from "../controllers/producto.controller";
import { validate } from "../middlewares/validation.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  crearProductoSchema,
  actualizarProductoSchema,
} from "../validations/producto.validation";
import { uploadProducto } from "../middlewares/upload.middleware";

const router = Router();

// Rutas públicas (accesibles sin autenticación)
router.get("/", productoController.getAllProducts);
router.get("/:id", productoController.getProductById);

// Rutas protegidas (solo administradores)
router.post("/", authenticate, authorize("ADMINISTRADOR"), uploadProducto.single('image'), validate(crearProductoSchema), productoController.createProduct);
router.put("/:id", authenticate, authorize("ADMINISTRADOR"), uploadProducto.single('image'), validate(actualizarProductoSchema), productoController.updateProduct);
router.delete("/:id", authenticate, authorize("ADMINISTRADOR"), productoController.deleteProduct);

export const productoRoutes = router;
