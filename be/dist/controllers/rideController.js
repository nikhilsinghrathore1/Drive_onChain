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
exports.listOfFare = exports.createRide = void 0;
const express_validator_1 = require("express-validator");
const riderServices_1 = require("../services/riderServices");
const fare_1 = __importDefault(require("../utils/fare"));
const getOTP_1 = __importDefault(require("../utils/getOTP"));
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
            const NewRide = yield (0, riderServices_1.createNewRide)(pickup, destination, vehical_type, fare[vehical_type], (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, otp);
            res.status(200).json({ ride: NewRide });
            return;
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
