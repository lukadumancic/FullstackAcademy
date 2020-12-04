import login from "./login.js";
import users from "./users.js";
import stocks from "./stocks.js";
import tasks from "./tasks.js";

export default function (app) {
  login(app);
  users(app);
  stocks(app);
  tasks(app);
}
