import express from "express";
import bodyParser from "body-parser";
import { calculate } from "./calculate";

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.post("/calculate", calculate);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
