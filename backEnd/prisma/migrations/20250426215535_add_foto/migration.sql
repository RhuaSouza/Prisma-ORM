/*
  Warnings:

  - A unique constraint covering the columns `[fotoUrl]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Usuarios" ADD COLUMN "fotoUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_fotoUrl_key" ON "Usuarios"("fotoUrl");
