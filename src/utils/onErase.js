import getCursorCoordinates from "./getCursorCoordinates";
import { brush, brushWithoutSkipping } from "./brushWithoutSkipping";
import { EVENTS, TOOLS } from "../resources/constants";

let isErasing = false;
let previousPosition;

const onErase = (e, canvasSettings) => {
  switch (e.type) {
    case EVENTS.ONMOUSEDOWN:
      onEraseMouseDown(e, canvasSettings);
      break;
    case EVENTS.ONMOUSEMOVE:
      onEraseMouseMove(e, canvasSettings);
      break;
    case EVENTS.ONMOUSEUP:
      onEraseMouseUp();
      break;
    default:
      break;
  }
};

const onEraseMouseDown = (e, canvasSettings) => {
  isErasing = true;
  previousPosition = getCursorCoordinates(e);
  brush(TOOLS.ERASER, previousPosition, canvasSettings);
};

const onEraseMouseMove = (e, canvasSettings) => {
  if (isErasing) {
    brushWithoutSkipping(
      TOOLS.ERASER,
      previousPosition,
      getCursorCoordinates(e),
      canvasSettings
    );
    previousPosition = getCursorCoordinates(e);
  }
};

const onEraseMouseUp = () => {
  isErasing = false;
};

export default onErase;
