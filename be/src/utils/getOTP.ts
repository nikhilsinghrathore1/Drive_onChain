import crypto from "crypto"

const getotp = (num:number) =>{
               if (!num){
                              throw new Error("all fields are required")
               }
               const otp = crypto.randomInt(Math.pow(10 , num-1), Math.pow(10,num)).toString()
               return otp; 
}

export default getotp; 
