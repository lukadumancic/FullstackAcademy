import verifyToken from "../middlewares/verifyToken.js";
import users from "../models/users.js";

const route = "/api/users";

export default (app) => {
  app.get(route, (req, res) => {
    const items = users.get();
    res.send(items);
  });

  app.get(route + "/:id", (req, res) => {
    const items = users.get({ id: req.params.id });
    if (items.length === 1) {
      res.send(items[0]);
    } else {
      res.sendStatus(404);
    }
  });

  app.post(route, (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      if (users.get({ username }).length > 0) {
        return res.sendStatus(400);
      } else {
        users.create(username, password);
        res.sendStatus(201);
      }
    } else {
      res.sendStatus(400);
    }
  });

  app.put(route + "/:id", verifyToken, (req, res) => {
    if (req.user.id != req.params.id) {
      return res.sendStatus(404);
    }
    const { username, password } = req.body;
    users.update(req.user.id, { username, password });
    res.sendStatus(200);
  });

  app.delete(route + "/:id", verifyToken, (req, res) => {
    if (req.user.id != req.params.id) {
      return res.sendStatus(404);
    }
    if (users.delete(req.user.id)) {
      return res.sendStatus(200);
    }
    return res.sendStatus(204);
  });
};
