import { Request, Response,NextFunction } from "express";
import JWT from "jsonwebtoken";
import { prisma } from "../db/db";

 const checkToken = async(req:Request,res:Response,next:NextFunction)=>{
                              const token = req.headers.authorization?.split(" ")[1] || req.cookies.token

                              if(!token){
                                              res.status(401).json({msg:"unAuthorized"})
                                              return ; 
                              }
                              try{
                                             const decoded = JWT.verify(token , process.env.SECRET as string) as {id:number}

                                             const user = await prisma.user.findFirst({where:{
                                                            id:decoded.id
                                             }})
                                             if(!user){
                                                            res.status(404).json({msg:"user not found"})
                                                            return ;
                                             }

                                             req.user = user ; 
                                             next()
                              }
                              catch(err){
                                             console.log(err)
                                             res.status(400).json({msg:"something went wrong while checking token"})
                                             return 
                              }
}

export default checkToken; 