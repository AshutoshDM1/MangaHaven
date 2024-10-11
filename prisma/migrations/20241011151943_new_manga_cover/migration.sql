-- CreateTable
CREATE TABLE "mangaCover" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "mangaCover_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mangaCover_title_key" ON "mangaCover"("title");
