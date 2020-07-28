const Expense = require("../models/expense");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

router.post("/expense", async (req, res, next) => {
  console.log(req.body);
  let response = await Expense.create(req.body);
  console.log(response);
  res.status(200).json(response);
});

module.exports = router;
