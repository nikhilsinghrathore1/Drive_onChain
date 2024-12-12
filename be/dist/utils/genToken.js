"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET || "token";
const createToken = ({ firstName, email, password }) => {
    const token = jsonwebtoken_1.default.sign({ firstName, email, password }, secret);
    console.log("this is the internal token ", token);
    return token;
};
exports.createToken = createToken;
