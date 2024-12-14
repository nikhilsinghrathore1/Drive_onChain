import { validateBaseChain } from "web3/lib/commonjs/eth.exports"
import { prisma } from "../db/db"
import { hashedPassword } from "../utils/passwordHashing"


type VehicalType = "auto" | "bike" | "car";

interface val { 
               fullName : string
               email:string,
               password:string,
               capacity:number,
               plateNumber : number,
               vehical_type:VehicalType,
               color:string



}

export const createCaptainService =async (parameter:val) => {
               if(!parameter.fullName || !parameter.email || !parameter.capacity || !parameter.plateNumber || !parameter.vehical_type){
                              throw new Error("all fields are required")
               }              

               try{
                              const captainhashedPassword =  await hashedPassword(parameter.password)
                              if(captainhashedPassword){

                                             const captain = await prisma.captain.create({
                                                            data:{
                                                                           fullName:parameter.fullName,
                                                                           email:parameter.email,
                                                                           password:captainhashedPassword,
                                                                           capacity:parameter.capacity,
                                                                           vehical_type : parameter.vehical_type  , 
                                                                           color:parameter.color,
                                                                           plateNumber:parameter.plateNumber
                                                            }
                                             })

                                             return captain; 
                              }
               }
               catch(err){
                              console.log("there was some error while creating captain" , err)
                              return;
               }
}
