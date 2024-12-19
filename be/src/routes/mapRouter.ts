import express from "express"
import {query}from "express-validator"
import { checkToken } from "../middleware/CheckToken"
import { getCordinate, getDistanceAndTime } from "../controllers/mapController"

const router = express.Router()


router.post("get-cordinates",[
               query("address").isLength({min:3}).withMessage("the address should be at least 3 character")
],checkToken,getCordinate)


router.post("get-distance-time" ,[
               query("address").isLength({min:3}).withMessage("the address should be atleast 3 character long"),
               query("destination").isLength({min:3}).withMessage("the destination should be atleast 3 character long")
],checkToken , getDistanceAndTime)


router.post("/get-suggestion",[
               query("input").isString().isLength({min:1}).withMessage("the suggestion should be atleast 1 character long")
] , checkToken , )


export default router