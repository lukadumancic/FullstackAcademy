import express from "express";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const createApp = (port = process.env.PORT || 3000) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('/', (req, res) => {
    res.send("<html><body><a href='/api-docs'>Documentation<a></body></html>")
  })

  routes(app);

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
  return app;
};

export { createApp };
export default createApp();
