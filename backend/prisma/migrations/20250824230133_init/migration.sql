-- CreateEnum
CREATE TYPE "public"."RolUsuario" AS ENUM ('ADMINISTRADOR', 'USUARIO');

-- CreateEnum
CREATE TYPE "public"."TipoSeguro" AS ENUM ('AUTO', 'HOGAR', 'VIDA', 'SALUD');

-- CreateEnum
CREATE TYPE "public"."EstadoPoliza" AS ENUM ('PENDIENTE', 'CARGADA');

-- CreateEnum
CREATE TYPE "public"."EstadoPedido" AS ENUM ('CREADO', 'PENDIENTE_POLIZA', 'POLIZA_CARGADA', 'PAGO_PENDIENTE', 'PAGO_APROBADO', 'PAGO_RECHAZADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."Moneda" AS ENUM ('ARS');

-- CreateEnum
CREATE TYPE "public"."PasarelaPago" AS ENUM ('MERCADOPAGO');

-- CreateEnum
CREATE TYPE "public"."EstadoPago" AS ENUM ('CREADO', 'PENDIENTE', 'APROBADO', 'RECHAZADO', 'CANCELADO');

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" "public"."RolUsuario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdminProfile" (
    "idAdmin" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "activo" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("idAdmin")
);

-- CreateTable
CREATE TABLE "public"."Producto" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" MONEY NOT NULL,
    "cobertura" TEXT NOT NULL,
    "tipo" "public"."TipoSeguro" NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Poliza" (
    "id" SERIAL NOT NULL,
    "idPedido" INTEGER NOT NULL,
    "archivoUrl" TEXT NOT NULL,
    "estado" "public"."EstadoPoliza" NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poliza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PedidoItem" (
    "idProducto" INTEGER NOT NULL,
    "idPedido" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "precio" MONEY NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "PedidoItem_pkey" PRIMARY KEY ("idPedido","idProducto")
);

-- CreateTable
CREATE TABLE "public"."Pedido" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "subtotal" MONEY NOT NULL,
    "total" MONEY NOT NULL,
    "moneda" "public"."Moneda" NOT NULL DEFAULT 'ARS',
    "estado" "public"."EstadoPedido" NOT NULL DEFAULT 'CREADO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CarritoItem" (
    "idProducto" INTEGER NOT NULL,
    "idCarrito" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CarritoItem_pkey" PRIMARY KEY ("idCarrito","idProducto")
);

-- CreateTable
CREATE TABLE "public"."Carrito" (
    "id" SERIAL NOT NULL,
    "total" MONEY NOT NULL DEFAULT 0,
    "moneda" "public"."Moneda" NOT NULL DEFAULT 'ARS',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pago" (
    "id" SERIAL NOT NULL,
    "idPedido" INTEGER NOT NULL,
    "pasarela" "public"."PasarelaPago" NOT NULL,
    "estado" "public"."EstadoPago" NOT NULL,
    "monto" MONEY NOT NULL,
    "moneda" "public"."Moneda" NOT NULL DEFAULT 'ARS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "public"."Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_idUsuario_key" ON "public"."AdminProfile"("idUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_email_key" ON "public"."AdminProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Poliza_idPedido_key" ON "public"."Poliza"("idPedido");

-- CreateIndex
CREATE UNIQUE INDEX "Pago_idPedido_key" ON "public"."Pago"("idPedido");

-- AddForeignKey
ALTER TABLE "public"."AdminProfile" ADD CONSTRAINT "AdminProfile_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Poliza" ADD CONSTRAINT "Poliza_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "public"."Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoItem" ADD CONSTRAINT "PedidoItem_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoItem" ADD CONSTRAINT "PedidoItem_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "public"."Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pedido" ADD CONSTRAINT "Pedido_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CarritoItem" ADD CONSTRAINT "CarritoItem_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CarritoItem" ADD CONSTRAINT "CarritoItem_idCarrito_fkey" FOREIGN KEY ("idCarrito") REFERENCES "public"."Carrito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pago" ADD CONSTRAINT "Pago_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "public"."Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
