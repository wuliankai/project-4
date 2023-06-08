/*
  Warnings:

  - The primary key for the `flight_to_dest_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `flight_to_home_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Flights_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flights_data" DROP CONSTRAINT "Flights_data_flight_to_dest_number_fkey";

-- DropForeignKey
ALTER TABLE "Flights_data" DROP CONSTRAINT "Flights_data_flight_to_home_number_fkey";

-- AlterTable
ALTER TABLE "flight_to_dest_data" DROP CONSTRAINT "flight_to_dest_data_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "flight_to_dest_data_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "flight_to_home_data" DROP CONSTRAINT "flight_to_home_data_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "flight_to_home_data_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Flights_data";
