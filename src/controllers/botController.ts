import { Request, Response } from "express";
import { textQuery } from "../config/chatbot";

export const prompt = async (req: Request, res: Response) => {
  const { query } = req.body;
  const prompt = await textQuery(query);
  console.log(prompt);
  res.json({ prompt, message: "hello, this is a prompt Bot endpoint" });
};
