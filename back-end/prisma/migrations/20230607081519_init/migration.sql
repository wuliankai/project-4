-- CreateTable
CREATE TABLE "exchange_rate" (
    "id" SERIAL NOT NULL,
    "exchange_rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "exchange_rate_pkey" PRIMARY KEY ("id")
);
