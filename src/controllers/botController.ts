import { Request, Response } from "express";

export const prompt = async (req: Request, res: Response) => {
  console.log(req);
  res.send("hello, this is a test endpoint");
};
