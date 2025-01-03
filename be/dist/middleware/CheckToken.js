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
exports.checkCaptainToken = exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.cookies.token;
    if (!token) {
        res.status(401).json({ msg: "unAuthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        const user = yield db_1.prisma.user.findFirst({ where: {
                id: decoded.id
            } });
        if (!user) {
            res.status(404).json({ msg: "user not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "something went wrong while checking token" });
        return;
    }
});
exports.checkToken = checkToken;
const checkCaptainToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        if (!token) {
            res.status(400).json({ msg: "unAuthorized captain" });
            return;
        }
        const isBlackListed = yield db_1.prisma.blackListToken.findFirst({ where: {
                token: token
            } });
        if (isBlackListed) {
            res.status(400).json({ msg: "unAuthorized access" });
            return;
        }
        const checking = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        const captain = yield db_1.prisma.captain.findFirst({ where: {
                id: checking.id
            } });
        if (!captain) {
            res.status(200).json({ msg: "captain does not exists" });
            return;
        }
        req.captain = captain;
        next();
    }
    catch (err) {
        res.status(400).json({ msg: "some error occured while checking the auth token of captain" });
        return;
    }
});
exports.checkCaptainToken = checkCaptainToken;
