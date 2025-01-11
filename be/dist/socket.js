"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToSocketId = exports.initialiseSocketServer = void 0;
const socket_io_1 = require("socket.io");
const db_1 = require("./db/db"); // Assuming Prisma is used for both models.
let io;
const initialiseSocketServer = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);
        socket.on("join", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { userId, userType } = data;
                if (userType === "user") {
                    yield db_1.prisma.user.update({
                        where: { id: userId },
                        data: { socketId: socket.id },
                    });
                }
                else if (userType === "captain") {
                    yield db_1.prisma.captain.update({
                        where: { id: userId },
                        data: { socketId: socket.id },
                    });
                }
                else {
                    console.log("Invalid userType provided.");
                }
            }
            catch (error) {
                console.error("Error in 'join' event:", error);
            }
        }));
        socket.on("update-captain-location", (data) => __awaiter(void 0, void 0, void 0, function* () {
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
                yield db_1.prisma.captain.update({
                    where: { id: userId },
                    data: {
                        ltd: location.ltd,
                        lng: location.lng,
                    },
                });
                console.log("Captain location updated successfully");
                socket.emit("location-updated", { msg: "Location updated successfully" });
            }
            catch (error) {
                console.error("Error updating captain location:", error);
                socket.emit("error", { msg: "Failed to update location" });
            }
        }));
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};
exports.initialiseSocketServer = initialiseSocketServer;
const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
    else {
        console.log("socket io is not initialised");
    }
};
exports.sendMessageToSocketId = sendMessageToSocketId;
