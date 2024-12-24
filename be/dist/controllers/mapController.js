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
exports.getSuggestion = exports.getDistanceAndTime = exports.getCordinate = void 0;
const express_validator_1 = require("express-validator");
const mapServices_1 = require("../services/mapServices");
// this is the route to get the cordinates
const getCordinate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
        return;
    }
    const { address } = req.query;
    try {
        console.log("entered");
        const location = yield (0, mapServices_1.giveCordinates)(address);
        res.status(200).json(location);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "some internal error occoured" });
        return;
    }
});
exports.getCordinate = getCordinate;
// this is the route to get the distance and time
const getDistanceAndTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
        return;
    }
    const { address, destination } = req.query;
    try {
        const distanceAndTime = yield (0, mapServices_1.giveDistancAndTime)(address, destination);
        res.status(200).json(distanceAndTime);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "there was some error while fetching the distance and time " });
        return;
    }
});
exports.getDistanceAndTime = getDistanceAndTime;
// this is the route to return the suggestions 
const getSuggestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
        return;
    }
    try {
        const { input } = req.query;
        const suggestion = yield (0, mapServices_1.getlocationSuggestion)(input);
        res.status(200).json(suggestion);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "there was some " });
        return;
    }
});
exports.getSuggestion = getSuggestion;
