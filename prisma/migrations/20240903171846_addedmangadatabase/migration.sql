-- CreateTable
CREATE TABLE "MangaDeshBoard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "chapter" TEXT,
    "volume" TEXT,
    "status" TEXT,

    CONSTRAINT "MangaDeshBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mangaCarousel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "chapter" TEXT,
    "volume" TEXT,
    "status" TEXT,
    "genres" TEXT[],
    "imageUrl" TEXT,

    CONSTRAINT "mangaCarousel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MangaDeshBoard_title_key" ON "MangaDeshBoard"("title");

-- CreateIndex
CREATE UNIQUE INDEX "mangaCarousel_title_key" ON "mangaCarousel"("title");
