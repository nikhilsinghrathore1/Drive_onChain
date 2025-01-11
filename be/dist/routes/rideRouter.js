"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const CheckToken_1 = require("../middleware/CheckToken");
const rideController_1 = require("../controllers/rideController");
const router = express_1.default.Router();
router.post("/create", [
    (0, express_validator_1.body)("pickup").isString().isLength({ min: 3 }).withMessage("the pickup location should be atleast 3 character long"),
    (0, express_validator_1.body)("destination").isString().isLength({ min: 3 }).withMessage("the destination location should be atleast 3 character long "),
    (0, express_validator_1.body)("vehical_type").isString().isIn(["car", "auto", "bike"]).withMessage("invalid vehical type")
], CheckToken_1.checkToken, rideController_1.createRide);
router.post("/compare-price", [
    (0, express_validator_1.body)("pickup").isString().isLength({ min: 3 }).withMessage("the pickup location should be atleast 3 character long"),
    (0, express_validator_1.body)("destination").isString().isLength({ min: 3 }).withMessage("the destination location should be atleast 3 character long "),
], CheckToken_1.checkToken, rideController_1.listOfFare);
router.post("/confirm-ride", [
    (0, express_validator_1.body)("rideId").isNumeric().isLength({ min: 3 }).withMessage("the pickup location should be atleast 3 character long"),
], CheckToken_1.checkCaptainToken, rideController_1.confirmRide);
router.get("/start-ride", [
    (0, express_validator_1.query)("rideId").isNumeric().withMessage("this ride id is required"),
    (0, express_validator_1.query)("otp").isString().isLength({ min: 4, max: 4 }).withMessage("incorrect otp enterd")
], CheckToken_1.checkCaptainToken, rideController_1.startRide);
exports.default = router;
