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
exports.RegisterUser = void 0;
const db_1 = require("../db/db");
const express_validator_1 = require("express-validator");
const passwordHashing_1 = require("../utils/passwordHashing");
const userService_1 = require("../services/userService");
const genToken_1 = require("../utils/genToken");
const RegisterUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);
    const isAlreadyUser = yield db_1.prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (isAlreadyUser) {
        res.status(400).json({ msg: "user already exists" });
    }
    // now i have to hash the password 
    const hashed_password = yield (0, passwordHashing_1.hashedPassword)(password);
    // have to store the user information in the database; 
    const user = yield (0, userService_1.storeUser)(firstName, lastName || "", email, hashed_password || password);
    // have to generate the jsonwebtoken for it now
    const token = (0, genToken_1.createToken)({ firstName, email, password });
    res.status(200).json({ user, token: token });
});
exports.RegisterUser = RegisterUser;
