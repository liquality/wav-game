import eventBus from "./EventBus";

export const messageTypes = {
  CROSSMINT_SUCCESS: "crossmint_success",
};

export default function handleMessage(message) {
  const { type, content } = JSON.parse(message.data);
  switch (type) {
    default: {
      eventBus.dispatch(type, content);
      break;
    }
  }
}
