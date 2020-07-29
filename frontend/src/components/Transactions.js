import React, { Component } from "react";
import actions from "../services/index";
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
        <li>
          {eachTransaction.expenseType} |{eachTransaction.date} |
          {eachTransaction.frequency} |${eachTransaction.amount} |
        </li>
      );
    });
  };
  render() {
    return <div>{this.displayTransactions()}</div>;
  }
}

export default Transactions;
