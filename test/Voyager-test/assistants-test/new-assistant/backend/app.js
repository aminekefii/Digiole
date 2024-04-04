import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize the Assistant
const assistantId = 'asst_6lIwUz1YZMllZwQpJkhWzqYL'; // Your existing assistant ID

// Handle incoming chat requests
app.post('/testchat', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request body

    const { messages } = req.body;

    // Assuming you're using the complete method directly on openai
    const response = await openai.complete({
      model: 'text-davinci-003', // Specify the model name or ID
      messages: [...messages],
    });

    console.log('OpenAI response:', response.data); // Log the response from OpenAI

    // Send the response back to the client
    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error("Error completing chat:", error);
    res.status(500).json({ error: "Error completing chat" });
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
