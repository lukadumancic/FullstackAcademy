import jwt from 'jsonwebtoken';
import users from '../models/users.js';

const route = "/api/login";

export default (app) => {
  app.post(route, (req, res) => {
    const { username, password } = req.body;
    const user = users.get({
      username,
      password,
    })[0];
    if (user) {
      jwt.sign({ user }, "SECRET KEY", { expiresIn: "365d" }, (err, token) => {
        res.send({
          user,
          token,
        });
      });
    } else {
      res.sendStatus(400);
    }
  });
}
