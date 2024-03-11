import { Configuration, OpenAIApi } from "openai";

export async function POST(request) {
  const { messages } = await request.json();

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "you are voyage a helpful assistant  as a personal advisor leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding , support services and strategic planning based on your startup's stage and needs.",
      },
      ...messages,
    ],
  });

  return new Response(JSON.stringify({ response: response.data.choices[0] }));
}
