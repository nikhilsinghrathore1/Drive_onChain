import express from 'express'
import { body } from 'express-validator'
import { checkToken } from '../middleware/CheckToken'
import { createRide, listOfFare } from '../controllers/rideController'
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


export default router 