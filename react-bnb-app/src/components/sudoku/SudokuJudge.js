export function checkInput(input) {
    let { sudokuBoard, currentInput, inputVal } = input;
    let valid = true;

    if (inputVal != null){
        valid = validateInput(sudokuBoard, currentInput, inputVal);
    }

    sudokuBoard[currentInput[0]][currentInput[1]].value = inputVal;
    let output = { sudokuBoard, valid};
    return output;
};

function validateInput(sudokuBoard, currentInput, inputVal) {
    let inputR = currentInput[0]
    let inputC = currentInput[1]

    // check horizontal and vertical
    for (let i = 0; i < 9; i++){
        if (sudokuBoard[inputR][i].value == inputVal) return false;
        if (sudokuBoard[i][inputC].value == inputVal) return false;
    }

    // check within section
    let startR = parseInt(inputR/3)*3;
    let startC = parseInt(inputC/3)*3;
    for (let r = startR; r < startR+3; r++)
        for (let c = startC; c < startC+3; c++)
            if (sudokuBoard[r][c].value == inputVal) return false;
    return true;
};

export function countUnknowns(board) {
    let count = 0;
    for (let r = 0; r < 9; r++)
        for (let c = 0; c < 9; c++)
            if (board[r][c].value == null)
                count++;
    return count;
}