import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ChatGPT API Integration Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  console.log("Received messages:", messages); // Debugging

  try {
    const apiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Try gpt-3.5-turbo if gpt-4 fails
        messages,
        temperature: 0.7,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OpenAI API response:", apiResponse.data); // Debugging

    res.json(apiResponse.data);
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || "Failed to fetch response from AI Assistant",
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
