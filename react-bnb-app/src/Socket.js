import io from "socket.io-client";

const ENDPOINT = "http://localhost:5010";
let socket = io(ENDPOINT);

export default socket;