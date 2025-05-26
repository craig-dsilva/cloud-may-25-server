import express from "express";
import { Client } from "pg";

const app = express();
const pgClient = new Client({});
await pgClient
  .connect()
  .then(() => console.log("Connected to Database..."))
  .catch((err) => console.error(`Database connection error: ${err}`));

app.get("/", (req, res) => res.send("Hello World"));

app.listen(3000);
