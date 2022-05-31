let rooms = [];

exports.addOrEditRoom = ({ id, name, game }) => {
    if (!name) return { roomError: "room name required." };
    let room = getRoom(name);
    if (room !== undefined){
        rooms.pop(room);
    }
    room = { id, name, game};
    rooms.push(room);
    console.log(`${room.name} created for ${room.game}`);

    return { curRoom: room };
};

exports.getRoom = (name) => {
    if (!name) return { roomError: "room name required." };
    let room = getRoom(name);
    return { curRoom: room };
};

exports.removeRoom = (id) => {
    const index = rooms.findIndex((room) => room.id === id);
    return index === -1 ? undefined : rooms.pop(rooms[index]);
}

getRoom = (name) => {
    const index = rooms.findIndex((room) => room.name === name);
    return index === -1 ? undefined : rooms[index];
}