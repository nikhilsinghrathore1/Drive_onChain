import express from "express"
import { body } from "express-validator"
import { getUserProfile, LoginUser, logoutUser, RegisterUser } from "../controllers/userController"
import checkToken from "../middleware/CheckToken"
const router = express.Router()

           

router.post("/register",[
               body("email").isEmail().withMessage("invalid email"),
               body("firstName").isLength({min:3}).withMessage("the first name should be minimum of 3 character"),
               body("password").isLength({min:6}).matches(/[!@#$%^&*(),.?":{}|<>]/). withMessage("the password should be 6 characters long")
],
               RegisterUser
)


router.post("/login",[
               body("email").isEmail().withMessage("invalid email"),
               body("firstName").isLength({min:3}).withMessage("the firstName should be minimum of 3 characters"),
               body("password").isLength({min:6}).withMessage("the password should be mininmum of 6 characters")
],
               LoginUser
)

router.get("/profile", checkToken ,getUserProfile)

router.get("/logout" ,checkToken, logoutUser)


export default router; 