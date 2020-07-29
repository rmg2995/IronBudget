import React, { Component } from "react";
import actions from "../services/index";
import DatePicker from "react-date-picker";
class Form extends Component {
  state = {
    expenseType: "",
    date: new Date(),
  };
  onChange = (date) => this.setState({ date });
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = async (e) => {
    e.preventDefault();
    console.log(this.props);
    let obj = { ...this.state, user: this.props.userId._id };
    console.log(obj);
    let res = await actions.expenseCount(obj);
    console.log(res);
  };

  render() {
    return (
      <div>
        <form action="/action_page.php" onSubmit={this.submitForm}>
          <label for="Expense">Expense</label>
          <select
            onChange={this.handleChange}
            name="expenseType"
            placeholder="Expense"
            id=""
          >
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
          <label for="Expense">Frequency</label>
          <select onChange={this.handleChange} name="frequency" id="">
            <option value="" disabled selected>
              Select Frequency
            </option>
            <option value="one-time">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <DatePicker
            onChange={this.onChange}
            name="date"
            value={this.state.date}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
