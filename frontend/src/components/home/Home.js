import React, { Component } from "react";
import actions from "../../services/index";
import "../styles/home.css";
import PieChart from "./PieChart";

class Home extends Component {
  state = {
    transactionsexpense: [],
    transactionsincome: [],
  };
  async componentDidMount() {
    // console.log("hey", this.props);
    // let res = await actions.transactions();
    const [resExpense, resIncome] = await Promise.all([
      actions.transactionsexpense(""),
      actions.transactionsincome(""),
    ]);
    console.log("whatever", resIncome);
    this.setState({
      transactionsexpense: resExpense.data,
      transactionsincome: resIncome.data,
    });
    this.oneBigLoop(resExpense.data, resIncome.data);
  }
  oneBigLoop = (expense, income) => {
    //all my math and big loop
    console.log(expense);
    let expenseAmount = 0;
    for (let e of expense) {
      // console.log(e);
      if (e.amount) expenseAmount += e.amount;
    }
    let incomeAmount = 0;
    for (let i of income) {
      // console.log(i);
      if (i.amountIncome) incomeAmount += i.amountIncome;
    }
    let total = incomeAmount - expenseAmount;
    let expenseCategories = 0;
    let expenseObj = {};
    for (let e of expense) {
      // if (e.expenseType == "restaurant") expenseCategories += e.amount;
      // of is for arrays
      if (expenseObj[e.expenseType]) {
        expenseObj[e.expenseType] += e.amount;
      } else {
        expenseObj[e.expenseType] = e.amount;
      }
    }
    console.log(expenseObj);
    this.setState({
      grandTotal: total,
      expenseObj: expenseObj,
      expenseAmount: expenseAmount,
      incomeAmount: incomeAmount,
    });
  };

  displayExpenseObj = () => {
    let displayExpense = []; // in is for obj
    for (let e in this.state.expenseObj) {
      displayExpense.push(
        <li className="transaction-list">
          {e} ${this.state.expenseObj[e]}
        </li>
      );
    }
    return displayExpense;
  };

  render() {
    console.log(this);
    const data = [];
    const data2 = [];
    for (let e in this.state.expenseObj) {
      data.push({
        name: e,
        value: this.state.expenseObj[e],
      });
    }
    data2.push(
      {
        name: "income",
        value: this.state.incomeAmount,
      },
      {
        name: "expenses",
        value: this.state.expenseAmount,
      }
    );

    return (
      <div>
        <p className="unnamed-character-style-4">MY WALLET</p>
        <div>
          <button className="income-button">
            Income <br />${this.state.incomeAmount}
          </button>
          <button className="outcome-button">
            Expenses <br />${this.state.expenseAmount}
          </button>
        </div>
        <div>
          <PieChart data={data} />
          <PieChart data={data2} />
        </div>
        <div>
          <p className="unnamed-character-style-4">Transactions</p>

          {this.displayExpenseObj()}
          {/* <li className="transaction-list"> */}
          {/* Category 1 <span className="goal">2,475 $</span>:
            <span className="actual">2,475 $</span>
          </li>
          <li className="transaction-list">
            Category 2 <span className="goal">2,475 $</span>:
            <span className="actual">2,475 $</span>
          </li>
          <li className="transaction-list">
            Category 3 <span className="goal">2,475 $</span>:
            <span className="actual">2,475 $</span> */}
          {/* </li> */}
        </div>
      </div>
    );
  }
}

export default Home;
