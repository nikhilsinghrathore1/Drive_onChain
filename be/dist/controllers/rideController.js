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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRide = exports.confirmRide = exports.listOfFare = exports.createRide = void 0;
const express_validator_1 = require("express-validator");
const riderServices_1 = require("../services/riderServices");
const fare_1 = __importDefault(require("../utils/fare"));
const getOTP_1 = __importDefault(require("../utils/getOTP"));
const mapServices_1 = require("../services/mapServices");
const db_1 = require("../db/db");
const socket_1 = require("../socket");
const createRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
        return;
    }
    const { pickup, destination, vehical_type } = req.body;
    try {
        const fare = yield (0, fare_1.default)(pickup, destination);
        if (!fare[vehical_type]) {
            res.status(400).json({ msg: `Invalid vehicle type: ${vehical_type}` });
            return;
        }
        else {
            const otp = (0, getOTP_1.default)(4);
            console.log(fare);
            const Faredistance = yield (0, mapServices_1.giveDistancAndTime)(pickup, destination);
            console.log(Faredistance.distance.value);
            const NewRide = yield (0, riderServices_1.createNewRide)(pickup, destination, vehical_type, fare[vehical_type], (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, otp, Faredistance.distance.value);
            res.status(200).json({ ride: NewRide });
            const pickupCordinates = yield (0, mapServices_1.giveCordinates)(pickup);
            console.log(pickupCordinates);
            // now i have to find all the captain in the radius of this locaiton 
            const allTheCaptainInRadius = yield (0, mapServices_1.captainInRadius)(pickupCordinates.ltd, pickupCordinates.lng, 2);
            console.log(allTheCaptainInRadius);
            // getting all the captains now 
            // clear the otp ; 
            NewRide.otp = "";
            // now i have to extract the user from the ride that is generated here 
            const ridingUser = yield db_1.prisma.ride.findMany({
                where: {
                    id: NewRide.id
                },
                include: {
                    user: true,
                },
            });
            // now i have to map to all of the captains and have to send them this data 
            allTheCaptainInRadius.map(captain => {
                (0, socket_1.sendMessageToSocketId)(captain.socketId, {
                    event: "new-ride",
                    data: ridingUser
                });
                console.log("msg sent to ", captain.socketId);
            });
            // okay now how do i test this 
            // lets create a new ride then we'll see
            // okay i got the problem it is that the captains don't have any location with them to track that's why the nearby captain query is returning empty so what to do now ig i have to update the captains location from the frontend 
        }
    }
    // okay so if this thing is not working then i will create something else can't just sit like this 
    catch (err) {
        res.status(400).json({ msg: "there was some error while creating the ride" });
    }
});
exports.createRide = createRide;
const listOfFare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    }
    try {
        const { pickup, destination, } = req.body;
        const allFare = yield (0, fare_1.default)(pickup, destination);
        res.status(200).json(allFare);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
exports.listOfFare = listOfFare;
const confirmRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    }
    try {
        const { rideId } = req.body;
        if (req.captain) {
            const ride = yield (0, riderServices_1.confirmingRide)(rideId, req.captain);
            (0, socket_1.sendMessageToSocketId)(ride.user.socketId, {
                event: "ride-confirmed",
                data: ride,
            });
        }
        else {
            res.status(400).json({ msg: "unAuthorized captain" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});
exports.confirmRide = confirmRide;
const startRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    }
    try {
        const { rideId, otp } = req.query;
        const rideid = Number(rideId);
        const strotp = String(otp);
        console.log(rideid, strotp);
        const startRiding = yield (0, riderServices_1.startTheRide)(rideid, strotp);
        (0, socket_1.sendMessageToSocketId)(startRiding === null || startRiding === void 0 ? void 0 : startRiding.user.socketId, {
            event: "start-ride",
            data: startRiding
        });
        console.log("this is the captains socketid", (_a = req.captain) === null || _a === void 0 ? void 0 : _a.socketId);
        if (req.captain) {
            (0, socket_1.sendMessageToSocketId)((_b = req.captain) === null || _b === void 0 ? void 0 : _b.socketId, {
                event: "start-ride",
                data: startRiding
            });
        }
        res.status(200).json(startRiding);
        return;
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.startRide = startRide;
