const WebSocket = require("ws");

const websocketService = {};

// Create a WebSocket server instance
const wss = new WebSocket.Server({ noServer: true, path: "/websockets" });

// Map to store user IDs and their corresponding WebSocket connections
const clients = new Map();

// WebSocket connection event listener
wss.on("connection", (ws, req) => {
  // Extract user ID from request, assuming it is sent in the query string
  const userId = req.url.split("?userId=")[1];

  // Store the WebSocket connection with the associated user ID
  //TODO: you can do some auth here, use User.read(userid) function
  clients.set(userId, ws);

  // Handle incoming messages
  ws.on("message", (message) => {
    // Process the incoming message
    console.log(`Received message from user ${userId}:`, message);
  });

  // Handle WebSocket close event
  ws.on("close", () => {
    // Remove the WebSocket connection when a client disconnects
    clients.delete(userId);
    console.log(`WebSocket connection closed for user ${userId}`);
  });
});

// Function to send events/messages to a specific user
websocketService.sendToUser = (userId, messageType, messageContent) => {
  const ws = clients.get(userId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({
      type: messageType,
      content: messageContent,
    });
    ws.send(message);
  } else {
    console.log(`Unable to send message to user ${userId}`);
  }
};

module.exports = websocketService;
