import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/home.css";
import Game from "./Game";

// create room -> pick game -> auto view device
// join room -> pick device (view or controller)

const Device = () => {
    const [searchParams] = useSearchParams();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const games = ["chat", "sudoku","RockPaperScissors"];
    

    useEffect(() => {
        const name = searchParams.get('name');
        const room = searchParams.get('room');
        setRoom(room);
        setName(name);

    }, [searchParams]);    

    return (
        <div>
            <div>Room {room}</div>
            <div>Pick a game!</div>
            <br />

            {games.map((val, i) => {
                return(
                    <div key={i}>
                        <Game game={val}/>
                    </div>
                );
            })}
        </div>
    );
};

export default Device;