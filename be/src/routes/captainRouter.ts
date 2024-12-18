import express from "express"
import { body } from "express-validator"
import { createCaptain, getCaptainProfile, loginCaptain, logoutCaptain } from "../controllers/captainController"
import { checkCaptainToken } from "../middleware/CheckToken"

const router  = express.Router()


// 

router.post("/register" ,[
               body("email").isEmail().withMessage("invalid email"),
               body("fullName").isString().isLength({min:3}).withMessage("the fullname should be atleast 3 characters"),
               body("password").isString().isLength({min:6}).withMessage("the password should be atleast 6 character long"),
               body("vehical_type").isString().isIn(['auto' , "car" , "bike"]).withMessage("invalid vehical type"),
               body("plateNumber").isNumeric().withMessage("invalid plate number"),
               body("color").isString().withMessage("invalid car color"),
               body("capacity").isNumeric().withMessage("invalid capacity")
],createCaptain)
router.post("/login" ,[
               body("email").isEmail().withMessage("invalid email"),
               body("password").isString().isLength({min:6}).withMessage("the password should be atleast 6 character long"),
              
],loginCaptain)

router.get('/profile',checkCaptainToken, getCaptainProfile)

router.get("/logout",checkCaptainToken,logoutCaptain)

export default router

