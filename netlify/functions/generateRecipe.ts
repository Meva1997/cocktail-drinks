import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_KEY!,
});

export default async (req, res) => {
  const { prompt } = JSON.parse(req.body);

  const stream = await streamText({
    model: openrouter("meta-llama/llama-3.3-8b-instruct:free"),
    prompt,
    system: "Eres un bartender que platica mucho, es agradable y con una amplia experiencia",
    temperature: 0.2
  });

  res.setHeader("Content-Type", "text/event-stream");
  for await (const chunk of stream.textStream) {
    res.write(chunk);
  }

  res.end();
};
