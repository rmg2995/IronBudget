const mongoose = require("mongoose");
const Income = require("./models/income");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/deploymentExample";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    Income.find({ frequencyIncome: "monthly" }).then((allIncomes) => {
      let promises = [];
      allIncomes.forEach((eachIncome) => {
        eachIncome.totalIncome += eachIncome.amountIncome;
        promises.push(eachIncome.save());
      });
      Promise.all(promises).then((res) => mongoose.connection.close());
    });
  })
  .catch((err) => console.error("Error connecting to mongo", err));
