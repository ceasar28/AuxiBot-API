import express, { Router, Request, Response } from "express";
import { prompt } from "../controllers/botController";

const router: Router = express.Router();

// Define a test endpoint
router.get("/", prompt);

export default router;
