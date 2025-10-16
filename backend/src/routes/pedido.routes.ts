import { Router } from "express";
import * as pedidoController from "../controllers/pedido.controller";
import { validate } from "../middlewares/validation.middleware";
import { crearPedidoSchema, actualizarPedidoSchema} from "../validations/pedidos.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, authorize("ADMINISTRADOR", "USUARIO"), pedidoController.listarPedidos);
router.get("/:id", authenticate, authorize("ADMINISTRADOR", "USUARIO"), pedidoController.obtenerPedidoPorId);
router.post("/", authenticate, authorize("USUARIO", "ADMINISTRADOR"), validate(crearPedidoSchema), pedidoController.crearPedido);
router.put("/:id", authenticate, authorize("ADMINISTRADOR"), validate(crearPedidoSchema), pedidoController.actualizarPedido);
router.delete("/:id", authenticate, authorize("ADMINISTRADOR"), pedidoController.eliminarPedido);

export default router;
