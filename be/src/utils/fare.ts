import axios from "axios"
import { giveDistancAndTime } from "../services/mapServices"

const travelFare = async(origin:string , destination:string) =>{
                            
               if(!origin || !destination ){
                              throw new Error("all fields are required")
               }

               const baseFare = {
                              car:50 , 
                              auto:30 , 
                              bike:20
               }
               const ratePerKm = {
                              car:15,
                              auto:10,
                              bike:8
               }
               const perMinuteRate = {
                              car:3 , 
                              auto: 2 , 
                              bike : 1.5
               }

               const distanceTime = await giveDistancAndTime(origin , destination); 


               const fare = {
                              car : Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * ratePerKm.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
                              auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * ratePerKm.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
                              bike: Math.round(baseFare.bike + ((distanceTime.distance.value / 1000) * ratePerKm.bike) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
               }
               return fare; 
}

export default travelFare;