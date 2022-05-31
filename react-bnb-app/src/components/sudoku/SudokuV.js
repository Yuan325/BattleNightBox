import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import "../../styles/sudoku.css";
import "./NumberPad";
import NumberPad from "./NumberPad";
import {checkInput, countUnknowns } from "./SudokuJudge";

const SudokuV = () => {
    const [users, setUsers] = useState(["Yuan", "Thean"])

    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>Sudoku View</h1>
        </div>
    );
};

export default SudokuV;