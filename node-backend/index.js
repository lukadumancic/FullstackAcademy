import express from "express";
import routes from "./src/routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
