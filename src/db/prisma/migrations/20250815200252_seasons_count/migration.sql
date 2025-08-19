/*
  Warnings:

  - You are about to drop the `MovieCast` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeriesCast` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Series` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."MovieCast" DROP CONSTRAINT "MovieCast_movieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MovieCast" DROP CONSTRAINT "MovieCast_personId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SeriesCast" DROP CONSTRAINT "SeriesCast_personId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SeriesCast" DROP CONSTRAINT "SeriesCast_seriesId_fkey";

-- DropTable
DROP TABLE "public"."MovieCast";

-- DropTable
DROP TABLE "public"."Person";

-- DropTable
DROP TABLE "public"."SeriesCast";

-- CreateIndex
CREATE UNIQUE INDEX "Movie_name_key" ON "public"."Movie"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Series_name_key" ON "public"."Series"("name");
