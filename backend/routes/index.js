const Expense = require("../models/expense");
const router = require("express").Router();
const Income = require("../models/income");
router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

router.post("/expense", isAuth, async (req, res, next) => {
  console.log(req.body);
  let response = await Expense.create(req.body);
  // console.log(response);
  res.json(response);
});
router.post("/income", isAuth, async (req, res, next) => {
  console.log(req.body);
  let response = await Income.create(req.body);
  console.log(response);
  res.json(response);
});
router.get("/transactions", async (req, res) => {
  let response = await Expense.find({ user: "" });
  // console.log(response);
  res.json(response);
});
router.get("/transactionsexpense", isAuth, async (req, res) => {
  console.log(req.user);
  let response = await Expense.find({ user: req.user._id });
  // console.log(response);
  res.json(response);
});
router.get("/transactionsincome", isAuth, async (req, res) => {
  console.log(req.user);
  let response = await Income.find({ user: req.user._id });
  // console.log(response);
  res.json(response);
});
function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
}
module.exports = router;
