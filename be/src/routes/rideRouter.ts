import express from "express"
import { body } from "express-validator"


const router = express.Router()


router.post("/create",[
               body("pickUp").isString().isLength({min:3}).withMessage("invalid pickup address"),
               body("distination").isString().isLength({min:3}).withMessage("invalid distination address"),
               body("vehical_type").isString().isIn(["auto" , "car" , "bike"]).withMessage("invalid vehical type")
] )