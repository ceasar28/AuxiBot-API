import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import botRoute from "./routes/botRoute";
const PORT = process.env.PORT || 3000;
const app: Express = express();

// router Middleware
app.use("/api/bot", botRoute);

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
