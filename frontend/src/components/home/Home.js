import React, { Component } from "react";
import actions from "../../services/index";
import "../styles/home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <p className="unnamed-character-style-4">MY WALLET</p>
        <div>
          <button className="income-button">Income</button>
          <button className="outcome-button">Outcome</button>
        </div>

        <div>
          <p className="unnamed-character-style-4">Transactions</p>
        </div>
      </div>
    );
  }
}

export default Home;
