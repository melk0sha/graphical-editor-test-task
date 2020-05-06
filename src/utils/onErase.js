import getCursorCoordinates from "./getCursorCoordinates";
import { EVENTS } from "../resources/constants";

const onErase = ({ type: eventType }) => {
  switch (eventType) {
    case EVENTS.ONMOUSEDOWN:
      onEraseMouseDown();
      break;
    case EVENTS.ONMOUSEMOVE:
      onEraseMouseMove();
      break;
    case EVENTS.ONMOUSEUP:
      onEraseMouseUp();
      break;
    default:
      break;
  }
};

const onEraseMouseDown = () => {};
const onEraseMouseMove = () => {};
const onEraseMouseUp = () => {};

export default onErase;
