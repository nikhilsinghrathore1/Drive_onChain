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

        socket.on("update-captain-location", async (data) => {
            console.log("Entered in the socket location");
        
            const { userId, location } = data;
        
            console.log("This is user ID:", userId);
            console.log("This is location details:", location);
        
            if (!userId) {
                socket.emit("error", { msg: "User ID is required" });
                return;
            }
        
            if (!location || typeof location.ltd !== "number" || typeof location.lng !== "number") {
                socket.emit("error", { msg: "Invalid location coordinates" });
                return;
            }
        
            try {
                await prisma.captain.update({
                    where: { id: userId },
                    data: {
                        ltd: location.ltd,
                        lng: location.lng,
                    },
                });
        
                console.log("Captain location updated successfully");
                socket.emit("location-updated", { msg: "Location updated successfully" });
            } catch (error) {
                console.error("Error updating captain location:", error);
                socket.emit("error", { msg: "Failed to update location" });
            }
        });
        
 
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};


export const sendMessageToSocketId = (socketId , messageObject) =>{
              

               if(io){
                              io.to(socketId).emit(messageObject.event, messageObject.data)
               }else{
                              console.log("socket io is not initialised")
               }
}
