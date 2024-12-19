import axios from "axios";
import { loginCaptain } from "../controllers/captainController";
import { detectTransactionType } from "web3/lib/commonjs/eth.exports";
// function to give the address cordinates 
export const  giveCordinates = async(address:string)=>{
               if(!address){
                              throw new Error("all fields are required");
               }

               const apiKey = process.env.GOOGLE_MAP_API  || "";
               const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

              

               try{
                              const result = axios.get(url).then((data)=>{
                                             if(data.data.status = "ok"){
                                                            const location = data.data.result[0].geometry.location
                                                            return {
                                                                           ltd :location.lat,
                                                                           lng:location.lng
                                                            }
                                             }else{
                                                            console.log("there was some error while fetching the cordinates")
                                                            throw new Error(`can't fetch the cordinates of give location: ${address}`)
                                             }

                              })             
               }
               catch(err){
                              console.log(err)
                              throw err
               }
}


// function to return the distance and time

export const giveDistancAndTime = async(address:string,destination:string)=>{
               if(!address || !destination){
                              throw new Error("all the fields are required");
               }
               const apiKey = process.env.GOOGLE_MAP_API; 
               const url =`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
               try{
                              const response= await axios.get(url)

                              if(response.data.status ==="OK"){
                                             if(response.data.rows[0].elements[0].status ==="ZERO_RESUTLS"){
                                                            throw new Error("no routes found")
                                             }
                                             return response.data.rows[0].elements[0]

                              }
                              else{
                                             throw new Error("unable to fetch distance and time")               
                              }
               }
               catch(err){
                              throw new Error("some error occured while geting the distanc and time")
               }
}


// this is the function to return the location suggestion 

export const getlocationSuggestion = async(input:string)=>{
               if(!input){
                              throw new Error("all the fields are required")
               }
               const apiKey = process.env.GOOGLE_MAP_API ; 
               const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

               try{
                              const response = await axios.get(url)
                              return response.data.predictions.map(prediction=>prediction.description).filter(value=>value)
               }catch(err){
                              console.log(err)
                              throw new Error("unable to fetch suggestions")
               }

               
}