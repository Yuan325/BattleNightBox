import React, { useState, useEffect } from "react";
import socket from "../../Socket";

const TemplateV = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((messages) => [...messages, message]);
        });
    }, []);

    return (
        <div>
            {messages.map((val, i) => {
                return(
                    <div key={i}>
                        {val.text}
                        <br />
                        <b>{val.user}</b>
                        <br />
                        <br />
                    </div>
                );
            })}
        </div>
    );
};

export default TemplateV;