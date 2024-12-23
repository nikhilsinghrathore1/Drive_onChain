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
exports.comparePassword = exports.hashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltround = parseInt(process.env.HASHSALT || "10", 10);
const hashedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(saltround);
        const hash = yield bcrypt_1.default.hash(password, salt);
        return hash;
    }
    catch (err) {
        console.log("there was some problem while hashing", err);
        return null;
    }
});
exports.hashedPassword = hashedPassword;
const comparePassword = (password, stored_password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compare = yield bcrypt_1.default.compare(stored_password, password);
        return compare;
    }
    catch (err) {
        console.log("something went wrong while comparing the passwords", err);
    }
});
exports.comparePassword = comparePassword;
