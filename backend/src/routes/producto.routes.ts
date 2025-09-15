import { Router } from "express";
import * as productoController from "../controllers/producto.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  crearProductoSchema,
  actualizarProductoSchema,
} from "../validations/producto.validation";

const router = Router();

router.get("/", productoController.getAllProducts);
router.get("/:id", productoController.getProductById);
router.post("/", validate(crearProductoSchema), productoController.createProduct);
router.put("/:id", validate(actualizarProductoSchema), productoController.updateProduct);
router.delete("/:id", productoController.deleteProduct);

export const productoRoutes = router;
