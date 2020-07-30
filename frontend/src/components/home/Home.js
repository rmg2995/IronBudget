import React, { Component } from "react";
import actions from "../../services/index";
import "../styles/home.css";
import PieChart from "./PieChart";

class Home extends Component {
  render() {
    return (
      <div>
        <p className="unnamed-character-style-4">MY WALLET</p>
        <div>
          <button className="income-button">Income</button>
          <button className="outcome-button">Outcome</button>
        </div>
        <PieChart />
        <div>
          <p className="unnamed-character-style-4">Transactions</p>
          <li className="transaction-list">
            Category 1 <span className="goal">2,475 $</span>:
            <span className="actual">2,475 $</span>
          </li>
          <li className="transaction-list">
            Category 2 <span className="goal">2,475 $</span>:
            <span className="actual">2,475 $</span>
          </li>
          <li className="transaction-list">
            Category 3 <span className="goal">2,475 $</span>:
            <span className="actual">2,475 $</span>
          </li>
        </div>
      </div>
    );
  }
}

export default Home;
