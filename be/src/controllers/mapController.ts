import { query, validationResult } from "express-validator";
import { Request,Response } from "express";
import { getlocationSuggestion, giveCordinates, giveDistancAndTime } from "../services/mapServices";
import router from "../routes/userRouter";
import { responseEncoding } from "axios";
import travelFare from "../utils/fare";

// this is the route to get the cordinates

export const getCordinate = async(req:Request,res:Response)=>{
               const error = validationResult(req)
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
                              return; 
               }

               const {address} = req.query ;

               try{
                              console.log("entered")
                              const location  = await giveCordinates(address as string);
                              res.status(200).json(location)
                              return ;
               }catch(err){
                              console.log(err)
                              res.status(400).json({msg:"some internal error occoured"})
                              return ; 
               }
}


// this is the route to get the distance and time

export const getDistanceAndTime = async(req:Request,res:Response)=>{
               const error = validationResult(req);
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})              
                              return ; 
               }              

               const {address , destination} = req.query;
               try{

                              const distanceAndTime = await giveDistancAndTime(address as string,destination as string )
                              res.status(200).json(distanceAndTime)
                              return ; 

               }catch(err){

                              console.log(err)
                              res.status(400).json({msg:"there was some error while fetching the distance and time "})
                              return ; 
               }
}


// this is the route to return the suggestions 


export const getSuggestion = async(req:Request,res:Response)=>{
               const error = validationResult(req)
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
                              return ; 
               }
               try{
                              const {input} = req.query;
                              const suggestion = await getlocationSuggestion(input as string)
                              res.status(200).json(suggestion);
                              return ; 
               }
               catch(err){
                              console.log(err)
                              res.status(400).json({msg:"there was some "})
                              return; 
               }
}


export const returnFare =async(req:Request,res:Response)=>{
               const error = validationResult(req)
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
                              return 
               }
               try{
                              const {origin , destination} = req.query
                              if (typeof origin === 'string' && typeof destination === 'string') {
                                             const fare = await travelFare(origin, destination);
                                             res.status(200).json(fare)
                              }
                              else{
                                             res.status(400).json({msg:"invalid origin or destination"})
                              }
               }
               catch(err){
                              res.status(400).json({msg:err})
               }
}
