import getCursorCoordinates from "./getCursorCoordinates";
import { brush, brushWithoutSkipping } from "./brushWithoutSkipping";
import { EVENTS, TOOLS } from "../resources/constants";

let isDrawing = false;
let previousPosition;

const onBrush = (e, canvasSettings, currentColor) => {
  switch (e.type) {
    case EVENTS.ONMOUSEDOWN:
      onBrushMouseDown(e, canvasSettings, currentColor);
      break;
    case EVENTS.ONMOUSEMOVE:
      onBrushMouseMove(e, canvasSettings, currentColor);
      break;
    case EVENTS.ONMOUSEUP:
      onBrushMouseUp();
      break;
    default:
      break;
  }
};

const onBrushMouseDown = (e, canvasSettings, currentColor) => {
  isDrawing = true;
  previousPosition = getCursorCoordinates(e);
  brush(TOOLS.BRUSH, previousPosition, canvasSettings, currentColor);
};

const onBrushMouseMove = (e, canvasSettings, currentColor) => {
  if (isDrawing) {
    brushWithoutSkipping(
      TOOLS.BRUSH,
      previousPosition,
      getCursorCoordinates(e),
      canvasSettings,
      currentColor
    );
    previousPosition = getCursorCoordinates(e);
  }
};

const onBrushMouseUp = () => {
  isDrawing = false;
};

export default onBrush;
