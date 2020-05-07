const getCanvasStyleResolution = (canvas) => {
  const canvasElement = window.getComputedStyle(canvas);

  return {
    width: canvasElement.getPropertyValue("width").slice(0, -2),
    height: canvasElement.getPropertyValue("height").slice(0, -2),
  };
};

export default getCanvasStyleResolution;
