import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
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
  