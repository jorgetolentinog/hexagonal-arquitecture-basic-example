import express from "express";
import bodyParser from "body-parser";
import { appointmentCreator } from "../injector";

const app = express();
app.use(bodyParser.json());

app.get("/", async (_, res) => {
  await appointmentCreator.execute({
    date: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    email: "hello@world.com",
  });

  res.send("Ok");
});

export { app };
