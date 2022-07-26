import React, { Component } from "react";

export default class Iframe extends Component {
  render() {
    return (
      <div>
        <iframe
          src={this.props.src}
          height={this.props.height}
          width={this.props.width}
        />
      </div>
    );
  }
}
