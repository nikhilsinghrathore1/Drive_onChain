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
exports.createNewRide = void 0;
const db_1 = require("../db/db");
const createNewRide = (pickup, destination, vehical_type, fare, userId, otp) => __awaiter(void 0, void 0, void 0, function* () {
    if (!pickup || !destination || !vehical_type) {
        throw new Error("all fields are required");
    }
    try {
        const newRide = yield db_1.prisma.ride.create({
            data: {
                pickup: pickup,
                destination: destination,
                fare: fare,
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
