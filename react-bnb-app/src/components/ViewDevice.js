import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import socket from "../Socket";
import SudokuV from "./sudoku/SudokuV";
import TemplateV from "./archive/TemplateV";
import RPS_V from "./RockPaperScissors/RPS_V";

const ViewDevice = () => {
    const [searchParams] = useSearchParams();
    const [room, setRoom] = useState("");
    const [game, setGame] = useState("");
    const device = "view";

    useEffect(() => {
        const room = searchParams.get('room');
        setRoom(room);

        socket.emit("join", { name: undefined, room, device, game }, (error) => {
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
            <div>View device</div>
            <br />
            {(() => {
                if (game === "sudoku") {
                    return (
                        <SudokuV />
                    )
                }
                if (game === "chat") {
                    return (
                        <TemplateV />
                    )
                }
                if (game === "RockPaperScissors"){
                    return (
                        <RPS_V />
                    )
                }
            })()}
        </div>
    );
};

export default ViewDevice;