import { Router } from "express";
import prisma from "../config/prisma";
import { crearUsuarioSchema } from "../validations/usuarios.validation";
import bcrypt from "bcryptjs";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validateRecaptcha } from "../middlewares/recaptcha.middleware";

const usuariosRoutes = Router();

// POST /api/usuarios (registro)
usuariosRoutes.post("/", validateRecaptcha, async (req, res) => {
  const parsed = crearUsuarioSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validación inválida",
      issues: parsed.error.flatten(),
    });
  }

  try {
    const { username, mail, password, rol } = parsed.data;

    const existsU = await prisma.usuario.findUnique({ where: { username } });
    if (existsU) return res.status(400).json({ message: "El nombre de usuario ya existe" });

    const existsM = await prisma.usuario.findUnique({ where: { mail } });
    if (existsM) return res.status(400).json({ message: "El email ya está registrado" });

    const passwordHash = await bcrypt.hash(password, 10);

    const created = await prisma.usuario.create({
      data: {
        username: username.trim(),
        mail: mail.trim().toLowerCase(),
        passwordHash,
        rol: (rol ?? "USUARIO") as any,  // valor de DB
      },
    });

    return res.status(201).json({
      usuario: {
        idUsuario: created.id,
        username: created.username,
        mail: created.mail,
        rol: created.rol,
        createdAt: created.createdAt,
      },
      message: "Usuario creado",
    });
  } catch {
    return res.status(500).json({ message: "Error" });
  }
});

// GET /api/usuarios (sólo ADMINISTRADOR)
usuariosRoutes.get("/", authenticate, authorize("ADMINISTRADOR"), async (_req, res) => {
  const rows = await prisma.usuario.findMany({ orderBy: { id: "asc" } });
  const list = rows.map((u) => ({
    idUsuario: u.id, 
    username: u.username, 
    mail: u.mail, 
    rol: u.rol,
    createdAt: u.createdAt
  }));
  return res.json({ usuarios: list });
});

// GET /api/usuarios/:username (sólo ADMINISTRADOR)
usuariosRoutes.get("/:username", authenticate, authorize("ADMINISTRADOR"), async (req, res) => {
  const row = await prisma.usuario.findUnique({ where: { username: req.params.username } });
  if (!row) return res.status(404).json({ message: "No encontrado" });
  return res.json({
    usuario: {
      idUsuario: row.id, 
      username: row.username, 
      mail: row.mail, 
      rol: row.rol,
      createdAt: row.createdAt
    }
  });
});

// PUT /api/usuarios/:id (sólo ADMINISTRADOR)
usuariosRoutes.put("/:id", authenticate, authorize("ADMINISTRADOR"), async (req, res) => {
  try {
    const { rol } = req.body;
    
    if (!rol || !['ADMINISTRADOR', 'USUARIO'].includes(rol)) {
      return res.status(400).json({ message: "Rol inválido. Debe ser 'ADMINISTRADOR' o 'USUARIO'" });
    }

    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    const updated = await prisma.usuario.update({
      where: { id: userId },
      data: { rol: rol as any },
      select: {
        id: true,
        username: true,
        mail: true,
        rol: true,
        createdAt: true
      }
    });

    return res.json({
      usuario: {
        idUsuario: updated.id,
        username: updated.username,
        mail: updated.mail,
        rol: updated.rol,
        createdAt: updated.createdAt
      },
      message: "Usuario actualizado"
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
  }
});

export default usuariosRoutes;
