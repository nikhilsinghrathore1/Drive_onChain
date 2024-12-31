import * as http from "http"
import app from "./app"
import { initialiseSocketServer } from "./socket";

const port = process.env.PORT || 3000 ; 


const server = http.createServer(app)

initialiseSocketServer(server)

server.listen(port , ()=>{
               console.log(`server is running on port ${port}` )
})