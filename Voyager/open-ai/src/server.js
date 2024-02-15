const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

/*const config = new Configuration({

});*/

const openai = new OpenAI({
    apiKey: "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",
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});

const PORT = 8020;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
