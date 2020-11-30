import verifyToken from "../middlewares/verifyToken.js";
import verifyUserParams from "../middlewares/verifyUserParams.js";
import stocks from "../models/stocks.js";

const route = "/api/users/:id/stocks";

export default (app) => {
  app.get(route, verifyToken, (req, res) => {
    res.send(stocks.get({ userId: req.user.id }));
  });

  app.post(route + "/:ticker", verifyToken, (req, res) => {
    stocks.create(req.user.id, req.params.ticker);
    res.send(200);
  });

  app.put(route, verifyToken, (req, res) => {});

  app.delete(route, verifyToken, (req, res) => {});
};
