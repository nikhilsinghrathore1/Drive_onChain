import { prisma } from "../db/db";
import { Request,Response,NextFunction } from "express";
import {validationResult} from "express-validator"
import { hashedPassword } from "../utils/passwordHashing";
import { storeUser } from "../services/userService";
import { createToken } from "../utils/genToken";


export const RegisterUser =async (req:Request,res:Response,next:NextFunction) =>{

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
                              // now i have to hash the password 
                              const hashed_password = await hashedPassword(password)


                              // have to store the user information in the database; 
                              const user = await storeUser(firstName,lastName || "", email, hashed_password || password , )       


                              // have to generate the jsonwebtoken for it now
                              const token =  createToken({firstName,email, password});
                              res.status(200).json({user , token:token})
}              
