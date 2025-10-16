import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).end();

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const models = await genAI.listModels();
    res.status(200).json({ models });
  } catch (err) {
    console.error("Model listing error:", err);
    res.status(500).json({ error: "Failed to list models", details: err.message });
  }
}