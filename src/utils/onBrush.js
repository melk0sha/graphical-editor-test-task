import getCursorCoordinates from "./getCursorCoordinates";
import getCanvasStyleResolution from "./getCanvasStyleResolution";
import { EVENTS } from "../resources/constants";

let isDrawing = false;
let previousPosition;

const onBrush = (e, canvasSettings) => {
  switch (e.type) {
    case EVENTS.ONMOUSEDOWN:
      onBrushMouseDown(e, canvasSettings);
      break;
    case EVENTS.ONMOUSEMOVE:
      onBrushMouseMove(e, canvasSettings);
      break;
    case EVENTS.ONMOUSEUP:
      onBrushMouseUp();
      break;
    default:
      break;
  }
};

const onBrushMouseDown = (e, canvasSettings) => {
  isDrawing = true;
  previousPosition = getCursorCoordinates(e);
  brush(previousPosition, canvasSettings);
};

const onBrushMouseMove = (e, canvasSettings) => {
  if (isDrawing) {
    brushWithoutSkipping(
      previousPosition,
      getCursorCoordinates(e),
      canvasSettings
    );
    previousPosition = getCursorCoordinates(e);
  }
};

const onBrushMouseUp = () => {
  isDrawing = false;
};

const brush = (position, { canvas, ctx, canvasResolution }) => {
  let [x, y] = position;
  const canvasStyleResolution = getCanvasStyleResolution(canvas);

  x = Math.floor(x / (canvasStyleResolution.width / canvasResolution.width));
  y = Math.floor(y / (canvasStyleResolution.height / canvasResolution.height));

  ctx.fillStyle = "#000000";
  ctx.fillRect(x, y, 3, 3);
};

const brushWithoutSkipping = (prevPosition, newPosition, canvasSettings) => {
  let [x0, y0] = prevPosition;
  const [x1, y1] = newPosition;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    brush([x0, y0], canvasSettings);
    if (x0 === x1 && y0 === y1) {
      break;
    }
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
};

export default onBrush;
