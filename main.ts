import { ChatOpenAI } from "@langchain/openai";
import "@std/dotenv/load";

const chatModel = new ChatOpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

await chatModel.invoke("what is LangSmith?");
