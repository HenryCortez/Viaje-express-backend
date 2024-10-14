/*
  Warnings:

  - You are about to drop the column `dataFile` on the `drivers` table. All the data in the column will be lost.
  - Added the required column `id_card` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "dataFile",
ADD COLUMN     "id_card" TEXT NOT NULL;
