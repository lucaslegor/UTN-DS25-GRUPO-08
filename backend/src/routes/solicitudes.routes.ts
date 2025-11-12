import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import * as solicitudesController from "../controllers/solicitudes.controller";

const router = Router();

router.get("/", authenticate, solicitudesController.obtenerSolicitudes);
router.get("/usuario/:idUsuario", authenticate, authorize("ADMINISTRADOR"), solicitudesController.obtenerSolicitudesPorUsuario);
router.get("/:id", authenticate, solicitudesController.obtenerSolicitudPorId);
router.post("/", authenticate, solicitudesController.crearSolicitud);
router.put("/:id", authenticate, solicitudesController.actualizarSolicitud);
router.delete("/:id", authenticate, solicitudesController.eliminarSolicitud);

export { router as solicitudesRoutes };
