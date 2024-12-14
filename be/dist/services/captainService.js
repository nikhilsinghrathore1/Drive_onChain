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
exports.createCaptainService = void 0;
const db_1 = require("../db/db");
const passwordHashing_1 = require("../utils/passwordHashing");
const createCaptainService = (parameter) => __awaiter(void 0, void 0, void 0, function* () {
    if (!parameter.fullName || !parameter.email || !parameter.capacity || !parameter.plateNumber || !parameter.vehical_type) {
        throw new Error("all fields are required");
    }
    try {
        const captainhashedPassword = yield (0, passwordHashing_1.hashedPassword)(parameter.password);
        if (captainhashedPassword) {
            const captain = yield db_1.prisma.captain.create({
                data: {
                    fullName: parameter.fullName,
                    email: parameter.email,
                    password: captainhashedPassword,
                    capacity: parameter.capacity,
                    vehical_type: parameter.vehical_type,
                    color: parameter.color,
                    plateNumber: parameter.plateNumber
                }
            });
            return captain;
        }
    }
    catch (err) {
        console.log("there was some error while creating captain", err);
        return;
    }
});
exports.createCaptainService = createCaptainService;
