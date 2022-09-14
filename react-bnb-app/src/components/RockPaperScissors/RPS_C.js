import React, { useState } from "react";
import socket from "../../Socket";

//todo
//make ready button only able to click once
//merge ready and choice button
//wait for all player
//result page

const RPS_C = () => {
    var ready = false;

    const submitScissors = (e) => {
            socket.emit("sendChoice", { choice: "S" });
        };
    const submitPaper = (e) => {
            socket.emit("sendChoice", { choice: "P"});
    };
    const submitRock = (e) => {
            socket.emit("sendChoice", { choice: "R" });
    };

    const playerReady = (e) =>{
        ready = true;
        socket.emit("sendStatus", {ready});
    }

    return (
        <div>
            <button onClick={submitRock}>
                Rock
            </button>
            <button onClick={submitPaper}>
                Paper
            </button>
            <button onClick={submitScissors}>
                Scissors
            </button>
            <button onClick={playerReady} style = {{color: 'red'}}>
                Ready
            </button>
        </div>
    );
};

export default RPS_C;