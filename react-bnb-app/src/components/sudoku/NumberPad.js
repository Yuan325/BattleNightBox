import React from "react";
import { BsEraser } from "react-icons/bs";
import "../../styles/home.css";
import "../../styles/sudoku.css";

const NumberPad = (props) => {
    const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="sudoku-pad">
            <div className="sudoku-numberPad">
                {numberPad.map((num, i) => (
                    <div className="sudoku-inlineblock " key={`numberBlock-${num}`}>
                        <div key={num} className="sudoku-numbers" onClick={() => props.onNumberClick(num)}>{num}</div>
                    </div>
                ))}
            </div>
            <div className="sudoku-iconPad">
                <div className="sudoku-inlineblock" key={`eraser-icon}`}>
                    <BsEraser className="sudoku-icon" onClick={() => props.onNumberClick(null)} />
                </div>
            </div>
        </div>
    );
};

export default NumberPad;