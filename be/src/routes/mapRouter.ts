import express from "express"
import {query}from "express-validator"
import { checkToken } from "../middleware/CheckToken"
import { getCordinate, getDistanceAndTime, getSuggestion, returnFare } from "../controllers/mapController"

const router = express.Router()


router.get("/get-cordinates",[
               query("address").isString().isLength({min:3}).withMessage("the address should be at least 3 character")
],checkToken,getCordinate)


router.get("/get-distance-time" ,[
               query("address").isLength({min:3}).withMessage("the address should be atleast 3 character long"),
               query("destination").isLength({min:3}).withMessage("the destination should be atleast 3 character long")
],checkToken , getDistanceAndTime)


router.get("/get-suggestion",[
               query("input").isString().isLength({min:1}).withMessage("the suggestion should be atleast 1 character long")
] , checkToken , getSuggestion)


router.get("/get-fare",[
               query("origin").isString().withMessage("the origin should be string"),
               query("destination").isString().withMessage("the destination should be string")
],checkToken ,returnFare)

export default router