import { Router } from "express";
import { enviarContacto } from "../services/email.service";

const router = Router();

// POST /api/email/contacto - Enviar mensaje desde formulario de contacto público
router.post("/contacto", async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
        errors: {
          nombre: !nombre ? "El nombre es requerido" : undefined,
          email: !email ? "El email es requerido" : undefined,
          mensaje: !mensaje ? "El mensaje es requerido" : undefined,
        },
      });
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "El formato del email no es válido",
      });
    }

    // Enviar el correo
    await enviarContacto(nombre.trim(), email.trim(), mensaje.trim());

    return res.status(200).json({
      message: "Mensaje enviado con éxito",
      ok: true,
    });
  } catch (error: any) {
    console.error("Error en ruta de contacto:", error);
    return res.status(500).json({
      message: "Error al enviar el mensaje. Por favor, intentá más tarde.",
      error: error.message,
    });
  }
});

export { router as emailRoutes };

