const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const {GoogleGenerativeAI} = require("@google/generative-ai");

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/gemini-chat", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).send({error: "No prompt provided"});

  try {
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const reply = result.response.text();
    res.send({reply});
  } catch (err) {
    console.error(err);
    res.status(500).send({error: "Gemini error"});
  }
});

exports.api = functions.https.onRequest(app);
