/*
  Warnings:

  - You are about to drop the column `driverId` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `enterpriseId` on the `vehicles` table. All the data in the column will be lost.
  - Changed the type of `status` on the `vehicles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_driverId_fkey";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "driverId",
DROP COLUMN "enterpriseId",
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL;
