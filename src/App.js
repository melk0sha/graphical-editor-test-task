import React, { Component } from "react";
import Canvas from "./components/Canvas";
import Tool from "./components/Tool";
import ColorChanger from "./components/ColorChanger";
import CanvasReset from "./components/CanvasReset";
import onBrush from "./utils/onBrush";
import onErase from "./utils/onErase";
import { CANVAS_RESOLUTION, TOOLS } from "./resources/constants";
import "./index.scss";

class App extends Component {
  state = {
    canvasSettings: { canvas: {}, ctx: {}, canvasResolution: {} },
    toolSettings: { currentTool: TOOLS.BRUSH, currentColor: "#000000" },
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
    const {
      toolSettings: { currentTool, currentColor },
      canvasSettings,
    } = this.state;

    switch (currentTool) {
      default:
      case TOOLS.BRUSH:
        onBrush(e, canvasSettings, currentColor);
        break;
      case TOOLS.ERASER:
        onErase(e, canvasSettings);
        break;
    }
  };

  onToolChange = ({ target: { textContent: currentTool } }) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        toolSettings: {
          ...prevState.toolSettings,
          currentTool,
        },
      };
    });
  };

  onCanvasReset = () => {
    const {
      canvasSettings: { canvas, ctx },
    } = this.state;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  onColorChange = ({ target: { value: currentColor } }) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        toolSettings: {
          ...prevState.toolSettings,
          currentColor,
        },
      };
    });
  };

  render() {
    const { onToolAction, onToolChange, onCanvasReset, onColorChange } = this;
    const {
      canvasSettings: { canvasResolution },
      toolSettings: { currentTool },
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
          <ColorChanger onColorChange={onColorChange} />
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
