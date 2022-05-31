import React, { useState } from "react";
import socket from "../../Socket";

const TemplateC = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit("sendMessage", { message });
            setMessage("");
        } else alert("empty input");
    };
    
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <input type="submit" />
            </form>
        </div>
    );
};

export default TemplateC;