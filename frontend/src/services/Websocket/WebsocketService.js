import handleMessage from "./MessageHandler";

const websocketService = {};
const wsUri = process.env.REACT_APP_WS_URI
  ? process.env.REACT_APP_WS_URI
  : "ws://localhost:3000";

websocketService._ws = null;

websocketService.getWS = (userid) => {
  try {
    const ws = websocketService._ws;

    if (!ws || ws.readyState === 3) {
      //TODO add ws uri to env variables
      websocketService._ws = new WebSocket(
        `${wsUri}/websockets?userid=${userid}`
      );
    }

    return websocketService._ws;
  } catch (err) {
    console.log(err, "ERROR connecting to WS");
  }
};

websocketService.reconnectAttempts = 0;

websocketService.connect = (userid) => {
  const ws = websocketService.getWS(userid);

  ws.onopen = () => {
    console.log("WebSocket connected. ");
    // Reset reconnectAttempts on connection opening
    websocketService.reconnectAttempts = 0;
  };

  ws.onmessage = (message) => {
    handleMessage(message);
  };

  ws.onclose = () => {
    const baseDelay = 1000;
    let delay = 0;
    const attempts = websocketService.reconnectAttempts;

    if (!attempts) {
      delay = baseDelay;
    } else if (attempts < 5) {
      delay = baseDelay * (attempts + 1);
    } else if (attempts > 4 && attempts < 14) {
      delay = baseDelay * (attempts - 1) * 5;
    } else {
      delay = 1000 * 60 * 5;
    }

    console.log(
      `WebSocket connection closed. Reconnecting in ${delay / 1000} second(s).`
    );
    setTimeout(function () {
      websocketService.reconnectAttempts += 1;
      websocketService.connect(userid);
    }, delay);
  };
};

export default websocketService;
