import { prisma } from "../db/db";

export const createNewRide = async(pickup:string , destination:string , vehical_type:string , fare:number , userId : number , otp:string)=>{
               if(!pickup || !destination || !vehical_type){
                              throw new Error("all fields are required"); 
               }
               try{
                              const newRide = await prisma.ride.create({
                                             data:{
                                                            pickup:pickup,
                                                            destination:destination,
                                                            fare :fare,
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