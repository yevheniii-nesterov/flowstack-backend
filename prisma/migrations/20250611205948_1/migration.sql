/*
  Warnings:

  - You are about to drop the column `login` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_login_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "login",
ADD COLUMN     "email" VARCHAR(128) NOT NULL,
ALTER COLUMN "password" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
