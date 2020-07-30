import axios from "axios";

let baseURL;

process.env.NODE_ENV === "production"
  ? // ? (baseURL = 'https://sheltered-dawn-07708.herokuapp.com')
    (baseURL = "window.location.origin")
  : (baseURL = "http://localhost:5000");

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get("/is-logged-in");
  },
  signUp: async (user) => {
    return await service.post("/signup", user);
  },
  logIn: async (user) => {
    return await service.post("/login", user);
  },
  logOut: async () => {
    return await service.get("/logout");
  },
  expenseCount: async (expenseLog) => {
    return await service.post("/expense", expenseLog);
  },
  incomeCount: async (incomeLog) => {
    return await service.post("/income", incomeLog);
  },
  transactions: async () => {
    return await service.get("/transactions");
  },
  transactionsexpense: async (user) => {
    return await service.get(`/transactionsexpense?id=${user}`);
  },
  transactionsincome: async (user) => {
    return await service.get(`/transactionsincome?id=${user}`);
  },
};

export default actions;
