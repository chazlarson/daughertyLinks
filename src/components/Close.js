import React, { Component } from "react";

class Close extends Component {
  componentDidMount() {
    window.close();
  }
  
  render() {
    return (
      <noscript>
        <div>JavaScript is turned off. Please close this window.</div>
      </noscript>
    );
  }
}

export default Close;
