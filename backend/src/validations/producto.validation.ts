// src/validations/producto.validation.ts
import { z } from "zod";

export const tipoSeguroEnum = z.enum(["auto", "hogar", "vida", "salud"]);

// Crear
export const crearProductoSchema = z.object({
  titulo: z
    .string()
    .min(1, "El título es requerido")
    .max(100, "El título no puede exceder 100 caracteres")
    .trim(),
  descripcion: z
    .string()
    .min(1, "La descripción es requerida")
    .max(500, "La descripción no puede exceder 500 caracteres")
    .trim(),
  cobertura: z
    .string()
    .min(1, "La cobertura es requerida")
    .max(200, "La cobertura no puede exceder 200 caracteres")
    .trim(),
  tipo: tipoSeguroEnum,
  // Si tu body llega como "true"/"false", coerce ayuda
  isActive: z.coerce.boolean().default(true),
});

// Actualizar (todo opcional)
export const actualizarProductoSchema = crearProductoSchema.partial();
