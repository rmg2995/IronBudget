import React, { Component } from "react";
import actions from "../../services/index";
import "../styles/home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <p className="unnamed-character-style-4">MY WALLET</p>
        <button className="button">Outcome</button>
      </div>
    );
  }
}

export default Home;
