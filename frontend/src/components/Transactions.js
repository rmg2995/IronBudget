import React, { Component } from "react";
import actions from "../services/index";
import "../components/styles/transactions.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Transactions extends Component {
  state = {
    transactionsexpense: [],
    transactionsincome: [],
    filterExpense: [],
    filterIncome: [],
    toggleFilter: false,
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
      filterIncome: resIncome.data,
      filterExpense: resExpense.data,
    });
    this.oneBigLoop(resExpense.data, resIncome.data);
  }
  displayTransactionsExpense = () => {
    return this.state.filterExpense?.map((eachTransaction, i) => {
      if (eachTransaction.expenseType) {
        return (
          <li className="transactions">
            {eachTransaction.expenseType} |
            {eachTransaction.startDate.slice(0, 10)} |${eachTransaction.amount}
            <button
              className="delete-btn"
              onClick={() => this.deleteTransaction(i, "deleteExpense")}
            >
              Delete
            </button>
          </li>
        );
      }
    });
  };

  deleteTransaction = (i, list) => {
    let deleteExpense = [...this.state.filterExpense];
    let deleteIncome = [...this.state.filterIncome];
    if (list == "deleteExpense") {
      deleteExpense.splice(i, 1);
    } else {
      deleteIncome.splice(i, 1);
    }
    let expenseAmount = 0;
    for (let e of deleteExpense) {
      // console.log(e);
      if (e.amount) expenseAmount += e.amount;
    }
    let incomeAmount = 0;
    for (let i of deleteIncome) {
      // console.log(i);
      if (i.amountIncome) incomeAmount += i.amountIncome;
    }
    let expenseObjCopy = {};
    deleteExpense.forEach((eachExpense) => {
      if (expenseObjCopy[eachExpense.expenseType]) {
        expenseObjCopy[eachExpense.expenseType] += eachExpense.amount;
      } else {
        expenseObjCopy[eachExpense.expenseType] = eachExpense.amount;
      }
    });
    let incomeObjCopy = {};
    deleteExpense.forEach((eachIncome) => {
      if (incomeObjCopy[eachIncome.incomeType]) {
        incomeObjCopy[eachIncome.incomeType] += eachIncome.amount;
      } else {
        incomeObjCopy[eachIncome.incomeType] = eachIncome.amount;
      }
    });
    let total = incomeAmount - expenseAmount;

    this.setState({
      filterExpense: deleteExpense,
      filterIncome: deleteIncome,
      grandTotal: total,
      expenseObj: expenseObjCopy,
    });
  };
  displayTransactionsIncome = (i) => {
    return this.state.filterIncome.map((eachTransaction) => {
      if (eachTransaction.incomeType) {
        return (
          <li className="transactions">
            {eachTransaction.incomeType} |
            {eachTransaction.startDate.slice(0, 10)} |
            {/* {eachTransaction.frequencyIncome} */}$
            {eachTransaction.amountIncome}
            <button
              className="delete-btn"
              onClick={() => this.deleteTransaction(i, "deleteIncome")}
            >
              Delete
            </button>
          </li>
        );
      }
    });
  };

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
    let expenseObjCopy = {};
    // if (this.state.toggleFilter == false) {
    expenseCopy = this.state.transactionsexpense.filter((expense) => {
      // return expense.startDate.slice(5, 7) === today;
      return (
        new Date(expense.startDate) > this.state.startDate &&
        new Date(expense.startDate) < this.state.endDate
      );
    });
    incomeCopy = this.state.transactionsincome.filter((income) => {
      // return income.startDate.slice(5, 7) === today;
      return (
        new Date(income.startDate) > this.state.startDate &&
        new Date(income.startDate) < this.state.endDate
      );
    });

    expenseCopy.forEach((eachExpense) => {
      if (expenseObjCopy[eachExpense.expenseType]) {
        expenseObjCopy[eachExpense.expenseType] += eachExpense.amount;
      } else {
        expenseObjCopy[eachExpense.expenseType] = eachExpense.amount;
      }
    });
    let expenseAmount = 0;
    for (let e of expenseCopy) {
      // console.log(e);
      if (e.amount) expenseAmount += e.amount;
    }
    let incomeAmount = 0;
    for (let i of incomeCopy) {
      // console.log(i);
      if (i.amountIncome) incomeAmount += i.amountIncome;
    }
    let total = incomeAmount - expenseAmount;
    // expenseObjCopy = this.state.expenseObj.filter((total) => {
    //   // return income.startDate.slice(5, 7) === today;
    //   return (
    //     new Date(total.startDate) > this.state.startDate &&
    //     new Date(total.startDate) < this.state.endDate
    //   );
    // });
    // }
    // console.log(incomeCopy, expenseCopy);
    this.setState({
      filterExpense: expenseCopy,
      filterIncome: incomeCopy,
      expenseObj: expenseObjCopy,
      grandTotal: total,
      toggleFilter: !this.state.toggleFilter,
    });
  };

  onChange = (dates) => {
    const [start, end] = dates;
    this.setState(
      {
        startDate: start,
        endDate: end,
      },
      this.filterTransactions,
      this.displayExpenseObj
    );

    // setStartDate(start);
    // setEndDate(end);
  };

  render() {
    console.log("looking 199", this.state);
    return (
      <div>
        <br />
        <DatePicker
          selected={this.state.startDate}
          onChange={this.onChange}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          selectsRange
          inline
        />
        <h1>Income</h1>
        {this.displayTransactionsIncome()}
        <h1>Expense</h1>
        {this.displayTransactionsExpense()}
        <h1>Net Profit</h1>${this.state.grandTotal}
        <br />
        <h1>Categories Total</h1>
        {this.displayExpenseObj()}
      </div>
    );
  }
}

export default Transactions;
