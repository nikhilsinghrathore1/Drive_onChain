import dotenv from "dotenv"
dotenv.config()
import express ,{Application, Request , Response} from "express";
import cors from "cors"


const app:Application = express()

app.use(cors())


app.get("/",(req:Request,res:Response)=>{
               res.send("hello from nikochan")
})


export default app 