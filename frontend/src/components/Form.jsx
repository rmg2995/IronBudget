import React, { Component } from "react";
import actions from "../services/index";
import DatePicker from "react-date-picker";

class Form extends Component {
  state = {
    expenseType: "",
    frequency: "",
    date: new Date(),
    // dollarAmount: 0,
    // frequency: "",
    // date:
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChange = (date) => this.setState({ date });

  submitForm = async (e) => {
    e.preventDefault();
    let res = await actions.expenseCount(this.state);
    console.log(res);
  };

  render() {
    return (
      <div>
        <form action="/action_page.php" onSubmit={this.submitForm}>
          <label for="Expense">Expense</label>
          <select onChange={this.handleChange} name="expenseType" id="">
            <option value="" disabled selected>
              Select Expense
            </option>
            <option value="entertainment">Entertainment</option>
            <option value="restaurant">Restaurant</option>
            <option value="bills">Bills</option>
            <option value="groceries">Groceries</option>
            <option value="transportation">Transportation</option>
            <option value="education">Education</option>
            <option value="home">Home</option>
            <option value="clothing">Clothing</option>
            <option value="travel">Travel</option>
          </select>
          <br />
          <label for="Expense">Frequency</label>
          <select onChange={this.handleChange} name="frequency" id="">
            <option value="" disabled selected>
              Select Frequency
            </option>
            <option value="one-time">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <br />
          <label>Amount</label>
          <input
            onChange={this.handleChange}
            type="Number"
            id=""
            name="amount"
            min="0"
          ></input>
          <br />
          <DatePicker
            name="date"
            onChange={this.onChange}
            value={this.state.date}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
