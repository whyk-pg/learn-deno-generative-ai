import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

if (!OPENROUTER_API_KEY) {
  console.error("Please set the OPENROUTER_API_KEY environment variable.");
  Deno.exit(1);
}

const messages = [
  new HumanMessage({
    content: "今日の天気はどう？"
  })
]

const chat = new ChatOpenAI({
  model: "google/gemini-2.5-pro-exp-03-25:free",
  openAIApiKey: OPENROUTER_API_KEY,
  temperature: 0.5,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  }
})

async function main() {
  const res = await chat.invoke(messages);
  const content = res.content ?? "対向先からの応答がありません";

  console.log(content);
}

main();
