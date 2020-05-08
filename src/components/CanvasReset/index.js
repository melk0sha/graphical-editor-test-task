import React, { Component } from "react";

class CanvasReset extends Component {
  render() {
    const { onCanvasReset } = this.props;

    return (
      <div className="tools_tool" onClick={onCanvasReset}>
        Reset
      </div>
    );
  }
}

export default CanvasReset;
