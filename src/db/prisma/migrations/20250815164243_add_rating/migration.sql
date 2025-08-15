-- CreateTable
CREATE TABLE "public"."Rating" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "score" DECIMAL(3,1) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Rating_contentId_idx" ON "public"."Rating"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_contentId_clientId_key" ON "public"."Rating"("contentId", "clientId");

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
