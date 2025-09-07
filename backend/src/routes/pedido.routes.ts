import { Router } from "express";
import * as ctrl from "../controllers/pedido.controller";
import { validate } from "../middlewares/validation.middleware";
import { crearPedidoSchema, actualizarPedidoSchema } from "../validations/pedidos.validation";

const router = Router();
router.get("/", ctrl.listarPedidos);
router.get("/:id", ctrl.obtenerPedidoPorId);
router.post("/", validate(crearPedidoSchema), ctrl.crearPedido);   // 👈 importante
router.put("/:id", validate(actualizarPedidoSchema), ctrl.actualizarPedido);
router.delete("/:id", ctrl.eliminarPedido);

export const pedidoRoutes = router;
