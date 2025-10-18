const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  console.log("Method received:", req.method);

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Handle POST
  if (req.method === "POST") {
    try {
      const { prompt, modelType } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Missing prompt" });
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
      const modelName = modelType === "1.5" ? "models/gemini-1.5-pro" : "models/gemini-pro";
      const model = genAI.getGenerativeModel({ model: modelName });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return res.status(200).json({ reply: text });
    } catch (err) {
      console.error("Gemini error:", err);
      return res.status(500).json({ error: "Gemini error", details: err.message });
    }
  }

  // Fallback for other methods
  return res.status(405).json({ error: "Method Not Allowed" });
};