import { z } from "zod";

export const estadoPolizaEnum = z.enum(["PENDIENTE", "CARGADA"]);

export const crearPolizaSchema = z.object({
  archivoUrl: z.string().url("La URL del archivo debe ser válida"),
});

export const actualizarPolizaSchema = crearPolizaSchema.partial().extend({
  estado: estadoPolizaEnum.optional(),
});
