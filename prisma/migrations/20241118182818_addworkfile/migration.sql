/*
  Warnings:

  - You are about to drop the column `prdline` on the `WorkFile` table. All the data in the column will be lost.
  - You are about to drop the column `vcode` on the `WorkFile` table. All the data in the column will be lost.
  - You are about to drop the column `vname` on the `WorkFile` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `WorkFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkFile" DROP COLUMN "prdline",
DROP COLUMN "vcode",
DROP COLUMN "vname",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data" JSONB,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
