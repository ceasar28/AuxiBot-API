import { Request, Response } from "express";
import { textQuery } from "../config/chatbot";

const Palm_API_Key = process.env.PALM_API;
const language_model_Url = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${Palm_API_Key}`;

export const prompt = async (req: Request, res: Response) => {
  const { query } = req.body;
  const prompt = await textQuery(query);
  console.log(prompt);
  res.json({ prompt, message: "hello, this is a prompt Bot endpoint" });
};

export const palmPrompt = async (req: Request, res: Response) => {
  const { query } = req.body;

  const payload = {
    prompt: { messages: [{ content: query }] },
    temperature: 0.1,
    candidateCount: 1,
  };

  const response = await fetch(language_model_Url, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const data = await response.json();
  res.json({ data, message: "hello, this is a Palm prompt Bot endpoint" });
};
