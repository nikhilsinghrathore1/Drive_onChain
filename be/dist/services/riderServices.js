"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTheRide = exports.confirmingRide = exports.createNewRide = void 0;
const db_1 = require("../db/db");
const createNewRide = (pickup, destination, vehical_type, fare, userId, otp, distance) => __awaiter(void 0, void 0, void 0, function* () {
    if (!pickup || !destination || !vehical_type) {
        throw new Error("all fields are required");
    }
    try {
        const newRide = yield db_1.prisma.ride.create({
            data: {
                pickup: pickup,
                destination: destination,
                fare: fare,
                distance: distance,
                userId: userId,
                otp: otp
            }
        });
        return newRide;
    }
    catch (err) {
        throw new Error(`there was some internal error while creating the ride ${err}`);
    }
});
exports.createNewRide = createNewRide;
const confirmingRide = (rideId, captain) => __awaiter(void 0, void 0, void 0, function* () {
    if (!rideId || !captain) {
        throw new Error("all fields are required");
    }
    try {
        const confirmedRide = yield db_1.prisma.ride.update({
            where: { id: rideId },
            data: {
                captainId: captain.id,
                status: "accepted"
            },
            include: {
                user: true
            }
        });
        console.log(confirmedRide);
        return confirmedRide;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.confirmingRide = confirmingRide;
const startTheRide = (rideId, otp) => __awaiter(void 0, void 0, void 0, function* () {
    if (!rideId || !otp) {
        throw new Error("all fields are required");
    }
    try {
        // i have to find the ride first 
        const ride = yield db_1.prisma.ride.findFirst({
            where: {
                id: rideId
            }
        });
        console.log("this is the ride details of the start ride", ride);
        if (ride) {
            if (ride.status != "accepted") {
                throw new Error("ride not accepted");
            }
            if (ride.otp != otp) {
                throw new Error("invalid otp entered");
            }
            const startedRide = yield db_1.prisma.ride.update({
                where: {
                    id: rideId
                },
                data: {
                    status: "ongoing"
                },
                include: {
                    user: true
                }
            });
            console.log("this is the started ride dets ", startedRide);
            return startedRide;
        }
    }
    catch (err) {
        throw err;
    }
});
exports.startTheRide = startTheRide;
