-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('PASSWORD', 'GOOGLE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "auth_type" "AuthType" NOT NULL DEFAULT 'PASSWORD',
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "default_currency_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cryptocurrency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "available" BOOLEAN DEFAULT true,

    CONSTRAINT "Cryptocurrency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "available" BOOLEAN DEFAULT true,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RssSource" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "RssSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CryptocurrencyToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_KeywordToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrency_id_key" ON "Cryptocurrency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_id_key" ON "Keyword"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RssSource_url_key" ON "RssSource"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_CryptocurrencyToUser_AB_unique" ON "_CryptocurrencyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CryptocurrencyToUser_B_index" ON "_CryptocurrencyToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordToUser_AB_unique" ON "_KeywordToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordToUser_B_index" ON "_KeywordToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_default_currency_id_fkey" FOREIGN KEY ("default_currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CryptocurrencyToUser" ADD CONSTRAINT "_CryptocurrencyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Cryptocurrency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CryptocurrencyToUser" ADD CONSTRAINT "_CryptocurrencyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
