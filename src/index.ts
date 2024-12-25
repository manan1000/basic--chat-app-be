import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket,
    roomId: string
}
let userCount = 0;
let allSockets: User[] = [];

wss.on("connection", (socket) => {

    socket.on("message", (message) => {

        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                roomId: parsedMessage.payload.roomId
            })

            console.log("User joined room: "+parsedMessage.payload.roomId);
            
        }

        if (parsedMessage.type === "chat") {
            const currentUser = allSockets.find((user) => user.socket === socket);
            
            for(let user of allSockets){
                if(user.roomId === currentUser?.roomId){
                    user.socket.send(parsedMessage.payload.message);
                }
            }
        }
    })

});
