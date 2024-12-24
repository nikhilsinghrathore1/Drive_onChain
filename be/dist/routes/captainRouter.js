"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const captainController_1 = require("../controllers/captainController");
const CheckToken_1 = require("../middleware/CheckToken");
const router = express_1.default.Router();
router.post("/register", [
    (0, express_validator_1.body)("email").isEmail().withMessage("invalid email"),
    (0, express_validator_1.body)("fullName").isString().isLength({ min: 3 }).withMessage("the fullname should be atleast 3 characters"),
    (0, express_validator_1.body)("password").isString().isLength({ min: 6 }).withMessage("the password should be atleast 6 character long"),
    (0, express_validator_1.body)("vehical_type").isString().isIn(['auto', "car", "bike"]).withMessage("invalid vehical type"),
    (0, express_validator_1.body)("plateNumber").isNumeric().withMessage("invalid plate number"),
    (0, express_validator_1.body)("color").isString().withMessage("invalid car color"),
    (0, express_validator_1.body)("capacity").isNumeric().withMessage("invalid capacity")
], captainController_1.createCaptain);
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("invalid email"),
    (0, express_validator_1.body)("password").isString().isLength({ min: 6 }).withMessage("the password should be atleast 6 character long"),
], captainController_1.loginCaptain);
router.get('/profile', CheckToken_1.checkCaptainToken, captainController_1.getCaptainProfile);
router.get("/logout", CheckToken_1.checkCaptainToken, captainController_1.logoutCaptain);
exports.default = router;
