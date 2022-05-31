import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import "../../styles/sudoku.css";
import "./NumberPad";
import NumberPad from "./NumberPad";
import {checkInput, countUnknowns } from "./SudokuJudge";
import socket from "../../Socket";

const SudokuC = () => {
    const [board, setBoard] = useState([[{value: 9, background: false, editable: false},
        {value: 1, background: false, editable: false},
        {value: 6, background: false, editable: false},
        {value: 3, background: false, editable: false},
        {value: 4, background: false, editable: false},
        {value: 5, background: false, editable: false},
        {value: 7, background: false, editable: false},
        {value: 8, background: false, editable: false},
        {value: 2, background: false, editable: false}],

        [{value: 8, background: false, editable: false},
        {value: 4, background: false, editable: false},
        {value: 2, background: false, editable: false},
        {value: 7, background: false, editable: false},
        {value: null, background: false, editable: true},
        {value: 9, background: false, editable: false},
        {value: 5, background: false, editable: false},
        {value: 6, background: false, editable: false},
        {value: 3, background: false, editable: false}],

        [{value: 5, background: false, editable: false},
        {value: 3, background: false, editable: false},
        {value: 7, background: false, editable: false},
        {value: 8, background: false, editable: false},
        {value: 2, background: false, editable: false},
        {value: 6, background: false, editable: false},
        {value: 4, background: false, editable: false},
        {value: null, background: false, editable: true},
        {value: 9, background: false, editable: false}],
        
        [{value: 2, background: false, editable: false},
        {value: 8, background: false, editable: false},
        {value: 5, background: false, editable: false},
        {value: 4, background: false, editable: false},
        {value: 7, background: false, editable: false},
        {value: 1, background: false, editable: false},
        {value: 3, background: false, editable: false},
        {value: 9, background: false, editable: false},
        {value: 6, background: false, editable: false}],

        [{value: 6, background: false, editable: false},
        {value: 9, background: false, editable: false},
        {value: 4, background: false, editable: false},
        {value: 2, background: false, editable: false},
        {value: 5, background: false, editable: false},
        {value: 3, background: false, editable: false},
        {value: 1, background: false, editable: false},
        {value: 7, background: false, editable: false},
        {value: 8, background: false, editable: false}],

        [{value: 3, background: false, editable: false},
        {value: 7, background: false, editable: false},
        {value: 1, background: false, editable: false},
        {value: 9, background: false, editable: false},
        {value: 6, background: false, editable: false},
        {value: 8, background: false, editable: false},
        {value: 2, background: false, editable: false},
        {value: 4, background: false, editable: false},
        {value: 5, background: false, editable: false}],

        [{value: 1, background: false, editable: false},
        {value: 2, background: false, editable: false},
        {value: 3, background: false, editable: false},
        {value: 6, background: false, editable: false},
        {value: 9, background: false, editable: false},
        {value: 7, background: false, editable: false},
        {value: 8, background: false, editable: false},
        {value: 5, background: false, editable: false},
        {value: 4, background: false, editable: false}],

        [{value: 4, background: false, editable: false},
        {value: 5, background: false, editable: false},
        {value: 9, background: false, editable: false},
        {value: 1, background: false, editable: false},
        {value: 8, background: false, editable: false},
        {value: 2, background: false, editable: false},
        {value: 6, background: false, editable: false},
        {value: 3, background: false, editable: false},
        {value: 7, background: false, editable: false}],

        [{value: 7, background: false, editable: false},
        {value: 6, background: false, editable: false},
        {value: 8, background: false, editable: false},
        {value: 5, background: false, editable: false},
        {value: 3, background: false, editable: false},
        {value: 4, background: false, editable: false},
        {value: 9, background: false, editable: false},
        {value: 2, background: false, editable: false},
        {value: 1, background: false, editable: false}]])
    const [curCell, setCurCell] = useState([]);
    const [sudokuUnk, setSudokuUnk] = useState(81);
    const [invalidCells, setInvalidCells] = useState([]);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        socket.on("gameInit", (gameInitState) => {
            buildBoard(gameInitState.sudokuBoard);
            setStarted(true);
        });
    }, []);

    function onStartGame(){
        socket.emit("startGame");
    }

    function buildBoard(boardArray) {
        let sudokuBoard = [];
        for (let r = 0; r < 9; r++) {
            let col = [];
            for (let c = 0; c < 9; c++) {
                let cell;
                if (boardArray[r][c] == 0) {
                    cell = { value: null, background: false, editable: true };
                }
                else {
                    cell = { value: boardArray[r][c], background: false, editable: false };
                }
                col.push(cell);
            }
            sudokuBoard.push(col);
        }
        setBoard(sudokuBoard);
        setSudokuUnk(countUnknowns(sudokuBoard));
    }

    function removeInvalid(sudokuBoard, curCellString){
        // remove background red color
        let newItem = {
            ...sudokuBoard[curCell[0]][curCell[1]],
            background: false
        }
        sudokuBoard[curCell[0]][curCell[1]] = newItem;

        // remove from invalid array
        let index = invalidCells.indexOf(curCellString);
        let newInvalidCell = [...invalidCells];
        newInvalidCell.splice(index);
        
        setInvalidCells(newInvalidCell);
        setBoard(sudokuBoard);
    }

    function updateGrid(newValue) {
        let input = { sudokuBoard: [...board], currentInput: curCell, inputVal: newValue }
        let output = checkInput(input);
        let { sudokuBoard, valid} = output;
        let curCellString = `${curCell[0].toString()}-${curCell[1].toString()}`;
        let curUnknown = countUnknowns(sudokuBoard)
        setSudokuUnk(curUnknown);

        if (valid) {
            if (board[curCell[0]][curCell[1]].background == true){
                sudokuBoard = removeInvalid(sudokuBoard, curCellString);
            }
            console.log("here " + invalidCells.length);
            if (curUnknown == 0 && invalidCells.length == 0){
                console.log("win");
            }
        }
        else {
            // change background red
            let newItem = {
                ...sudokuBoard[curCell[0]][curCell[1]],
                background: true
            }
            sudokuBoard[curCell[0]][curCell[1]] = newItem;

            // add to invalid array
            if (!invalidCells.includes(curCellString)){
                let newInvalid = [...invalidCells];
                newInvalid.push(curCellString);
                setInvalidCells(newInvalid);
            }
        }
    }

    function onClickCell(rowIdx, colIdx) {
        setCurCell([rowIdx, colIdx]);
    }

    function buildColumn(row, rowIdx){
        return (row.map((col, colIdx) => (
            <div className={"box"} 
                key={`col${colIdx}-row${rowIdx}`} 
                onClick={() => onClickCell(rowIdx, colIdx)} 
                style={{backgroundColor: board[rowIdx][colIdx].background ? '#ffb3ad' : 
                        curCell[0] === rowIdx && curCell[1] === colIdx ? "#c9eff0" : 
                        curCell[0] === rowIdx || curCell[1] === colIdx ?  "#e8fafa" : "",
                        fontWeight: board[rowIdx][colIdx].editable === false ? "bold" : "" }}
                >{col.value}</div>
        ))) 
    }
    console.log(`unknown ${sudokuUnk} - invalid ${invalidCells}`)
    return (
        <div>
            <h1>Sudoku</h1>
            {started ? (
                <div>
                    <div className="sudokuBoxContainer">
                        <div className="sudokuBox">
                            {board.map((row, rowIdx) => (
                                <div className="row" key={`row-${rowIdx}`}>
                                    {buildColumn(row, rowIdx)}
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <NumberPad onNumberClick={updateGrid} ></NumberPad>
                </div>) : 
                (
                <div>
                    <div className="waiting-game" >wait for everyone to enter before clicking start game</div>
                    <button onClick={() => onStartGame()}>Start Game</button>
                </div>)}
        </div>
    );
};

export default SudokuC;