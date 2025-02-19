/*
  Warnings:

  - You are about to drop the `CollectionPonts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CollectionPonts";

-- CreateTable
CREATE TABLE "CollectionPoints" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "Address" TEXT NOT NULL,
    "ContactPerson" TEXT NOT NULL,
    "Contact1" TEXT NOT NULL,
    "Contact2" TEXT NOT NULL,
    "SurCharge" DOUBLE PRECISION NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,

    CONSTRAINT "CollectionPoints_pkey" PRIMARY KEY ("id")
);
