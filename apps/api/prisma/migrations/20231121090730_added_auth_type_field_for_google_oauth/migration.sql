-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('CLASSIC', 'GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authType" "AuthType" NOT NULL DEFAULT 'CLASSIC';
