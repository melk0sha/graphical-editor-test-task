import getCanvasStyleResolution from "./getCanvasStyleResolution";
import { CANVAS_RESOLUTION, TOOLS } from "../resources/constants";

export const brush = (brushType, position, { canvas, ctx }, currentColor) => {
  let [x, y] = position;
  const canvasStyleResolution = getCanvasStyleResolution(canvas);

  x = Math.floor(
    x / (canvasStyleResolution.width / CANVAS_RESOLUTION.RES_512.width)
  );
  y = Math.floor(
    y / (canvasStyleResolution.height / CANVAS_RESOLUTION.RES_512.height)
  );

  switch (brushType) {
    case TOOLS.BRUSH:
      ctx.fillStyle = currentColor;
      ctx.fillRect(x, y, 3, 3);
      break;
    case TOOLS.ERASER:
      ctx.clearRect(x, y, 3, 3);
      break;
    default:
      break;
  }
};

export const brushWithoutSkipping = (
  brushType,
  prevPosition,
  newPosition,
  canvasSettings,
  currentColor
) => {
  let [x0, y0] = prevPosition;
  const [x1, y1] = newPosition;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    brush(brushType, [x0, y0], canvasSettings, currentColor);
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
