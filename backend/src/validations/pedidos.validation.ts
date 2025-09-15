import { z } from "zod";

export const estadoPedidoEnum = z.enum([
  "CREADO",
  "PENDIENTE_POLIZA",
  "POLIZA_CARGADA",
  "PAGO_PENDIENTE",
  "PAGO_APROBADO",
  "PAGO_RECHAZADO",
  "CANCELADO",
]);

// POST /api/pedidos
export const crearPedidoSchema = z.object({
  idUsuario: z.number().int().positive().optional(),
  moneda: z.literal("ARS"),
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      cantidad: z.number().int().positive().default(1),
    })
  ).min(1, "Debe indicar al menos un ítem"),
});

// PUT /api/pedidos/:id
export const actualizarPedidoSchema = z.object({
  estado: estadoPedidoEnum.optional(),
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      cantidad: z.number().int().positive().default(1),
    })
  ).optional(),
}).refine((body) => body.estado || body.items, {
  path: ["estado"],
  message: "Debe enviar al menos 'estado' o 'items'",
});
