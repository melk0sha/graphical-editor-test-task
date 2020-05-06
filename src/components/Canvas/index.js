import React, { Component } from "react";
import "./index.scss";

class Canvas extends Component {
  render() {
    const { canvasResolution, onToolAction } = this.props;

    return (
      <canvas
        id="canvas"
        width={canvasResolution.width}
        height={canvasResolution.height}
        onMouseDown={onToolAction}
        onMouseMove={onToolAction}
        onMouseUp={onToolAction}
      ></canvas>
    );
  }
}

export default Canvas;
