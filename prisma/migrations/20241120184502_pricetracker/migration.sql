/*
  Warnings:

  - You are about to drop the `TabProduction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TabProduction";

-- CreateTable
CREATE TABLE "PriceTracker" (
    "id" SERIAL NOT NULL,
    "prdline" TEXT,
    "vendor" TEXT,
    "status" TEXT,
    "effectivedate" TEXT,
    "promofile" TEXT,
    "quotefile" TEXT,
    "deadstock" TEXT,
    "prlinevsvendor" TEXT,
    "customervalueprice" TEXT,
    "vendornumber" TEXT,
    "specialvendor" TEXT,
    "punchcomparison" TEXT,
    "freight" TEXT,
    "searchkey" TEXT,
    "pricelistform" TEXT,
    "sabreinfo" TEXT,
    "notes" TEXT,

    CONSTRAINT "PriceTracker_pkey" PRIMARY KEY ("id")
);
