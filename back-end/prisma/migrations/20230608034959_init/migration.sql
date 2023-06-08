-- AlterTable
ALTER TABLE "flight_to_dest_data" ALTER COLUMN "terminal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "flight_to_home_data" ALTER COLUMN "terminal" DROP NOT NULL;
