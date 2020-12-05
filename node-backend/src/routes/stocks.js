import verifyToken from "../middlewares/verifyToken.js";
import verifyUserParams from "../middlewares/verifyUserParams.js";
import stocks from "../models/stocks.js";
import fetch from 'node-fetch';

const API_KEY = "0I5LPFJMZJXT0EXF";

function apiUrl(ticker) {
  return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`;
}

const route = "/api/users/:id/stocks";

export default (app) => {
  app.get(route, verifyToken, (req, res) => {
    res.send(stocks.get({ userId: req.user.id }));
  });

  app.get(route + "/:ticker", verifyToken, async (req, res) => {
    const items = stocks.get({
      userId: req.user.id,
      ticker: req.params.ticker,
    });
    if (items.length === 1) {
      const response = await fetch(apiUrl(items[0].ticker));
      let responseData = await response.json();
      res.send({
        ...items[0],
        data: responseData,
      });
    } else {
      res.sendStatus(400);
    }
  });

  app.post(route, verifyToken, (req, res) => {
    const { ticker } = req.body;
    if (!ticker) {
      return res.sendStatus(400);
    }
    stocks.create(req.user.id, ticker);
    res.sendStatus(200);
  });

  app.put(route + "/:ticker", verifyToken, (req, res) => {
    const { ticker } = req.body;
    if (!ticker) {
      return res.sendStatus(400);
    }
    if (
      stocks.get({
        userId: req.user.id,
        ticker: req.params.ticker,
      }).length === 1
    ) {
      stocks.update(req.user.id, req.params.ticker, ticker);
      res.sendStatus(200);
    } else {
      stocks.create(req.user.id, ticker);
      res.sendStatus(201);
    }
  });

  app.delete(route + "/:ticker", verifyToken, (req, res) => {
    stocks.delete(req.user.id, req.params.ticker);
    res.sendStatus(200);
  });
};
