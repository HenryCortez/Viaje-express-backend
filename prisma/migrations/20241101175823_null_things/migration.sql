-- DropForeignKey
ALTER TABLE "travels" DROP CONSTRAINT "travels_assignmentHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "travels" DROP CONSTRAINT "travels_routeId_fkey";

-- AlterTable
ALTER TABLE "travels" ALTER COLUMN "assignmentHistoryId" DROP NOT NULL,
ALTER COLUMN "routeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "travels" ADD CONSTRAINT "travels_assignmentHistoryId_fkey" FOREIGN KEY ("assignmentHistoryId") REFERENCES "assignment_histories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travels" ADD CONSTRAINT "travels_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Routes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
