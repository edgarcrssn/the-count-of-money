/*
  Warnings:

  - You are about to drop the column `authType` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "authType",
ADD COLUMN     "auth_type" "AuthType" NOT NULL DEFAULT 'CLASSIC';
