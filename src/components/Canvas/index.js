import React, { Component } from "react";
import { CANVAS_RESOLUTION } from "../../resources/constants";
import "./index.scss";

class Canvas extends Component {
  render() {
    const { onToolAction } = this.props;

    return (
      <canvas
        id="canvas"
        width={CANVAS_RESOLUTION.RES_512.width}
        height={CANVAS_RESOLUTION.RES_512.height}
        onMouseDown={onToolAction}
        onMouseMove={onToolAction}
        onMouseUp={onToolAction}
      ></canvas>
    );
  }
}

export default Canvas;
