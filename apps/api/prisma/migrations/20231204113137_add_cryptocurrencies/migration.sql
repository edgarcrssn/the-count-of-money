-- CreateTable
CREATE TABLE "Cryptocurrency" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Cryptocurrency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrency_id_key" ON "Cryptocurrency"("id");