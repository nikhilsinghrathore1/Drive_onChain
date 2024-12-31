import { ripemd160 } from "ethers";
import {Request , Response} from "express"
import {validationResult} from "express-validator"
import { prisma } from "../db/db";
import { createCaptainService } from "../services/captainService";
import { CreateBlackListToken } from "../services/userService";
import { createToken } from "../utils/genToken";
import { comparePassword } from "../utils/passwordHashing";


// captain register route

export const createCaptain = async(req:Request,res:Response) =>{
               const error = validationResult(req);
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
                              return
               }

               const {email , fullName , vehical_type , plateNumber , color , password , capacity } = req.body


               const isCaptainAlreadyExists = await prisma.captain.findFirst({where:{
                              email:email
               }})

               if(isCaptainAlreadyExists){
                              res.status(400).json({msg:"captain already exists"})
                              return
               }

               const captain = await createCaptainService({fullName,email, password, capacity, plateNumber,vehical_type,color})
               if(!captain){
                              res.status(400).json({msg:"there was some issue while creating the captain"})
                              return
               }

               const token = createToken(captain.id)
               res.cookie("token",token)

               if(!token){
                              res.status(400).json({msg:"there was some issue while generating the captian auth token"})
                              return
               }

               res.status(200).json({captain ,token})
}

// captain login route
export const loginCaptain = async(req:Request , res:Response)=>{
               const error = validationResult(req) ; 
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
                              return ; 
               }

               const {email , password } = req.body

              const captian = await prisma.captain.findFirst({where:{
               email:email
              }})
               

              if(!captian){
               res.status(400).json({msg:"the captain does not exists"})
               return ; 
              }

              const checked_password = await comparePassword(captian.password,password)

              if(!checked_password){
               res.status(400).json({msg:"invalid password"})
               return ;
              }

              const token = createToken(captian.id)
              res.cookie("token",token)

              res.status(200).json({captian , token})


}

// captain get profile route

export const getCaptainProfile =async (req:Request,res:Response) => {
               if(req.captain){
                              res.status(200).json({captain:req.captain})
                              return ; 
               }
               else{
                              res.status(400).json({msg:"captain does not exists"})
               }
}

// captain logout route 

export const logoutCaptain =async (req:Request,res:Response) => {
               const token = req.headers.authorization?.split(" ")[1] || ""
               res.clearCookie("token")
               // i have to blacklist the token then have to clear the cookies then logout 

               if(!token){
                              res.status(400).json({msg:"invalid captain"})
                              return ; 
               }

               try{

                              const blacklistedToken = await CreateBlackListToken(token)
                              
                              if(!blacklistedToken){
                                             res.status(400).json({msg:"the blacklisted token was not created"})
                                             return
                              }
                              res.status(200).json({msg:"logout"})
               }
               catch(err){
                              res.status(400).json({msg:err})
                              return ;
               }
}