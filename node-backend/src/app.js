import express from "express";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";

const createApp = (port = process.env.PORT || 3000) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  routes(app);

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
  return app;
};

export { createApp };
export default createApp();
