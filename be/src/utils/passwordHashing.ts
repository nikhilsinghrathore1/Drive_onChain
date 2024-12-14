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


export const comparePassword = async(password:string , stored_password:string) =>{
               try{
                              const compare = await bcrypt.compare(stored_password , password)
                              return compare
               }
               catch(err){
                              console.log("something went wrong while comparing the passwords" , err)
               }
}





