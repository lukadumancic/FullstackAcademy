import express from "express";
import routes from "./src/routes/index.js";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
