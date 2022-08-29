import React, { useState, useEffect } from "react";
import socket from "../../Socket";


//to do
//show all player status successfully, and updates it
//show score


const RPS_V = () => {
    const [players, setPlayers] = useState([]);
    const [allPlayerStatus, setAllPlayerStatus] = useState("");
    const [choices, setChoices] = useState([]);

    useEffect(() => {
        socket.on("player", ({player}) => {
            setPlayers((players) => [...players, player]);
        });

    }, []);

    useEffect(() => {
        socket.on("choice", ({choice}) => {
            setChoices((choices) => [...choices, choice]);
        });

    }, []);


    //all player status still not render yet
    useEffect(() => {
        socket.on("displayStatus", ({statusmessage}) =>{
            setAllPlayerStatus(statusmessage);
        });
    }, []);

    console.log(players);

    return (
        <div>
            {players.map((val, i) => {
                return(
                    <div key={i}>
                        {val.text}
                        <b>{val.user}</b>
                        <br />
                        <br />
                    </div>
                );
            })}
        </div>
    );
};

export default RPS_V;