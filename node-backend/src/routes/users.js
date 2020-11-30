import verifyToken from "../middlewares/verifyToken.js";
import users from "../models/users.js";

const route = "/api/users";

export default (app) => {
  app.get(route, verifyToken, (req, res) => {
    res.send(req.user);
  });

  app.post(route, (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      if (users.get({ username }).length > 0) {
        res.send("Username exists");
      } else {
        users.create(username, password);
        res.sendStatus(200);
      }
    } else {
      res.send("No username or password");
    }
  });

  app.put(route, verifyToken, (req, res) => {});

  app.delete(route, verifyToken, (req, res) => {});
};
