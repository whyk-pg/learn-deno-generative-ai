import { ChatAnthropic } from "@langchain/anthropic";
import "@std/dotenv/load";

const chatModel = new ChatAnthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});

const message = await chatModel.invoke("what is LangSmith?");
console.log(message.content);
