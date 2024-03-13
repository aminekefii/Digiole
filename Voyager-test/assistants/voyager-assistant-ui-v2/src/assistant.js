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

app.post('/testchat', async (req, res) => {
  const { messages } = req.body;

  const assistantId = 'asst_6lIwUz1YZMllZwQpJkhWzqYL'; // Your assistant ID

  const response = await openai.assistants.complete({
    assistantId,
    messages: [
      ...messages
    ]
  });

  res.json({ response: response.data.messages });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
