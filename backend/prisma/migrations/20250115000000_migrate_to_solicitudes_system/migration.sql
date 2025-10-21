-- Migración del sistema de pagos al sistema de solicitudes
-- Esta migración transforma la base de datos del sistema de e-commerce al sistema de solicitudes

-- 1. Crear nuevos enums para el sistema de solicitudes
CREATE TYPE "public"."EstadoSolicitud" AS ENUM ('CREADA', 'PENDIENTE_POLIZA', 'POLIZA_CARGADA', 'APROBADA', 'RECHAZADA', 'CANCELADA');

-- 2. Agregar columna mail a Usuario si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Usuario' AND column_name = 'mail') THEN
        ALTER TABLE "public"."Usuario" ADD COLUMN "mail" TEXT;
        CREATE UNIQUE INDEX "Usuario_mail_key" ON "public"."Usuario"("mail");
    END IF;
END $$;

-- 3. Agregar columna imagenUrl a Producto si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Producto' AND column_name = 'imagenUrl') THEN
        ALTER TABLE "public"."Producto" ADD COLUMN "imagenUrl" TEXT;
    END IF;
END $$;

-- 4. Eliminar columna precio de Producto
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Producto' AND column_name = 'precio') THEN
        ALTER TABLE "public"."Producto" DROP COLUMN "precio";
    END IF;
END $$;

-- 5. Crear tabla SolicitudItem
CREATE TABLE IF NOT EXISTS "public"."SolicitudItem" (
    "idProducto" INTEGER NOT NULL,
    "idSolicitud" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    CONSTRAINT "SolicitudItem_pkey" PRIMARY KEY ("idSolicitud","idProducto")
);

-- 6. Crear tabla Solicitud
CREATE TABLE IF NOT EXISTS "public"."Solicitud" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "estado" "public"."EstadoSolicitud" NOT NULL DEFAULT 'CREADA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "datosPersonales" JSONB,
    "notaRechazo" TEXT,
    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- 7. Modificar tabla Poliza para usar idSolicitud en lugar de idPedido
DO $$ 
BEGIN
    -- Primero eliminar la foreign key existente
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Poliza_idPedido_fkey') THEN
        ALTER TABLE "public"."Poliza" DROP CONSTRAINT "Poliza_idPedido_fkey";
    END IF;
    
    -- Eliminar la columna idPedido si existe
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Poliza' AND column_name = 'idPedido') THEN
        ALTER TABLE "public"."Poliza" DROP COLUMN "idPedido";
    END IF;
    
    -- Agregar columna idSolicitud si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Poliza' AND column_name = 'idSolicitud') THEN
        ALTER TABLE "public"."Poliza" ADD COLUMN "idSolicitud" INTEGER;
    END IF;
    
    -- Crear foreign key para idSolicitud
    ALTER TABLE "public"."Poliza" ADD CONSTRAINT "Poliza_idSolicitud_fkey" FOREIGN KEY ("idSolicitud") REFERENCES "public"."Solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    
    -- Crear índice único para idSolicitud
    CREATE UNIQUE INDEX IF NOT EXISTS "Poliza_idSolicitud_key" ON "public"."Poliza"("idSolicitud");
END $$;

-- 8. Agregar foreign keys para SolicitudItem
ALTER TABLE "public"."SolicitudItem" ADD CONSTRAINT "SolicitudItem_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."SolicitudItem" ADD CONSTRAINT "SolicitudItem_idSolicitud_fkey" FOREIGN KEY ("idSolicitud") REFERENCES "public"."Solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 9. Agregar foreign key para Solicitud
ALTER TABLE "public"."Solicitud" ADD CONSTRAINT "Solicitud_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 10. Eliminar tablas del sistema de pagos (opcional - comentado para preservar datos)
-- DROP TABLE IF EXISTS "public"."Pago";
-- DROP TABLE IF EXISTS "public"."CarritoItem";
-- DROP TABLE IF EXISTS "public"."Carrito";
-- DROP TABLE IF EXISTS "public"."PedidoItem";
-- DROP TABLE IF EXISTS "public"."Pedido";

-- 11. Eliminar enums del sistema de pagos (opcional - comentado para preservar datos)
-- DROP TYPE IF EXISTS "public"."EstadoPedido";
-- DROP TYPE IF EXISTS "public"."Moneda";
-- DROP TYPE IF EXISTS "public"."PasarelaPago";
-- DROP TYPE IF EXISTS "public"."EstadoPago";
