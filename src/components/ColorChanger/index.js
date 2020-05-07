import React, { Component } from "react";
import "./index.scss";

class ColorChanger extends Component {
  render() {
    const { onColorChange } = this.props;

    return (
      <input
        type="color"
        className="tools_tool tools_color-changer"
        onChange={onColorChange}
      />
    );
  }
}

export default ColorChanger;
