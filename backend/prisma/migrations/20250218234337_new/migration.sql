-- CreateTable
CREATE TABLE "CollectionPonts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "Address" TEXT NOT NULL,
    "ContactPerson" TEXT NOT NULL,
    "Contact1" TEXT NOT NULL,
    "Contact2" TEXT NOT NULL,
    "SurCharge" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CollectionPonts_pkey" PRIMARY KEY ("id")
);
