import dotenv from "dotenv"
dotenv.config()
import express ,{Application, Request , Response, urlencoded} from "express";
import cors from "cors"
import UserRouter  from "./routes/userRouter";
import captainRouter from "./routes/captainRouter"
import cookieparser from "cookie-parser"
const app:Application = express()


import { Captain, User } from "@prisma/client";

declare global {
  namespace Express {
    interface req {
      user?: User;
      captain?:Captain
    }
  }
}

app.use(cors())
app.use(cookieparser());
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/user",UserRouter)
app.use("/captain",captainRouter)


app.get("/",(req:Request,res:Response)=>{
               res.send("hello from nikochan")
})




export default app 