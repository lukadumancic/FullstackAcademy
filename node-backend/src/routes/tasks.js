import verifyToken from "../middlewares/verifyToken.js";
import verifyUserParams from "../middlewares/verifyUserParams.js";
import fetch from "node-fetch";
import tasks from "../models/tasks.js";

const route = "/api/users/:id/tasks";

export default (app) => {
  app.get(route, verifyToken, (req, res) => {
    res.send(tasks.get({ userId: req.user.id }));
  });

  app.get(route + "/:taskId", verifyToken, async (req, res) => {
    const items = tasks.get({
      id: req.params.taskId,
      userId: req.user.id
    });
    if (items.length === 1) {
      res.send(items[0]);
    } else {
      res.sendStatus(400);
    }
  });

  app.post(route, verifyToken, (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.sendStatus(400);
    }
    tasks.create({
      userId: req.user.id,
      title,
      description,
    });
    res.sendStatus(201);
  });

  app.put(route + "/:taskId", verifyToken, (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.sendStatus(400);
    }
    if (tasks.get({ id: taskId, userId: req.user.id }).length === 1) {
      tasks.update(req.params.taskId, { title, description });
      res.sendStatus(200);
    } else {
      tasks.create({ userId: req.user.id, title, description });
      res.sendStatus(201);
    }
  });

  app.delete(route + "/:taskId", verifyToken, (req, res) => {
    if (
      tasks.get({
        id: req.params.taskId,
        userId: req.user.id,
      }).length === 1
    ) {
      tasks.delete(req.params.taskId);
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  });
};
