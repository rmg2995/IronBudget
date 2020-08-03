import React, { Component } from "react";
import actions from "../services/index";
import "../components/styles/transactions.css";

class Transactions extends Component {
  state = {
    transactionsexpense: [],
    transactionsincome: [],
    filterTransactions: false,
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
  displayTransactionsExpense = () => {
    return this.state.transactionsexpense.map((eachTransaction) => {
      if (eachTransaction.expenseType) {
        return (
          <li className="transactions">
            {eachTransaction.expenseType} |
            {eachTransaction.startDate.slice(0, 10)} |
            {eachTransaction.frequency} |{eachTransaction.amount * -1} |
          </li>
        );
      }
      // this.setState({
      //   expenseAmount:{eachTransaction.amount}
      // })
    });
  };
  displayTransactionsIncome = () => {
    return this.state.transactionsincome.map((eachTransaction) => {
      if (eachTransaction.incomeType) {
        return (
          <li className="transactions">
            {eachTransaction.incomeType} |
            {eachTransaction.startDate.slice(0, 10)} |
            {eachTransaction.frequencyIncome} |{eachTransaction.amountIncome} |
          </li>
        );
      }
    });
  };
  // totalTransactionsExpense = () => {
  //   console.log(this.state.transactionsexpense);
  //   let totalExpense = this.state.transactionsexpense.reduce((a, b) => {
  //     console.log(b);
  //     if (b.amount) {
  //       return a + Number(b.amount);
  //     } else {
  //       return a;
  //     }
  //   }, 0);

  //   console.log(totalExpense);
  //   return totalExpense;
  // };
  // totalTransactionsIncome = () => {
  //   console.log(this.state.transactionsincome);
  //   let totalIncome = this.state.transactionsincome.reduce((a, b) => {
  //     console.log(b);
  //     if (b.amountIncome) {
  //       return a + Number(b.amountIncome);
  //     } else {
  //       return a;
  //     }
  //   }, 0);

  //   console.log(totalIncome);
  //   return totalIncome;
  // };
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
    });
  };
  displayExpenseObj = () => {
    let displayExpense = []; // in is for obj
    for (let e in this.state.expenseObj) {
      displayExpense.push(
        <li className="transactions">
          {e} ${this.state.expenseObj[e]}
        </li>
      );
    }
    return displayExpense;
  };

  filterTransactions = () => {
    let today = new Date().getMonth();
    ++today < 10 ? (today = "0" + today) : today.toString();
    let expenseCopy = [...this.state.transactionsexpense];
    let incomeCopy = [...this.state.transactionsincome];
    expenseCopy = expenseCopy.filter((expense) => {
      return expense.startDate.slice(5, 7) === today;
    });
    incomeCopy = incomeCopy.filter((income) => {
      return income.startDate.slice(5, 7) === today;
    });
    // console.log(incomeCopy, expenseCopy);
    this.setState({
      transactionsexpense: expenseCopy,
      transactionsincome: incomeCopy,
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.filterTransactions}>Date filter by month</button>
        <p>Expense</p>
        {this.displayTransactionsExpense()}
        <p>Income</p>
        {this.displayTransactionsIncome()}
        {/* {this.totalTransactionsExpense()} */}
        {/* {this.totalTransactionsIncome()} */}
        {this.state.grandTotal}
        <br />
        <p>Categories total</p>

        {this.displayExpenseObj()}
      </div>
    );
  }
}

export default Transactions;
