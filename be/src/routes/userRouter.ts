import express from "express"
import { body } from "express-validator"
import { RegisterUser } from "../controllers/userController"
const router = express.Router()



router.post("/register",[
               body("email").isEmail().withMessage("invalid email"),
               body("firstName").isLength({min:3}).withMessage("the first name should be minimum of 3 character"),
               body("password").isLength({min:6}).matches(/[!@#$%^&*(),.?":{}|<>]/). withMessage("the password should be 6 characters long")
],
               RegisterUser
)


export default router; 