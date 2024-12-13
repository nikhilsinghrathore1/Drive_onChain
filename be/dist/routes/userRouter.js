"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userController_1 = require("../controllers/userController");
const CheckToken_1 = __importDefault(require("../middleware/CheckToken"));
const router = express_1.default.Router();
router.post("/register", [
    (0, express_validator_1.body)("email").isEmail().withMessage("invalid email"),
    (0, express_validator_1.body)("firstName").isLength({ min: 3 }).withMessage("the first name should be minimum of 3 character"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("the password should be 6 characters long")
], userController_1.RegisterUser);
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("invalid email"),
    (0, express_validator_1.body)("firstName").isLength({ min: 3 }).withMessage("the firstName should be minimum of 3 characters"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("the password should be mininmum of 6 characters")
], userController_1.LoginUser);
router.get("/profile", CheckToken_1.default, userController_1.getUserProfile);
router.get("/logout", CheckToken_1.default, userController_1.logoutUser);
exports.default = router;
