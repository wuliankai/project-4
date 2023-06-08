-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("phone_number")
);

-- CreateTable
CREATE TABLE "Groups" (
    "group_id" SERIAL NOT NULL,
    "creator_id" INTEGER NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("group_id")
);

-- CreateTable
CREATE TABLE "Flights_data" (
    "id" SERIAL NOT NULL,
    "group" INTEGER NOT NULL,
    "flight_to_dest_number" TEXT NOT NULL,
    "flight_to_home_number" TEXT NOT NULL,

    CONSTRAINT "Flights_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flight_to_home_data" (
    "flight_number" TEXT NOT NULL,
    "airport" TEXT NOT NULL,
    "terminal" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flight_to_home_data_pkey" PRIMARY KEY ("flight_number")
);

-- CreateTable
CREATE TABLE "flight_to_dest_data" (
    "flight_number" TEXT NOT NULL,
    "airport" TEXT NOT NULL,
    "terminal" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flight_to_dest_data_pkey" PRIMARY KEY ("flight_number")
);

-- CreateTable
CREATE TABLE "hotel_data" (
    "group" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "room_number" TEXT NOT NULL,

    CONSTRAINT "hotel_data_pkey" PRIMARY KEY ("location")
);

-- CreateTable
CREATE TABLE "_GroupsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Groups_creator_id_key" ON "Groups"("creator_id");

-- CreateIndex
CREATE UNIQUE INDEX "Flights_data_group_key" ON "Flights_data"("group");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_data_group_key" ON "hotel_data"("group");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupsToUser_AB_unique" ON "_GroupsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupsToUser_B_index" ON "_GroupsToUser"("B");

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights_data" ADD CONSTRAINT "Flights_data_group_fkey" FOREIGN KEY ("group") REFERENCES "Groups"("group_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights_data" ADD CONSTRAINT "Flights_data_flight_to_dest_number_fkey" FOREIGN KEY ("flight_to_dest_number") REFERENCES "flight_to_dest_data"("flight_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights_data" ADD CONSTRAINT "Flights_data_flight_to_home_number_fkey" FOREIGN KEY ("flight_to_home_number") REFERENCES "flight_to_home_data"("flight_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_data" ADD CONSTRAINT "hotel_data_group_fkey" FOREIGN KEY ("group") REFERENCES "Groups"("group_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupsToUser" ADD CONSTRAINT "_GroupsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Groups"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupsToUser" ADD CONSTRAINT "_GroupsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("phone_number") ON DELETE CASCADE ON UPDATE CASCADE;
