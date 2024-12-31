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
exports.logoutCaptain = exports.getCaptainProfile = exports.loginCaptain = exports.createCaptain = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../db/db");
const captainService_1 = require("../services/captainService");
const userService_1 = require("../services/userService");
const genToken_1 = require("../utils/genToken");
const passwordHashing_1 = require("../utils/passwordHashing");
// captain register route
const createCaptain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
        return;
    }
    const { email, fullName, vehical_type, plateNumber, color, password, capacity } = req.body;
    const isCaptainAlreadyExists = yield db_1.prisma.captain.findFirst({ where: {
            email: email
        } });
    if (isCaptainAlreadyExists) {
        res.status(400).json({ msg: "captain already exists" });
        return;
    }
    const captain = yield (0, captainService_1.createCaptainService)({ fullName, email, password, capacity, plateNumber, vehical_type, color });
    if (!captain) {
        res.status(400).json({ msg: "there was some issue while creating the captain" });
        return;
    }
    const token = (0, genToken_1.createToken)(captain.id);
    res.cookie("token", token);
    if (!token) {
        res.status(400).json({ msg: "there was some issue while generating the captian auth token" });
        return;
    }
    res.status(200).json({ captain, token });
});
exports.createCaptain = createCaptain;
// captain login route
const loginCaptain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
        return;
    }
    const { email, password } = req.body;
    const captian = yield db_1.prisma.captain.findFirst({ where: {
            email: email
        } });
    if (!captian) {
        res.status(400).json({ msg: "the captain does not exists" });
        return;
    }
    const checked_password = yield (0, passwordHashing_1.comparePassword)(captian.password, password);
    if (!checked_password) {
        res.status(400).json({ msg: "invalid password" });
        return;
    }
    const token = (0, genToken_1.createToken)(captian.id);
    res.cookie("token", token);
    res.status(200).json({ captian, token });
});
exports.loginCaptain = loginCaptain;
// captain get profile route
const getCaptainProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.captain) {
        res.status(200).json({ captain: req.captain });
        return;
    }
    else {
        res.status(400).json({ msg: "captain does not exists" });
    }
});
exports.getCaptainProfile = getCaptainProfile;
// captain logout route 
const logoutCaptain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
    res.clearCookie("token");
    // i have to blacklist the token then have to clear the cookies then logout 
    if (!token) {
        res.status(400).json({ msg: "invalid captain" });
        return;
    }
    try {
        const blacklistedToken = yield (0, userService_1.CreateBlackListToken)(token);
        if (!blacklistedToken) {
            res.status(400).json({ msg: "the blacklisted token was not created" });
            return;
        }
        res.status(200).json({ msg: "logout" });
    }
    catch (err) {
        res.status(400).json({ msg: err });
        return;
    }
});
exports.logoutCaptain = logoutCaptain;
