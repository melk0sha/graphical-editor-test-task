const getCursorCoordinates = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  return [x, y];
};

export default getCursorCoordinates;
