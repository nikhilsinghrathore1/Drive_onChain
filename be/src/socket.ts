import { Server } from "socket.io";
import { prisma } from "./db/db"; // Assuming Prisma is used for both models.

let io;

export const initialiseSocketServer = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);

             socket.on("join", async (data) => {
            try {
                const { userId, userType } = data;
                console.log(userId)
                console.log(userType)

                if (userType === "user") {
                    await prisma.user.update({
                        where: { id: userId as number },
                        data: { socketId: socket.id }, 
                    });
                } else if (userType === "captain") {
                    await prisma.captain.update({
                        where: { id: userId },
                        data: { socketId: socket.id }, 
                    });
                } else {
                    console.log("Invalid userType provided.");
                }
            } catch (error) {
                console.error("Error in 'join' event:", error);
            }
        });

        socket.on("upadate-captain-location" , async(data) =>{
               const {userId , location} = data ; 

               if(!location || location.ltd || location.lng){
                              socket.emit("error" , {msg:"all fields are required"})       
                              return ;  
               }
               await prisma.captain.update({
                              where:{id:userId},
                              data:{
                                             ltd:location.ltd ,
                                             lng:location.lng
                              }
               })
        })
 
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};


export const sendMessageToSocketId = (socketId , messageObject) =>{
               console.log("this is the message object" , messageObject)

               if(io){
                              io.to(socketId).emit(messageObject.event, messageObject.data)
               }else{
                              console.log("socket io is not initialised")
               }
}
