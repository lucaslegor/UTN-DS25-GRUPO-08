import { z } from "zod";

// POST /api/carritos
export const crearCarritoSchema = z.object({
  // Si el usuario está autenticado, el idUsuario puede venir del token
  idUsuario: z.number().int().positive().optional(),
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      cantidad: z.number().int().positive().default(1),
    })
  ).min(1, "Debe indicar al menos un ítem"),
});

// PATCH /api/carritos/:idCarrito/items/:productId
export const setItemCantidadSchema = z.object({
  cantidad: z.number().int().positive(),
});

// POST /api/carritos/:idCarrito/items
export const addItemSchema = z.object({
  productId: z.number().int().positive(),
  cantidad: z.number().int().positive().default(1),
});
