import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import botRoute from "./routes/botRoute";
const PORT = process.env.PORT || 3000;
const app: Express = express();

// Enable CORS for all routes
app.use(cors());
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// router Middleware
app.use("/api/bot", botRoute);

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
