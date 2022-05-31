import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import socket from "../Socket";
import "../styles/home.css";

const Game = (props) => {
    const [searchParams] = useSearchParams();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const game = props.game;

    useEffect(() => {
        const name = searchParams.get('name');
        const room = searchParams.get('room');
        setRoom(room);
        setName(name);
    }, [searchParams]);

    const setGame = () => {
        socket.emit("addRoom", { room, game }, (error) => {
            if (error) {
                alert(error);
            }
        });
    };

    return (
        <div>
            <Link
                onClick={setGame}
                to={{ 
                    pathname: `/view?name=${name}&room=${room}`,
                }}
            >
                <button className="home-btn" type="submit">
                    {props.game}
                </button>
            </Link>
        </div>
    );
};

export default Game;