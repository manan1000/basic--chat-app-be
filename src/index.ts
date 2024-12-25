import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[]=[];

wss.on("connection",(socket)=>{

    userCount+=1;
    allSockets.push(socket);
    console.log("User connected #"+userCount);
    

    socket.on("message", (message) =>{

        console.log("message received "+message.toString());
        setTimeout(()=>{
            for(const s of allSockets){
                s.send(message.toString() + " - sent from server!")
            }
        },1000);
    })
});
