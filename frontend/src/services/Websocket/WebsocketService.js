import handleMessage from "./MessageHandler";

const websocketService = {};

websocketService._ws = null;

websocketService.getWS = (userid) => {
  try {
    const ws = websocketService._ws;

    if (!ws || ws.readyState === 3) {
      //TODO add ws uri to env variables
      console.log("BÄÄ establishing connection");
      websocketService._ws = new WebSocket(
        `ws://localhost:3000/websockets?userid=${userid}`
      );
    }

    return websocketService._ws;
  } catch (err) {
    console.log(err, "ERROR connecting to BÄÄ");
  }
};

websocketService.reconnectAttempts = 0;

websocketService.connect = (userid) => {
  console.log("Inside BÄÄ connect", userid);
  const ws = websocketService.getWS(userid);

  ws.onopen = () => {
    console.log("WebSocket connected. BÄÄ");
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
