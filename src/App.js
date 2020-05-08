import React, { Component } from "react";
import Canvas from "./components/Canvas";
import Tool from "./components/Tool";
import ColorChanger from "./components/ColorChanger";
import CanvasReset from "./components/CanvasReset";
import History from "./components/History";
import onBrush from "./utils/onBrush";
import onErase from "./utils/onErase";
import {
  CANVAS_RESOLUTION,
  TOOLS,
  EVENTS,
  DEFAULT_COLOR,
} from "./resources/constants";
import "./index.scss";

class App extends Component {
  state = {
    canvasSettings: { canvas: {}, ctx: {} },
    toolSettings: { currentTool: TOOLS.BRUSH, currentColor: DEFAULT_COLOR },
    history: {
      undo: [],
      redo: [],
    },
  };

  componentDidMount() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const canvasSettings = {
      canvas,
      ctx,
    };

    const firstSnapshot = ctx.getImageData(
      0,
      0,
      CANVAS_RESOLUTION.RES_512.width,
      CANVAS_RESOLUTION.RES_512.height
    );

    this.setState({
      canvasSettings,
      history: { undo: [firstSnapshot], redo: [] },
    });
  }

  getHistorySnapshot = ({ ctx }) => {
    const {
      history: { undo, redo },
    } = this.state;
    const newSnapshot = ctx.getImageData(
      0,
      0,
      CANVAS_RESOLUTION.RES_512.width,
      CANVAS_RESOLUTION.RES_512.height
    );

    undo.push(newSnapshot);

    this.setState({ history: { undo, redo: redo.length ? [] : redo } });
  };

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

    if (e.type === EVENTS.ONMOUSEUP) {
      this.getHistorySnapshot(canvasSettings);
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
      canvasSettings: { ctx },
    } = this.state;

    ctx.clearRect(
      0,
      0,
      CANVAS_RESOLUTION.RES_512.width,
      CANVAS_RESOLUTION.RES_512.height
    );
    this.getHistorySnapshot({ ctx });
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

  onUndoRedo = ({ target: { textContent: currentAction } }) => {
    const {
      history: { undo, redo },
      canvasSettings: { ctx },
    } = this.state;

    switch (currentAction) {
      case TOOLS.UNDO:
        redo.push(undo.pop());
        const undoSnapshot = undo[undo.length - 1];
        ctx.putImageData(undoSnapshot, 0, 0);
        break;
      case TOOLS.REDO:
        const redoSnapshot = redo.pop();
        undo.push(redoSnapshot);
        ctx.putImageData(redoSnapshot, 0, 0);
        break;
      default:
        break;
    }

    this.setState({ history: { undo, redo } });
  };

  render() {
    const {
      onToolAction,
      onToolChange,
      onCanvasReset,
      onColorChange,
      onUndoRedo,
    } = this;
    const {
      toolSettings: { currentTool },
      history,
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
          <div className="history">
            <History
              type={TOOLS.UNDO}
              onUndoRedo={onUndoRedo}
              history={history}
            />
            <History
              type={TOOLS.REDO}
              onUndoRedo={onUndoRedo}
              history={history}
            />
          </div>
        </div>
        <Canvas onToolAction={onToolAction} />
      </div>
    );
  }
}

export default App;
