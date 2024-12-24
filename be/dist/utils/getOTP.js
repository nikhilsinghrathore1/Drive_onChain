"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const getotp = (num) => {
    if (!num) {
        throw new Error("all fields are required");
    }
    const otp = crypto_1.default.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
};
exports.default = getotp;
