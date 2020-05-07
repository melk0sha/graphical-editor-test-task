const getCursorCoordinates = (e) => {
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;
  return [x, y];
};

export default getCursorCoordinates;
