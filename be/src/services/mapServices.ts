import axios from "axios";
import { prisma } from "../db/db";


export const  giveCordinates = async(address:string)=>{
               if(!address){
                              throw new Error("all fields are required");
               }

               const apiKey = process.env.MAP_API ;
                
               console.log(apiKey)
               const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// function to return the distance and time

export const giveDistancAndTime = async(address:string,destination:string)=>{
         
               if(!address || !destination){
                              throw new Error("all the fields are required");
               }
 
               const apiKey = process.env.MAP_API; 

               const url =`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(address)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
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
               const apiKey = process.env.MAP_API ; 
               const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

               try{
                              const response = await axios.get(url)
                              return response.data.predictions.map(prediction=>prediction.description).filter(value=>value)
               }catch(err){
                              console.log(err)
                              throw new Error("unable to fetch suggestions")
               }

               
}

// return all the captain in the radius 

export const captainInRadius =async (ltd:number , lng:number , radius:number) =>{
    if(!ltd || !lng || !radius){
        throw new Error("all fields are required"); 
    }
    try{
        const earthRadius = 6371 ; 

        const captains = await prisma.captain.findMany({
            where: {
              AND: [
                {
                  ltd: {
                    gte: ltd - (radius / earthRadius) * (180 / Math.PI),
                    lte: ltd + (radius / earthRadius) * (180 / Math.PI),
                  },
                },
                {
                  lng: {
                    gte: lng - (radius / earthRadius) * (180 / Math.PI) / Math.cos(ltd * (Math.PI / 180)),
                    lte: lng + (radius / earthRadius) * (180 / Math.PI) / Math.cos(ltd * (Math.PI / 180)),
                  },
                },
              ],
            },
          });
          
          return captains ;

    }catch(err){
        console.log(err)
        throw err
    }
} 