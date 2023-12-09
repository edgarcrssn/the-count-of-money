-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('CLASSIC', 'GOOGLE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "auth_type" "AuthType" NOT NULL DEFAULT 'CLASSIC',
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "crypto_currencies" JSONB,
    "keywords" JSONB,
    "default_currency_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RssSource" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "RssSource_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "Cryptocurrency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "RssSource_url_key" ON "RssSource"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrency_id_key" ON "Cryptocurrency"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_default_currency_id_fkey" FOREIGN KEY ("default_currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
