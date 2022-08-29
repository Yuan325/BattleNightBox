let playerStatus = [];

//todo
//add score
//reset player status

//add status when player join
exports.addPlayerStatus = ({id, status}) => {
    let curstatus={id,status};
    playerStatus.push(curstatus);
};

//reset all status to false for new round

//update status to true if ready
exports.updatePlayerStatus = ({id, status}) => {
    const index = playerStatus.findIndex((curstatus) => curstatus.id === id);
    index === -1 ? undefined : playerStatus[index].status=status;
};

//shows how many area ready out of all players
exports.allPlayerStatus = () => {
    let countready = 0;
    for(let i=0; i<playerStatus.length;i++){
        if(playerStatus[i]){
            countready++; 
        }
    };
    return countready + "/" + playerStatus.length;
};



