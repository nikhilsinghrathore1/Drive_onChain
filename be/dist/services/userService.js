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
exports.CreateBlackListToken = exports.storeUser = void 0;
const db_1 = require("../db/db");
const storeUser = (firstName, lastName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!firstName || !email || !password) {
        throw new Error("All fields are required");
    }
    try {
        const user = yield db_1.prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            }
        });
        return user;
    }
    catch (err) {
        console.log("there was some error while the creation of the user ", err);
    }
});
exports.storeUser = storeUser;
const CreateBlackListToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new Error("the token not provided for blacklisting");
    }
    try {
        const blacklistedToken = yield db_1.prisma.blackListToken.create({
            data: {
                token: token
            }
        });
        return blacklistedToken;
    }
    catch (err) {
        console.log("there was some error in the creation of this blacklist token", err);
        return;
    }
});
exports.CreateBlackListToken = CreateBlackListToken;
