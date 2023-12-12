import express, { Router, Request, Response } from "express";
import { prompt, palmPrompt } from "../controllers/botController";

const router: Router = express.Router();

// Define a test endpoint
router.post("/", prompt);
router.post("/palm", palmPrompt);

export default router;
