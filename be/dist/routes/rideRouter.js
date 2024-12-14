"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post("/create", [
    (0, express_validator_1.body)("pickUp").isString().isLength({ min: 3 }).withMessage("invalid pickup address"),
    (0, express_validator_1.body)("distination").isString().isLength({ min: 3 }).withMessage("invalid distination address"),
    (0, express_validator_1.body)("vehical_type").isString().isIn(["auto", "car", "bike"]).withMessage("invalid vehical type")
]);
