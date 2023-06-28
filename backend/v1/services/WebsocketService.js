const WebSocket = require("ws").WebSocket;
const queryString = require("query-string");
const Session = require("../classes/Session");
const User = require("../classes/User");
const logger = require("../../logger").child({ name: "websockets" });

const wss = new WebSocket.Server({
  noServer: true,
  path: "/websockets",
});

const clients = {};

wss.on("connection", function connection(socket, userid) {
  logger.debug(socket, "WebSocket connected!");

  if (!clients[userid]) {
    clients[userid] = {};
  }
  if (clients[userid].sockets) {
    clients[userid].sockets.push(socket);
  } else {
    clients[userid].sockets = [socket];
  }

  socket.on("message", function message(message) {});

  socket.on("close", function close() {
    logger.debug(socket, "WebSocket connection closed!");
    const socketIndex = clients[userid].sockets.findIndex((s) => s === socket);
    clients[userid].sockets.splice(socketIndex, 1);
  });
});

const websocketService = {};

websocketService.addConnectionListener = (expressServer) => {
  expressServer.on("upgrade", (request, socket, head) => {
    websocketService.checkAuth(request, (userid) => {
      if (!userid) {
        logger.debug("Unauthorized WebSocket connection. Destroying socket...");
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
      } else {
        wss.handleUpgrade(request, socket, head, (websocket) => {
          wss.emit("connection", websocket, userid);
        });
      }
    });
  });
};

websocketService.checkAuth = async (request, callback) => {
  const [_path, query] = request?.url?.split("?");
  const queryObj = queryString.parse(query);

  if (queryObj.session) {
    try {
      const session = await new Session().read(queryObj.session);
      const user = await new User().read(session.userid);
      callback(user.id);
      return;
    } catch (error) {
      logger.warn({ error }, "Failed to check socket authentication.");
    }
  }
  callback();
};

websocketService.send = (recipientId, messageType, messageContent) => {
  recipientId.forEach((id) => {
    const client = clients[id];

    if (client?.sockets) {
      const data = { type: messageType, content: messageContent };
      client.sockets.forEach((socket) => {
        socket.send(JSON.stringify(data));
      });
    }
  });
};

module.exports = websocketService;
