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
exports.logoutUser = exports.getUserProfile = exports.LoginUser = exports.RegisterUser = void 0;
const db_1 = require("../db/db");
const express_validator_1 = require("express-validator");
const passwordHashing_1 = require("../utils/passwordHashing");
const userService_1 = require("../services/userService");
const genToken_1 = require("../utils/genToken");
// register user route 
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    const isAlreadyUser = yield db_1.prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (isAlreadyUser) {
        res.status(400).json({ msg: "user already exists" });
    }
    else {
        // now i have to hash the password 
        const hashed_password = yield (0, passwordHashing_1.hashedPassword)(password);
        // have to store the user information in the database; 
        const user = yield (0, userService_1.storeUser)(firstName, lastName || "", email, hashed_password || password);
        if (user) {
            // have to generate the jsonwebtoken for it now
            const token = (0, genToken_1.createToken)(user.id);
            res.cookie("token", token);
            res.status(200).json({ user, token: token });
        }
        else {
            res.status(400).json({ msg: "there was some issue while creating the user" });
        }
    }
});
exports.RegisterUser = RegisterUser;
// login user route 
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    }
    else {
        const { password, email } = req.body;
        console.log(email);
        const user = yield db_1.prisma.user.findFirst({ where: {
                email: email
            } });
        if (!user) {
            res.status(400).json({ msg: "the user doesn't exists" });
        }
        else {
            const stored_password = user === null || user === void 0 ? void 0 : user.password;
            const checked_password = yield (0, passwordHashing_1.comparePassword)(stored_password || "", password);
            if (!checked_password) {
                res.status(400).json({ msg: "incorrect password" });
            }
            else {
                const token = (0, genToken_1.createToken)(user.id);
                res.cookie('token', token);
                res.status(200).json({ user, token });
            }
        }
    }
});
exports.LoginUser = LoginUser;
// get user profile 
const getUserProfile = (req, res) => {
    res.status(200).json({ user: req.user });
};
exports.getUserProfile = getUserProfile;
// logout route for the user 
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    res.clearCookie("token");
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(400).json({ msg: "token not present " });
        return;
    }
    else {
        const blacklistedToken = yield (0, userService_1.CreateBlackListToken)(token);
        res.status(200).json({ blacklistedToken, msg: "logged out" });
    }
});
exports.logoutUser = logoutUser;
