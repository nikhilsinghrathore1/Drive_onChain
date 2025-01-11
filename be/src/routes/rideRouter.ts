import express from 'express'
import { body,query } from 'express-validator'
import { checkCaptainToken, checkToken } from '../middleware/CheckToken'
import { confirmRide, createRide, listOfFare, startRide } from '../controllers/rideController'
const router = express.Router()

router.post("/create",[
body("pickup").isString().isLength({min:3}).withMessage("the pickup location should be atleast 3 character long"),
body("destination").isString().isLength({min:3}).withMessage("the destination location should be atleast 3 character long "),
body("vehical_type").isString().isIn(["car" , "auto" , "bike"]).withMessage("invalid vehical type")
] , checkToken , createRide)

router.post("/compare-price",[
body("pickup").isString().isLength({min:3}).withMessage("the pickup location should be atleast 3 character long"),
body("destination").isString().isLength({min:3}).withMessage("the destination location should be atleast 3 character long "),
] , checkToken , listOfFare)


router.post("/confirm-ride",[
body("rideId").isNumeric().isLength({min:3}).withMessage("the pickup location should be atleast 3 character long"),
] , checkCaptainToken , confirmRide)

router.get("/start-ride",[
               query("rideId").isNumeric().withMessage("this ride id is required") , 
               query("otp").isString().isLength({min:4,max:4}).withMessage("incorrect otp enterd")
],checkCaptainToken,startRide)

export default router 