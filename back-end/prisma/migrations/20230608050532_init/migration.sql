/*
  Warnings:

  - You are about to drop the column `terminal` on the `flight_to_dest_data` table. All the data in the column will be lost.
  - You are about to drop the column `terminal` on the `flight_to_home_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flight_to_dest_data" DROP COLUMN "terminal",
ALTER COLUMN "date_time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "flight_to_home_data" DROP COLUMN "terminal";
