import React, { Component } from "react";
import Canvas from "./components/Canvas";
import Tool from "./components/Tool";
import CanvasReset from "./components/CanvasReset";
import onBrush from "./utils/onBrush";
import onErase from "./utils/onErase";
import { CANVAS_RESOLUTION, TOOLS } from "./resources/constants";
import "./index.scss";

class App extends Component {
  state = {
    canvasSettings: { canvas: {}, ctx: {}, canvasResolution: {} },
    currentTool: TOOLS.BRUSH,
    currentColor: "#000000",
  };

  componentDidMount() {
    const canvasElement = document.getElementById("canvas");

    this.setState({
      canvasSettings: {
        canvas: canvasElement,
        ctx: canvasElement.getContext("2d"),
        canvasResolution: CANVAS_RESOLUTION.RES_512,
      },
    });
  }

  onToolAction = (e) => {
    const { currentTool, canvasSettings } = this.state;

    switch (currentTool) {
      default:
      case TOOLS.BRUSH:
        onBrush(e, canvasSettings);
        break;
      case TOOLS.ERASER:
        onErase(e, canvasSettings);
        break;
    }
  };

  onToolChange = ({ target: { textContent: currentTool } }) => {
    this.setState({ currentTool });
  };

  onCanvasReset = () => {};

  render() {
    const { onToolAction, onToolChange, onCanvasReset } = this;
    const {
      canvasSettings: { canvasResolution },
      currentTool,
    } = this.state;

    return (
      <div className="wrapper">
        <div className="tools">
          <Tool
            type={TOOLS.BRUSH}
            onToolChange={onToolChange}
            currentTool={currentTool}
          />
          <Tool
            type={TOOLS.ERASER}
            onToolChange={onToolChange}
            currentTool={currentTool}
          />
          <CanvasReset onCanvasReset={onCanvasReset} />
        </div>
        <Canvas
          canvasResolution={canvasResolution}
          onToolAction={onToolAction}
        />
      </div>
    );
  }
}

export default App;
