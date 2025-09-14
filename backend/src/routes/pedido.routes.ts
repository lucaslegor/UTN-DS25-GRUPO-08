import { Router } from "express";
import * as pedidoController from "../controllers/pedido.controller";
import { validate } from "../middlewares/validation.middleware";
import { createPedidoSchema, updatePedidoSchema } from "../validations/pedidos.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, authorize("ADMIN", "USER"), pedidoController.listarPedidos);
router.get("/:id", authenticate, authorize("ADMIN", "USER"), pedidoController.obtenerPedidoPorId);
router.post("/", authenticate, authorize("USER", "ADMIN"), validate(createPedidoSchema), pedidoController.crearPedido);
router.put("/:id", authenticate, authorize("ADMIN"), validate(updatePedidoSchema), pedidoController.actualizarPedido);
router.delete("/:id", authenticate, authorize("ADMIN"), pedidoController.eliminarPedido);

export default router;
