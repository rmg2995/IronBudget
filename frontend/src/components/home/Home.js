import React, { Component } from "react";
import actions from "../../services/index";
import "../styles/home.css";

class Home extends Component {
  state = {
    transactions: [],
  };
  async componentDidMount() {
    console.log("hey", this.props);
    // let res = await actions.transactions();
    let res = await actions.transactions2("5f206f25da8d992b707a9994");
    console.log("whatever", res);
    this.setState({
      transactions: res.data,
    });
  }
  displayTransactions = () => {
    return this.state.transactions.map((eachTransaction) => {
      return <li>{eachTransaction.expenseType}</li>;
    });
  };
  render() {
    return (
      <div>
        <p className="unnamed-character-style-4">MY WALLET</p>
        <button className="button">Outcome</button>
        {this.displayTransactions()}
      </div>
    );
  }
}

export default Home;
