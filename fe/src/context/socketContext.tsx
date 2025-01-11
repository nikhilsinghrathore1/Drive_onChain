import { createContext, useEffect, ReactNode } from "react";
import { io, Socket } from "socket.io-client";


interface SocketContextType {
    socket: Socket;
}


const SocketContext = createContext<SocketContextType | null>(null);


const socket = io(`${import.meta.env.VITE_BASE_URL}`);

interface SocketProviderProps {
    children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    useEffect(() => {
     
        socket.on("connect", () => {
            console.log("connected");
        });

        socket.on("disconnect", () => {
            console.log("disconnected");
        });


        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
        
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };
