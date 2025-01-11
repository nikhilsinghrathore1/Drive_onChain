import { Request, Response } from "express"
import { validationResult } from "express-validator"
import { confirmingRide, createNewRide, startTheRide } from "../services/riderServices"
import travelFare from "../utils/fare"
import getotp from "../utils/getOTP"
import { captainInRadius, giveCordinates, giveDistancAndTime } from "../services/mapServices"
import { prisma } from "../db/db"
import { sendMessageToSocketId } from "../socket"
import { Socket } from "socket.io"



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
                                             
                                             const Faredistance = await giveDistancAndTime(pickup,destination)
                                             console.log(Faredistance.distance.value)
                                             const NewRide = await createNewRide(pickup , destination , vehical_type , fare[vehical_type] , req.user?.id as number  , otp , Faredistance.distance.value )
                                             res.status(200).json({ride:NewRide})
                                             

          

                                             const pickupCordinates = await giveCordinates(pickup)

                                             console.log(pickupCordinates)

                                             // now i have to find all the captain in the radius of this locaiton 
                                             const allTheCaptainInRadius = await captainInRadius(pickupCordinates.ltd , pickupCordinates.lng , 2 ) ; 

                                             console.log(allTheCaptainInRadius)
                                             // getting all the captains now 

                                             // clear the otp ; 
                                             NewRide.otp = "" ; 

                                             // now i have to extract the user from the ride that is generated here 

                                             const ridingUser = await prisma.ride.findMany({
                                                            where:{
                                                                           id:NewRide.id
                                                            },
                                                            include: {
                                                                           user: true, 
                                                            },
                                             })

                                             // now i have to map to all of the captains and have to send them this data 

                                             allTheCaptainInRadius.map(captain =>{
                                                            sendMessageToSocketId(captain.socketId , {
                                                                           event:"new-ride" , 
                                                                           data : ridingUser
                                                            })
                                                            console.log("msg sent to " , captain.socketId)
                                             })

                                             // okay now how do i test this 
                                             // lets create a new ride then we'll see
                                             // okay i got the problem it is that the captains don't have any location with them to track that's why the nearby captain query is returning empty so what to do now ig i have to update the captains location from the frontend 
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

export const confirmRide = async(req:Request,res:Response)=>{
               const error = validationResult(req)
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
               }  
               try{

                              const {rideId} = req.body
                              if(req.captain){

                                             const ride = await confirmingRide(rideId , req.captain )
                                             sendMessageToSocketId(ride.user.socketId , {
                                                            event:"ride-confirmed" , 
                                                            data:ride,
                                             })
                              }              
                              else{
                                             res.status(400).json({msg:"unAuthorized captain"})
                              }
               }catch(err){
                              console.log(err)
                              res.status(400).json(err)
               }
}

export const startRide = async(req:Request,res:Response)=>{
               const error = validationResult(req); 
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
               }
               try{
                              const {rideId , otp} = req.query
                              const rideid = Number(rideId)
                              const strotp = String(otp)
                             console.log(rideid, strotp)

                                             const startRiding = await startTheRide(rideid , strotp) ;
                                             
                                             sendMessageToSocketId(startRiding?.user.socketId,{
                                                            event:"start-ride",
                                                            data:startRiding
                                             })
                                             console.log("this is the captains socketid",req.captain?.socketId)
                                             if(req.captain){
                                                            console.log("sending msg to the captain")
                                                            sendMessageToSocketId(req.captain?.socketId,{
                                                                           event:"start-ride",
                                                                           data:startRiding
                                                            })
                                             }
                                             res.status(200).json(startRiding)
                                             return
                              
                              

               }catch(err){
                              res.status(400).json(err)
               }
}