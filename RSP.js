let playerStatus = [];
let countready = 0;

//todo
//make sure game can only start when there is atleast 2 player.
//add score, choice to player status
//reset player status

//function: add status when player join
exports.addPlayerStatus = ({id, status}) => {
    // new added attribute choice and score 8/31
    let curstatus={id,status, choice: null , score : 0};
    playerStatus.push(curstatus);
};

//function: update choice
exports.updatePlayerChoice = ({id, choice}) => {
    const index = playerStatus.findIndex((curstatus) => curstatus.id === id);
    index === -1 ? undefined : playerStatus[index].choice=choice;
    console.log(`inside updateplayerChoice: ` + choice);
}

//function: reset all status to false for new round
//reset count ready to 0;
resetRound = () => {
    countready = 0;
    for(let i=0; i<playerStatus.length; i++){
        playerStatus[i].status = false;
    }
        console.log(`inside resetRound, round is reset.`);
}

//function: update score
// auto start this function when countready == playerStatus.length;
// check what choices is submited,
// is there a choice that was not submitted?
// if yes, then there will be score, or
// if there is atleast 1 submmited for each choice, draw
// distribute score according to result
exports.updatePlayerScore = () => {
    //let R = 0, S = 1, P = 2
    if (countready < 2 || countready < playerStatus.length){
        return false;
    }
    let submittedChoices = [];
    for(let i=0; i<playerStatus.length; i++){
        if(!(submittedChoices.includes(playerStatus[i].choice))){
            submittedChoices.push(playerStatus[i].choice);
        }
    }
    //CHECKCHECK you hash add got problem
    console.log(`UPS, array size: `+ submittedChoices.length);

    if (submittedChoices.length == 1 || submittedChoices.length == 3){
        console.log(`first loop in UPS, shows draw`);
        resetRound();
        return true;
    }

    //Rock win
    else if (submittedChoices.includes("R") && submittedChoices.includes("S")){
    for(let i=0; i<playerStatus.length; i++){
        if(playerStatus[i].choice == "R"){
            playerStatus[i].score++;
            console.log(`R won`);
        }
    }}

    //Scissors win
    else if (submittedChoices.includes("S") && submittedChoices.includes("P")){
    for(let i=0; i<playerStatus.length; i++){
        if(playerStatus[i].choice == "S"){
            playerStatus[i].score++;
            console.log(`S won`);
        }
    }}

    //Paper win
    else if (submittedChoices.includes("P") && submittedChoices.includes("R")){
    for(let i=0; i<playerStatus.length; i++){
        if(playerStatus[i].choice == "P"){
            playerStatus[i].score++;
            console.log(`P won`);
        }
    }}
    resetRound();
    console.log(`inside updatePlayerScore test3`)
    checkScore();
    return true;
}
//function to be deleted: check score on console
checkScore = () => {
    for(let i=0; i<playerStatus.length; i++){
        console.log(`player ID: ` + playerStatus[i].id + ` chose: ` + playerStatus[i].choice + ` with score: ` +playerStatus[i].score);
    }
}

//function: show score can probably do it in the server
exports.getScore = ({id}) => {
    const index = playerStatus.findIndex((curstatus) => curstatus.id === id);
    return index === -1? undefined : playerStatus[index].score;
}

//function: update status to true if ready
exports.updatePlayerStatus = ({id, status}) => {
    const index = playerStatus.findIndex((curstatus) => curstatus.id === id);
    index === -1 ? undefined : playerStatus[index].status=status;
};

//function: shows how many area ready out of all players
exports.allPlayerStatus = () => {
    countready = 0;
    for(let i=0; i<playerStatus.length;i++){
        if(playerStatus[i].status){
            countready++; 
        }
    };
    return "ready status: " + countready + "/" + playerStatus.length;
};



