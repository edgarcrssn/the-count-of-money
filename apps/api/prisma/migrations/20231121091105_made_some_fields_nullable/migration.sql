-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "crypto_currencies" DROP NOT NULL,
ALTER COLUMN "keywords" DROP NOT NULL;
