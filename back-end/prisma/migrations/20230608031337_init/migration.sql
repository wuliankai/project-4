/*
  Warnings:

  - The primary key for the `hotel_data` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "hotel_data" DROP CONSTRAINT "hotel_data_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "hotel_data_pkey" PRIMARY KEY ("id");
