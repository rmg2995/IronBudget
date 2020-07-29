const Expense = require("../models/expense");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

router.post("/expense", async (req, res, next) => {
  console.log(req.body);
  let response = await Expense.create(req.body);
  // console.log(response);
  res.json(response);
});
router.get("/transactions", async (req, res) => {
  let response = await Expense.find({ user: "" });
  // console.log(response);
  res.json(response);
});
router.get("/transactions2", async (req, res) => {
  console.log(req.query);
  let response = await Expense.find({ user: req.query.id });
  // console.log(response);
  res.json(response);
});
module.exports = router;
