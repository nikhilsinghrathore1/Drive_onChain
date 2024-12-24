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
router.post("/campare-price", [
    (0, express_validator_1.body)("pickup").isString().isLength({ min: 3 }).withMessage("the pickup location should be atleast 3 character long"),
    (0, express_validator_1.body)("destination").isString().isLength({ min: 3 }).withMessage("the destination location should be atleast 3 character long "),
], CheckToken_1.checkToken, rideController_1.listOfFare);
exports.default = router;
