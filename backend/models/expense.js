const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  expenseType: String,
  frequency: String,
  amount: String,
});

module.exports = model("Expense", expenseSchema);
