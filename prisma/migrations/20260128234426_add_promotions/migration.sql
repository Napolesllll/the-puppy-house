/*
  Warnings:

  - Made the column `image` on table `promotions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "promotions" ADD COLUMN     "badge" TEXT,
ALTER COLUMN "image" SET NOT NULL;
