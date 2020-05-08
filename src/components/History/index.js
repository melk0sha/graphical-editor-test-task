import React, { Component } from "react";
import { TOOLS } from "../../resources/constants";
import "./index.scss";

class History extends Component {
  render() {
    const { type, onUndoRedo, history } = this.props;

    return (
      <button
        className="tools_tool history_item"
        onClick={onUndoRedo}
        disabled={
          (type === TOOLS.UNDO && history.undo.length === 1) ||
          (type === TOOLS.REDO && !history.redo.length)
        }
      >
        {type}
      </button>
    );
  }
}

export default History;
