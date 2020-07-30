const { Schema, model } = require("mongoose");

const incomeSchema = new Schema({
  incomeType: String,
  frequencyIncome: String,
  amountIncome: Number,
  dateIncome: Date,

  user: { type: Schema.Types.ObjectId, ref: "User" }, //required: true put later
  //   name: String,
  //   googleId: String,
  //   imageUrl: String,
});

module.exports = model("Income", incomeSchema);
