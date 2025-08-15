-- CreateTable
CREATE TABLE "public"."Language" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Series" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "description" TEXT NOT NULL,
    "originalLanguageId" INTEGER NOT NULL,
    "posterUrl" TEXT,
    "rating" DECIMAL(3,1),

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Season" (
    "id" SERIAL NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "year" INTEGER,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Episode" (
    "id" SERIAL NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "seasonNumber" INTEGER NOT NULL,
    "episodeNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SeriesCast" (
    "seriesId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    "role" TEXT,

    CONSTRAINT "SeriesCast_pkey" PRIMARY KEY ("seriesId","personId")
);

-- CreateTable
CREATE TABLE "public"."Movie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "originalLanguageId" INTEGER NOT NULL,
    "posterUrl" TEXT,
    "rating" DECIMAL(3,1),

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MovieCast" (
    "movieId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    "role" TEXT,

    CONSTRAINT "MovieCast_pkey" PRIMARY KEY ("movieId","personId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "public"."Language"("code");

-- CreateIndex
CREATE INDEX "Series_name_idx" ON "public"."Series"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Season_seriesId_number_key" ON "public"."Season"("seriesId", "number");

-- CreateIndex
CREATE INDEX "Episode_seriesId_seasonNumber_idx" ON "public"."Episode"("seriesId", "seasonNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_seriesId_seasonNumber_episodeNumber_key" ON "public"."Episode"("seriesId", "seasonNumber", "episodeNumber");

-- CreateIndex
CREATE INDEX "Movie_name_idx" ON "public"."Movie"("name");

-- AddForeignKey
ALTER TABLE "public"."Series" ADD CONSTRAINT "Series_originalLanguageId_fkey" FOREIGN KEY ("originalLanguageId") REFERENCES "public"."Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Season" ADD CONSTRAINT "Season_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "public"."Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Episode" ADD CONSTRAINT "Episode_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "public"."Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Episode" ADD CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "public"."Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeriesCast" ADD CONSTRAINT "SeriesCast_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "public"."Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeriesCast" ADD CONSTRAINT "SeriesCast_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Movie" ADD CONSTRAINT "Movie_originalLanguageId_fkey" FOREIGN KEY ("originalLanguageId") REFERENCES "public"."Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieCast" ADD CONSTRAINT "MovieCast_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieCast" ADD CONSTRAINT "MovieCast_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
