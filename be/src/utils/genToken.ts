import JWT from "jsonwebtoken"
const secret = process.env.SECRET || "token"


export const createToken = (id:number)=>{
               const token = JWT.sign({id} , secret)
               return token;
}

