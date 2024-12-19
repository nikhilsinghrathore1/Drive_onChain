-- CreateEnum
CREATE TYPE "rideStatus" AS ENUM ('pending', 'accepted', 'ongoing', 'cancled', 'completed');

-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "captainId" INTEGER,
    "pickup" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "fare" INTEGER NOT NULL,
    "status" "rideStatus" NOT NULL DEFAULT 'pending',
    "duration" INTEGER,
    "distance" INTEGER,
    "paymentId" TEXT,
    "orderId" TEXT,
    "signature" TEXT,
    "otp" TEXT NOT NULL,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Captain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
