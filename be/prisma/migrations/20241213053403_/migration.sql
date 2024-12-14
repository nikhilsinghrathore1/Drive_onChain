/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('inActive', 'active');

-- CreateTable
CREATE TABLE "Captain" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "socketId" TEXT,
    "status" "status" NOT NULL DEFAULT 'inActive',
    "vehical_type" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "plateNumber" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "ltd" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Captain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Captain_email_key" ON "Captain"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
