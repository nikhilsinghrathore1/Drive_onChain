import { prisma } from "../db/db";
import { Request,Response } from "express";
import {validationResult} from "express-validator"
import { comparePassword, hashedPassword } from "../utils/passwordHashing";
import { CreateBlackListToken, storeUser } from "../services/userService";
import { createToken } from "../utils/genToken";
import { toNumber } from "ethers";



// register user route 

export const RegisterUser =async (req:Request,res:Response) =>{

                              const error = validationResult(req)
                              if(!error.isEmpty()){
                                             res.status(400).json({error:error.array()})
                              }
                             const {firstName , lastName , email ,  password} = req.body
                              
                              console.log(firstName  , lastName , email , password)

                              

                              const isAlreadyUser = await prisma.user.findFirst({
                                             where:{
                                                            email:email
                                             }
                              })

                              if(isAlreadyUser){
                                             res.status(400).json({msg:"user already exists"})
                              }
                              else{

                              
                              // now i have to hash the password 
                              const hashed_password = await hashedPassword(password)


                              // have to store the user information in the database; 
                              const user = await storeUser(firstName,lastName || "", email, hashed_password || password , )       

                              if(user){

                                             
                                             // have to generate the jsonwebtoken for it now
                                             const token =  createToken(user.id);
                                             res.status(200).json({user , token:token})
                              }
                              else{
                                             res.status(400).json({msg:"there was some issue while creating the user"})
                              }
               }
}              


// login user route 

export const LoginUser = async(req:Request , res:Response)=>{
               const error = validationResult(req) ; 
        
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
               }
else{


               const {password , email} = req.body; 
               console.log(email)
               const user = await prisma.user.findFirst({where:{
                              email:email 
               }})

               if(!user) {
                              res.status(400).json({msg:"the user doesn't exists"})
               }
               else{

           

               const stored_password = user?.password;

               const checked_password = await comparePassword(stored_password || "" , password)
               console.log(checked_password); 

               if(!checked_password){
                              res.status(400).json({msg:"incorrect password"})
               }
               else{

                              
                              const token = createToken(user.id);

                              res.cookie('token', token);

                              
                              res.status(200).json({user,token})
               }
}
}

}

// get user profile 

export const getUserProfile = (req:Request,res:Response)=>{
               res.status(200).json({user : req.user})
}
  

export const logoutUser = async(req:Request ,res:Response)=>{
               res.clearCookie("token")
               const token = req.headers.authorization?.split(" ")[1]
               if(!token){
                              res.status(400).json({msg:"token not present "})
                              return ; 
               }
               else{

                              const blacklistedToken = await CreateBlackListToken(token)

                              res.status(200).json({blacklistedToken , msg:"logged out"})
               }

}