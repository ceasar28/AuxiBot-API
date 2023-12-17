import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import database from "./config/database.config";
import cors from "cors";
dotenv.config();
import botRoute from "./routes/botRoute";
import eventRoute from "./routes/eventRoute";
const PORT = process.env.PORT || 5000;
const app: Express = express();
database();

// Enable CORS for all routes
app.use(cors());
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// router Middleware
app.use("/api/bot", botRoute);
app.use("/api/event", eventRoute);
app.use("/", (req: Request, res: Response) => {
  res.json({ message: "ping" });
});

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
