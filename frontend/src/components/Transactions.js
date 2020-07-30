import React, { Component } from "react";
import actions from "../services/index";
import "../components/styles/transactions.css";

class Transactions extends Component {
  state = {
    transactions: [],
  };
  async componentDidMount() {
    console.log("hey", this.props);
    // let res = await actions.transactions();
    let res = await actions.transactions2("5f20717234bf03224e26785a");
    console.log("whatever", res);
    this.setState({
      transactions: res.data,
    });
  }
  displayTransactions = () => {
    return this.state.transactions.map((eachTransaction) => {
      return (
        <li className="transactions">
          <div className="transaction-style">
            <span>{eachTransaction.expenseType}</span>
            <span>{eachTransaction.frequency}</span>
            <span>${eachTransaction.amount}</span>
          </div>
          {/* |{eachTransaction.date} */}
        </li>
      );
    });
  };
  render() {
    return <div>{this.displayTransactions()}</div>;
  }
}

export default Transactions;
