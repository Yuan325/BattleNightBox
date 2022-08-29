// npm run dev
//node.js

const http = require("http");
const express = require("express");
const socketio = require('socket.io');
const { addUser, removeUser } = require("./user");
const { addOrEditRoom, getRoom, removeRoom } = require("./room");
const { addPlayerStatus, updatePlayerStatus, allPlayerStatus } = require("./RSP");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

const PORT = process.env.PORT || 5010

io.on("connection", (socket) => {
    socket.on("addRoom", ({room, game}, callBack) => {
        const { curRoom, roomError } = addOrEditRoom({id: socket.id, name: room, game});
        if (roomError) return callBack(roomError);
    });

    socket.on("join", ({ name, room, device, game }, callBack) => {
        const { user, userError } = addUser({ id: socket.id, name, room, device });
        if (userError) return callBack(userError);


        
        console.log(`A connection has been made`);

        socket.join(user.room);
        callBack(null);

        socket.on("getRoom", () => {
            const { curRoom, roomError } = getRoom(room);
            if (roomError) return callBack(roomError);

            socket.emit("roomInfo", {
                name: curRoom.name,
                game: curRoom.game,
            })
        });

        if (user.device === "controller"){
            socket.broadcast
                .to(user.room)
                .emit("message", { user: "Admin", text: `${user.name} has joined!`});
            callBack(null);
        }

        socket.on("sendMessage", ({message}) => {
            io.to(user.room).emit("message", {
                user: user.name,
                text: message,
            });
        });

        //test for RockPaperScissors

        if (user.device === "controller"){
            socket.broadcast
                .to(user.room)
                .emit("player", { user: "Player", text: `${user.name} has joined the battle!`});
            callBack(null);
            //addPlayerStatus({id: user.id, status: false});
            console.log(`testing`);
        }

        socket.on("sendChoice", ({choice}) => {
            io.to(user.room).emit("choice", {
                user2: user.name,
                text2: choice,
            });
        });

        socket.on("sendStatus", ({ready}) => {
            updatePlayerStatus({id:user.id, status: ready});
            const statusmessage = allPlayerStatus();
            socket.emit("displayStatus", {statusmessage});
        });
        //test end

        // THIS INFORMATION ONLY SHOWN AT VIEW
        if (user.device === "controller"){
            socket.broadcast
                .to(user.room)
                .emit("gamePlayers", { }); // SEND LIST OF CURRENT USER
            callBack(null);

            // get submission from controller, broadcast results to all
            socket.on("controllerSubmission", ({input, game}) => {
                // based on game, get output
            
                // emit game output: gameState
            });
        }

        socket.on("startGame", () => {
            // based on game, get the gameInitState (sudoku board)
            // NEED TO KNOW WHAT ROOM IS GIVEN WHICH BOARD
            let gameInitState;

            io.to(user.room).emit("gameInit", { gameInitState });
        });
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user !== undefined){
            io.to(user.room).emit("message", {
                user: "Admin",
                text: `${user.name} just left the room`,
            });

            let roomUsers = io.in(user.room).fetchSockets();
            if (roomUsers == 0){
                removeRoom(user.room);
                console.log(`Removing room ${user.room}`);
            }

            console.log(`A disconnection has been made`);
        }
    });
});

server.listen(PORT, () => console.log(`Server is connected to port ${PORT}`))


// ONLY ON VIEW SIDE
// if (user.device === "controller"){
//     socket.broadcast
//         .to(user.room)
//         .emit("message", { user: "Admin", text: `${user.name} has joined!`});
//     callBack(null);
// }

// ONLY ON CONTROLLER SIDE
// socket.on("sendMessage", () => {
//     io.to(user.room).emit("message", {
//         user: user.name,
//         text: message,
//     });
// });