const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  expenseType: String,
  frequency: String,
  amount: String,
  date: Date,

  user: { type: Schema.Types.ObjectId, ref: "User" }, //required: true put later
  //   name: String,
  //   googleId: String,
  //   imageUrl: String,
});

module.exports = model("Expense", expenseSchema);
