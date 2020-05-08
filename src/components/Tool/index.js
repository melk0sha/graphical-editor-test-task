import React, { Component } from "react";

class Tool extends Component {
  render() {
    const { type, onToolChange, currentTool } = this.props;

    return (
      <div
        className={`tools_tool${
          currentTool === type ? " tools_tool__active" : ""
        }`}
        onClick={onToolChange}
      >
        {type}
      </div>
    );
  }
}

export default Tool;
