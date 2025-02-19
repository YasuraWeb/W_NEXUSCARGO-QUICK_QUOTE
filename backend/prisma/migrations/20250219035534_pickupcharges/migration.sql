-- CreateTable
CREATE TABLE "PickupCharges" (
    "id" SERIAL NOT NULL,
    "suburb" VARCHAR(255) NOT NULL,
    "postcode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "statistic_area" TEXT NOT NULL,
    "Rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PickupCharges_pkey" PRIMARY KEY ("id")
);
