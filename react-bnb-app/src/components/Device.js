import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/home.css";

const Device = () => {
    const [searchParams] = useSearchParams();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    useEffect(() => {
        const name = searchParams.get('name');
        const room = searchParams.get('room');
        setRoom(room);
        setName(name);
    }, [searchParams]);    


    return (
        <div>
            <h1>Pick your device</h1>
            <Link
                onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                to={`/view?name=${name}&room=${room}`}
            >
                <button className="home-btn" type="submit">
                    VIEW
                </button>
            </Link>
            <Link
                onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                to={`/controller?name=${name}&room=${room}`}
            >
                <button className="home-btn" type="submit">
                    CONTROLLER
                </button>
            </Link>
        </div>
    );
};

export default Device;