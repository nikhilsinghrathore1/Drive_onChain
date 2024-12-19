import { Request, Response } from "express"
import { validationResult } from "express-validator"
import { createNewRide } from "../services/riderServices"
import travelFare from "../utils/fare"



export const createRide = async (req:Request, res:Response) =>{
               const error = validationResult(req)
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
                              return 
               }
               const {pickup , destination , vehical_type} = req.body


               try{

                              const fare =await travelFare(pickup , destination)
                          
                              const NewRide = await createNewRide(pickup , destination , vehical_type , fare.vehical_type , req.user?.id, otp )


               }
               catch(err){
                              res.status(400).json({msg:"there was some error while creating the ride"})
               }
}