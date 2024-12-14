import {Request ,Response} from "express"
import {validationResult} from "express-validator"


const createRide = async(req:Request,res:Response)=>{
               const error = validationResult(req); 
               if(!error.isEmpty()){
                              res.status(400).json({error:error.array()})
                              return ;
               }
               const {pickUp , distination , vehical_type} = req.body

               

}

// this is to be done afterwards 