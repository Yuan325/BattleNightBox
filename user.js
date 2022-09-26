let users = [];

exports.addUser = ({ id, name, room, device }) => {
    if (!device || !room || (device === "controller" && !name)) return { userError: "name and room required." };
    const user = { id, name, room, device };

    users.push(user);
    return { user };
};

exports.removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    let user = users[index];
    users.pop(user);
    return user;
}

