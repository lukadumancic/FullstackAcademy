import login from "./login.js";
import users from "./users.js";
import stocks from "./stocks.js";

export default function (app) {
  login(app);
  users(app);
  stocks(app);
}
