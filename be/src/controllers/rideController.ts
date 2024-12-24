import { Request, Response } from "express"
import { validationResult } from "express-validator"
import { createNewRide } from "../services/riderServices"
import travelFare from "../utils/fare"
import getotp from "../utils/getOTP"


export const createRide = async (req:Request, res:Response) =>{
               const error = validationResult(req)
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
                              return 
               }
               const {pickup , destination , vehical_type} = req.body


               try{
                              const fare =await travelFare(pickup , destination)
                              if (!fare[vehical_type]) {
                                             res.status(400).json({ msg: `Invalid vehicle type: ${vehical_type}` });
                                             return;
                              }else{
                                             const otp = getotp(4)
                                             console.log(fare)
                                             
                                             const NewRide = await createNewRide(pickup , destination , vehical_type , fare[vehical_type] , req.user?.id as number  , otp )
                                             res.status(200).json({ride:NewRide})
                                             return ; 
                              }


               }
 

                              // okay so if this thing is not working then i will create something else can't just sit like this 

               catch(err){
                              res.status(400).json({msg:"there was some error while creating the ride"})
               }
}

export const listOfFare = async(req:Request , res:Response) =>{
               const error = validationResult(req) ; 
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
               }
               try{
                              const {pickup , destination ,} = req.body
                              const allFare = await travelFare(pickup , destination) 
                              res.status(200).json(allFare)
               }catch(err){
                              res.status(400).json({error:err})
               }
}