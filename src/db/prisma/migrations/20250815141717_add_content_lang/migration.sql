-- CreateEnum
CREATE TYPE "public"."ContentCategory" AS ENUM ('SERIES', 'MOVIE');

-- CreateTable
CREATE TABLE "public"."Content" (
    "id" SERIAL NOT NULL,
    "category" "public"."ContentCategory" NOT NULL,
    "seriesId" INTEGER,
    "movieId" INTEGER,
    "name" TEXT NOT NULL,
    "posterUrl" TEXT,
    "rating" DECIMAL(3,1),
    "originalLanguageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_seriesId_key" ON "public"."Content"("seriesId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_movieId_key" ON "public"."Content"("movieId");

-- CreateIndex
CREATE INDEX "Content_category_idx" ON "public"."Content"("category");

-- AddForeignKey
ALTER TABLE "public"."Content" ADD CONSTRAINT "Content_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "public"."Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Content" ADD CONSTRAINT "Content_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Content" ADD CONSTRAINT "Content_originalLanguageId_fkey" FOREIGN KEY ("originalLanguageId") REFERENCES "public"."Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;
