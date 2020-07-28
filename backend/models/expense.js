const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  expenseType: String,
  //   name: String,
  //   googleId: String,
  //   imageUrl: String,
});

module.exports = model("Expense", expenseSchema);
