-- CreateTable
CREATE TABLE "manga" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "genres" TEXT[],
    "imageUrl" TEXT,

    CONSTRAINT "manga_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "manga_title_key" ON "manga"("title");
