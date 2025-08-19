/*
  Warnings:

  - You are about to drop the `Episode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `episodesCount` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Episode" DROP CONSTRAINT "Episode_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Episode" DROP CONSTRAINT "Episode_seriesId_fkey";

-- AlterTable
ALTER TABLE "public"."Season" ADD COLUMN     "episodesCount" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Episode";
