import server from "./app.js";
import { Server } from "socket.io";
import chatManager from "./dao/managers/Chat.js";
import { connect } from "mongoose";

const port = process.env.PORT || 8080;
const ready = () => {
  console.log("server ready on port " + port);
  connect(process.env.MONGO_LINK)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
};

let http_server = server.listen(port, ready);
let socket_server = new Server(http_server);
const chats = chatManager.getChats();

socket_server.on("connection", (socket) => {
  // //  console.log(`client ${socket.client.id} connected`)

  // Chat

  socket.on("auth", () => {
    socket_server.emit("all_messages", chats); // Envía los mensajes cuando se autentique
  });

  socket.on("new_message", (data) => {
    chatManager.addMessage(data);
    socket_server.emit("all_messages", chats);
  });

  // Carrito

  socket.emit("quantity", quantity);
});
