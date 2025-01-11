import { Captain } from "@prisma/client";
import { prisma } from "../db/db";
import { confirmRide } from "../controllers/rideController";

export const createNewRide = async(pickup:string , destination:string , vehical_type:string , fare:number , userId : number , otp:string , distance:number)=>{
               if(!pickup || !destination || !vehical_type){
                              throw new Error("all fields are required"); 
               }
               try{
                              const newRide = await prisma.ride.create({
                                             data:{
                                                            pickup:pickup,
                                                            destination:destination,
                                                            fare :fare,
                                                            distance:distance,
                                                            userId : userId,
                                                            otp : otp
                                             }
                              })

                              return newRide; 
               }
               catch(err){
                              throw new Error(`there was some internal error while creating the ride ${err}`)
                              
               }
}

export const confirmingRide = async(rideId:number, captain:Captain)=>{
               if(!rideId|| !captain){
                              throw new Error("all fields are required")
               }
               try{
                              const confirmedRide = await prisma.ride.update({
                                             where:{id:rideId} , 
                                             data:{
                                                            captainId:captain.id,
                                                            status:"accepted"
                                             },
                                             include:{
                                                            user:true
                                             }
                              })
                              console.log(confirmedRide)
                              return confirmedRide
               }catch(err){
                              console.log(err)
                              throw err
               }
}

export const startTheRide = async(rideId:number,otp:string) =>{
               if(!rideId || !otp) {
                              throw new Error("all fields are required")
               }
               try{
                              // i have to find the ride first 

                              const ride = await prisma.ride.findFirst({
                                             where:{
                                                            id:rideId
                                             }
                              })
                              console.log("this is the ride details of the start ride",ride)
                              if(ride){
                                             if(ride.status!="accepted"){
                                                            throw new Error("ride not accepted")
                                             }
                                             if(ride.otp != otp){
                                                            throw new Error("invalid otp entered")
                                             }
                                            const startedRide = await prisma.ride.update({
                                                            where:{
                                                                           id:rideId
                                                            },
                                                            data:{
                                                                           status:"ongoing"
                                                            },
                                                            include:{
                                                                           user:true
                                                            }

                                             })
                                             console.log("this is the started ride dets ",startedRide)
                                             return startedRide
                              }
               }catch(err){   
                              throw err
               }
}