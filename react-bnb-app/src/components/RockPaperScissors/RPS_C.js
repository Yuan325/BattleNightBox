import React, { useState } from "react";
import socket from "../../Socket";

const RPS_C = () => {
    const [choice, setChoice] = useState("");
    let ready = false;

    const submitChoice = (e) => {
        socket.emit("sendChoice", { choice });
    };

    const submitScissors = (e) => {
            setChoice("scissors");
            submitChoice(); //sendChoice emit
        };
    const submitPaper = (e) => {
            setChoice("paper");
            submitChoice();
    };
    const submitRock = (e) => {
            setChoice("rock");
            submitChoice();    
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