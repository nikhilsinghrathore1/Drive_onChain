"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const CheckToken_1 = require("../middleware/CheckToken");
const mapController_1 = require("../controllers/mapController");
const router = express_1.default.Router();
router.get("/get-cordinates", [
    (0, express_validator_1.query)("address").isString().isLength({ min: 3 }).withMessage("the address should be at least 3 character")
], CheckToken_1.checkToken, mapController_1.getCordinate);
router.get("/get-distance-time", [
    (0, express_validator_1.query)("address").isLength({ min: 3 }).withMessage("the address should be atleast 3 character long"),
    (0, express_validator_1.query)("destination").isLength({ min: 3 }).withMessage("the destination should be atleast 3 character long")
], CheckToken_1.checkToken, mapController_1.getDistanceAndTime);
router.get("/get-suggestion", [
    (0, express_validator_1.query)("input").isString().isLength({ min: 1 }).withMessage("the suggestion should be atleast 1 character long")
], CheckToken_1.checkToken, mapController_1.getSuggestion);
router.get("/get-fare", [
    (0, express_validator_1.query)("origin").isString().withMessage("the origin should be string"),
    (0, express_validator_1.query)("destination").isString().withMessage("the destination should be string")
], CheckToken_1.checkToken, mapController_1.returnFare);
exports.default = router;
