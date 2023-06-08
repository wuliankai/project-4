-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_creator_id_fkey";

-- DropIndex
DROP INDEX "Groups_creator_id_key";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("phone_number") ON DELETE RESTRICT ON UPDATE CASCADE;
