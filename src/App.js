import React, { Component } from "react";
import Canvas from "./components/Canvas";
import Tool from "./components/Tool";
import onBrush from "./utils/onBrush";
import onErase from "./utils/onErase";
import { CANVAS_RESOLUTION, TOOLS } from "./resources/constants";
import "./index.scss";

class App extends Component {
  state = {
    canvasSettings: { canvas: {}, ctx: {}, canvasResolution: {} },
    currentTool: TOOLS.BRUSH,
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
    const { currentTool } = this.state;

    switch (currentTool) {
      default:
      case TOOLS.BRUSH:
        onBrush(e);
        break;
      case TOOLS.ERASER:
        onErase(e);
        break;
    }
  };

  onToolChange = ({ target: { textContent: currentTool } }) => {
    this.setState({ currentTool });
  };

  render() {
    const { onToolAction, onToolChange } = this;
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
