import getCursorCoordinates from "./getCursorCoordinates";
import getCanvasStyleResolution from "./getCanvasStyleResolution";
import { EVENTS } from "../resources/constants";

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
  erase(previousPosition, canvasSettings);
};

const onEraseMouseMove = (e, canvasSettings) => {
  if (isErasing) {
    eraseWithoutSkipping(
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

const erase = (position, { canvas, ctx, canvasResolution }) => {
  let [x, y] = position;
  const canvasStyleResolution = getCanvasStyleResolution(canvas);

  x = Math.floor(x / (canvasStyleResolution.width / canvasResolution.width));
  y = Math.floor(y / (canvasStyleResolution.height / canvasResolution.height));

  ctx.clearRect(x, y, 3, 3);
};

const eraseWithoutSkipping = (prevPosition, newPosition, canvasSettings) => {
  let [x0, y0] = prevPosition;
  const [x1, y1] = newPosition;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    erase([x0, y0], canvasSettings);
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

export default onErase;
