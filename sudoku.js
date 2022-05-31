const { range } = require("express/lib/request");

// NEED KEEP TRACK WHICH ROOM OFFER WHICH BOARD
// SEND AT GAME INIT: { sudokuBoard }

checkInput = (input) => {
    let { sudokuBoard, currentInput, inputVal, unknowns } = input;
    let valid = validateInput(sudokuBoard, currentInput, inputVal);
    if (valid) {
        unknowns -= 1;
        sudokuBoard[currentInput[0]][currentInput[1]] = inputVal;
    }
    let win = unknowns == 0;
    let output = { sudokuBoard, valid, unknowns, win };
    return output;
};

validateInput = (sudokuBoard, currentInput, inputVal) => {
    let inputR = currentInput[0]
    let inputC = currentInput[1]
    // check horizontal and vertical
    for (let i = 0; i < 9; i++){
        if (sudokuBoard[inputR][i] == inputVal) return false;
        if (sudokuBoard[i][inputC] == inputVal) return false;
    }
    // check within section
    let startR = parseInt(inputR/3)*3;
    let startC = parseInt(inputC/3)*3;
    for (let r = startR; r < startR+3; r++)
        for (let c = startC; c < startC+3; c++)
            if (sudokuBoard[r][c] == inputVal) return false;
    return true;
};

countUnknowns = (board) => {
    let count = 0;
    for (let r = 0; r < 9; r++)
        for (let c = 0; c < 9; c++)
            if (board[r][c] == 0)
                count++;
    return count;
}

getInitialBoard = () => {
    //  sudokuBoard, unknowns
    let sudokuBoard = getBoard();
    let unknowns = countUnknowns(sudokuBoard);
    return {sudokuBoard, unknowns};
}

getBoard = () => {
    sudokuData=[
        [[9, 1, 6, 3, 4, 0, 7, 8, 0],
        [0, 0, 2, 0, 0, 0, 5, 6, 0],
        [5, 3, 0, 8, 2, 6, 4, 1, 0],
        [0, 0, 0, 0, 7, 0, 0, 0, 6],
        [0, 9, 4, 2, 0, 3, 0, 0, 0],
        [3, 7, 0, 0, 0, 0, 0, 4, 0],
        [1, 0, 0, 6, 0, 7, 0, 0, 4],
        [0, 0, 9, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 5, 3, 0, 0, 2, 1]]
    ]
    return sudokuData[0];
}

// sudokuBoard = getBoard();
// currentInput = [0, 5];
// inputVal = 6;
// unknowns = countUnknowns(sudokuBoard);

// // sudokuBoard, currentInput, inputVal, unknowns 
// input = { sudokuBoard, currentInput, inputVal, unknowns};
// console.log(input);

// //  sudokuBoard, valid, unknowns, win
// output = checkInput(input);
// console.log(output);