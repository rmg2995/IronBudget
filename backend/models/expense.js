const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  expenseType: String,
  frequency: String,
  amount: String,
  date: Date,
});

module.exports = model("Expense", expenseSchema);
