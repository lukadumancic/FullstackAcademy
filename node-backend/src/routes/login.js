import jwt from 'jsonwebtoken';
import verifyToken from "../helpers/verifyToken.js";


export default function (app) {
  app.post("/api/login", (req, res) => {
    const user = {
      id: 1,
      username: "test",
      email: "brad",
    };

    jwt.sign({ user }, "SECRET KEY", { expiresIn: "7d" }, (err, token) => {
      res.json({
        token,
      });
    });
  });
}
