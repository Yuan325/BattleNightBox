import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    
    return (
        <div>
            <h1>Welcome to Battle Night Box!</h1>
            <div>
                <input 
                    className="home-input"
                    placeholder="Name" 
                    type="text" 
                    onChange={(event) => setName(event.target.value)} 
                    required 
                />
            </div>
            <div>
                <input 
                    className="home-input"
                    placeholder="ROOM"
                    type="text" 
                    onChange={(event) => setRoom(event.target.value)}
                    required
                />
            </div>
            <Link
                onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                to={`/game?name=${name}&room=${room}`}
            >
                <button className="home-btn" type="submit">
                    Create Room
                </button>
            </Link>

            <Link
                onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                to={`/device?name=${name}&room=${room}`}
            >
                <button className="home-btn" type="submit">
                    Join Room
                </button>
            </Link>
        </div>
    );
};

export default Home;