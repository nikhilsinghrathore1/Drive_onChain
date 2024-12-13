import JWT from "jsonwebtoken"
const secret = process.env.SECRET || "token"


export const createToken = (id:number)=>{
               const token = JWT.sign({id} , secret)
               console.log("this is the internal token " , token)
               return token;
}

