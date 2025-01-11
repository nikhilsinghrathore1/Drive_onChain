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
exports.captainInRadius = exports.getlocationSuggestion = exports.giveDistancAndTime = exports.giveCordinates = void 0;
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../db/db");
const giveCordinates = (address) => __awaiter(void 0, void 0, void 0, function* () {
    if (!address) {
        throw new Error("all fields are required");
    }
    const apiKey = process.env.MAP_API;
    console.log(apiKey);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = yield axios_1.default.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        }
        else {
            throw new Error('Unable to fetch coordinates');
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.giveCordinates = giveCordinates;
// function to return the distance and time
const giveDistancAndTime = (address, destination) => __awaiter(void 0, void 0, void 0, function* () {
    if (!address || !destination) {
        throw new Error("all the fields are required");
    }
    const apiKey = process.env.MAP_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(address)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = yield axios_1.default.get(url);
        if (response.data.status === "OK") {
            if (response.data.rows[0].elements[0].status === "ZERO_RESUTLS") {
                throw new Error("no routes found");
            }
            return response.data.rows[0].elements[0];
        }
        else {
            throw new Error("unable to fetch distance and time");
        }
    }
    catch (err) {
        throw new Error("some error occured while geting the distanc and time");
    }
});
exports.giveDistancAndTime = giveDistancAndTime;
// this is the function to return the location suggestion 
const getlocationSuggestion = (input) => __awaiter(void 0, void 0, void 0, function* () {
    if (!input) {
        throw new Error("all the fields are required");
    }
    const apiKey = process.env.MAP_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = yield axios_1.default.get(url);
        return response.data.predictions.map(prediction => prediction.description).filter(value => value);
    }
    catch (err) {
        console.log(err);
        throw new Error("unable to fetch suggestions");
    }
});
exports.getlocationSuggestion = getlocationSuggestion;
// return all the captain in the radius 
const captainInRadius = (ltd, lng, radius) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ltd || !lng || !radius) {
        throw new Error("all fields are required");
    }
    try {
        const earthRadius = 6371;
        const captains = yield db_1.prisma.captain.findMany({
            where: {
                AND: [
                    {
                        ltd: {
                            gte: ltd - (radius / earthRadius) * (180 / Math.PI),
                            lte: ltd + (radius / earthRadius) * (180 / Math.PI),
                        },
                    },
                    {
                        lng: {
                            gte: lng - (radius / earthRadius) * (180 / Math.PI) / Math.cos(ltd * (Math.PI / 180)),
                            lte: lng + (radius / earthRadius) * (180 / Math.PI) / Math.cos(ltd * (Math.PI / 180)),
                        },
                    },
                ],
            },
        });
        return captains;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.captainInRadius = captainInRadius;
