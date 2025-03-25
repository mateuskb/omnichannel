/*
  Warnings:

  - You are about to drop the column `zipcode` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "zipcode",
ADD COLUMN     "addressId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_addressId_key" ON "User"("addressId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
