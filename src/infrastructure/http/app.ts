import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello world!");
});

export { app };
