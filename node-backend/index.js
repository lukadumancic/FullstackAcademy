import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/posts", verifyToken, (req, res) => {
    res.send(req.user);
});

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


function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    if (bearer.length === 2) {
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(bearerToken, "SECRET KEY", (err, authData) => {
          if (err) {
              res.sendStatus(403);
          } else {
              req.user = authData.user;
              next();
          }
      })
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
