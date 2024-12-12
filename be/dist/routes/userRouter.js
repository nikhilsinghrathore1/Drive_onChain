"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/register", [
    (0, express_validator_1.body)("email").isEmail().withMessage("invalid email"),
    (0, express_validator_1.body)("firstName").isLength({ min: 3 }).withMessage("the first name should be minimum of 3 character"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("the password should be 6 characters long")
], userController_1.RegisterUser);
exports.default = router;
