import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
const saltround:number = parseInt(process.env.HASHSALT || "10" , 10) ; 


export const hashedPassword = async(password:string)=>{
               try{

                              const salt = await bcrypt.genSalt(saltround);
                              const hash = await bcrypt.hash(password, salt);
                              return hash;
               }
               catch(err){
                              console.log("there was some problem while hashing" , err)
                              return null;
               }

}



