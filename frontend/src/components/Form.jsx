import React, { Component } from "react";
import actions from "../services/index";

class Form extends Component {
  state = {
    expenseType: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
