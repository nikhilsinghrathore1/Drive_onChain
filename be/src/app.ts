import dotenv from "dotenv"
dotenv.config()
import express ,{Application, Request , Response, urlencoded} from "express";
import cors from "cors"
import UserRouter  from "./routes/userRouter";

const app:Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/user",UserRouter)



app.get("/",(req:Request,res:Response)=>{
               res.send("hello from nikochan")
})




export default app 