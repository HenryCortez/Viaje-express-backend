/*
  Warnings:

  - A unique constraint covering the columns `[id_card]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "drivers" ALTER COLUMN "status" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "drivers_id_card_key" ON "drivers"("id_card");
