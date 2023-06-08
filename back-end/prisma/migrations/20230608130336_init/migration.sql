/*
  Warnings:

  - Added the required column `userPhone` to the `diary_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diary_entries" ADD COLUMN     "userPhone" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "diary_entries" ADD CONSTRAINT "diary_entries_userPhone_fkey" FOREIGN KEY ("userPhone") REFERENCES "User"("phone_number") ON DELETE RESTRICT ON UPDATE CASCADE;
