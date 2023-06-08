/*
  Warnings:

  - You are about to drop the column `group` on the `Flights_data` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `hotel_data` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flights_data" DROP CONSTRAINT "Flights_data_group_fkey";

-- DropForeignKey
ALTER TABLE "hotel_data" DROP CONSTRAINT "hotel_data_group_fkey";

-- DropIndex
DROP INDEX "Flights_data_group_key";

-- DropIndex
DROP INDEX "hotel_data_group_key";

-- AlterTable
ALTER TABLE "Flights_data" DROP COLUMN "group";

-- AlterTable
ALTER TABLE "hotel_data" DROP COLUMN "group";
