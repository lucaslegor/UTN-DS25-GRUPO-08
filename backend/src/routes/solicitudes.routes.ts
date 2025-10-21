import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import * as solicitudesController from "../controllers/solicitudes.controller";

const router = Router();

// Obtener todas las solicitudes del usuario autenticado
router.get("/", authenticate, solicitudesController.obtenerSolicitudes);

// Obtener solicitudes de un usuario específico (solo admin)
router.get("/usuario/:idUsuario", authenticate, authorize(["ADMINISTRADOR"]), solicitudesController.obtenerSolicitudesPorUsuario);

// Obtener solicitud por ID
router.get("/:id", authenticate, solicitudesController.obtenerSolicitudPorId);

// Crear nueva solicitud
router.post("/", authenticate, solicitudesController.crearSolicitud);

// Actualizar solicitud
router.put("/:id", authenticate, solicitudesController.actualizarSolicitud);

// Eliminar solicitud
router.delete("/:id", authenticate, solicitudesController.eliminarSolicitud);

export { router as solicitudesRoutes };
