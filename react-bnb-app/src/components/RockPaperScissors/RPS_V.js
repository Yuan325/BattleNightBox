import React, { useState, useEffect } from "react";
import socket from "../../Socket";


//to do
//show all player status successfully, and updates it
//show score


const RPS_V = () => {
    const [players, setPlayers] = useState([]);
    const [allPlayerStatus, setAllPlayerStatus] = useState("Waiting for players to join");
    const [choices, setChoices] = useState([]);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        socket.on("player", (player) => {
            setPlayers((players) => [...players, player]);
            console.log(`player check`)
        });

        // test
        socket.on("choice", (choice) => {
            setChoices((choices) => [...choices, choice]);
            console.log(`choice checking`);
        });

        
        socket.on("displayStatus", ({message}) =>{
            setAllPlayerStatus(message);
            console.log(message);
        });

        socket.on("score", (score) => {
            setScores((scores) => [...scores, score]);
            console.log(`score socket run`);
        });

    }, []);


    return (
        <div>
            {players.map((val, i) => {
                return(
                    <div key={i}>
                        {val.text}
                        <br />
                    </div>
                );
            })}
            <div> {allPlayerStatus} </div>
            {scores.map((val,i)=> {
                return (
                    <div key={i}>
                        {val.user3} score: {val.score3}
                        <br />
                    </div>
                );
            })}
            {choices.map((val,i)=> {
                return (
                    <div key={i}>
                        {val.user2} choose {val.text2}
                        <br />
                    </div>
                );
            })}
        </div>
    );
};

export default RPS_V;