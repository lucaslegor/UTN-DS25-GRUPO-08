/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mail` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "mail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_mail_key" ON "public"."Usuario"("mail");
