import getCursorCoordinates from "./getCursorCoordinates";
import { EVENTS } from "../resources/constants";

const onBrush = ({ type: eventType }) => {
  switch (eventType) {
    case EVENTS.ONMOUSEDOWN:
      onBrushMouseDown();
      break;
    case EVENTS.ONMOUSEMOVE:
      onBrushMouseMove();
      break;
    case EVENTS.ONMOUSEUP:
      onBrushMouseUp();
      break;
    default:
      break;
  }
};

const onBrushMouseDown = () => {};
const onBrushMouseMove = () => {};
const onBrushMouseUp = () => {};

export default onBrush;
