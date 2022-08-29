import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import socket from "../Socket";
import SudokuC from "./sudoku/SudokuC";
import TemplateC from "./archive/TemplateC";
import RPS_C from "./RockPaperScissors/RPS_C";

const ControllerDevice = () => {
    const [searchParams] = useSearchParams();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [game, setGame] = useState("");
    const device = "controller";

    useEffect(() => {
        const name = searchParams.get('name');
        const room = searchParams.get('room');
        setRoom(room);
        setName(name);

        socket.emit("join", { name, room, device, game }, (error) => {
            if (error) {
                alert(error);
            }
        });

        socket.emit("getRoom");
    }, [searchParams]);

    useEffect(() => {
        socket.on("roomInfo", (room) => {
            setGame(room.game);
        });
    }, []);
    
    return (
        <div>
            <div>Room: {room}</div>
            <div>User: {name}</div>
            <br />
            <div>Controller device</div>
            <br />
            {(() => {
                if (game === "sudoku") {
                    return (
                        <SudokuC />
                    )
                }
                if (game === "chat"){
                    return (
                        <TemplateC />
                    )
                }
                if (game === "RockPaperScissors"){
                    return (
                        <RPS_C />
                    )
                }
            })()}
        </div>
    );
};

export default ControllerDevice;