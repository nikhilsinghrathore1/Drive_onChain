import JWT from "jsonwebtoken"
const secret = process.env.SECRET || "token"

interface val { 
               firstName : string , 
               email: string , 
               password : string 
}

export const createToken = ({firstName, email , password}:val)=>{
               const token = JWT.sign({firstName,email,password} , secret)
               console.log("this is the internal token " , token)
               return token;
}