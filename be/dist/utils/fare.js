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
const mapServices_1 = require("../services/mapServices");
const travelFare = (origin, destination) => __awaiter(void 0, void 0, void 0, function* () {
    if (!origin || !destination) {
        throw new Error("all fields are required");
    }
    const baseFare = {
        car: 50,
        auto: 30,
        bike: 20
    };
    const ratePerKm = {
        car: 15,
        auto: 10,
        bike: 8
    };
    const perMinuteRate = {
        car: 3,
        auto: 2,
        bike: 1.5
    };
    const distanceTime = yield (0, mapServices_1.giveDistancAndTime)(origin, destination);
    const fare = {
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * ratePerKm.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * ratePerKm.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        bike: Math.round(baseFare.bike + ((distanceTime.distance.value / 1000) * ratePerKm.bike) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
    };
    return fare;
});
exports.default = travelFare;
