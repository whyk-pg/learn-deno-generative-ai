import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatAnthropic } from "@langchain/anthropic";
import "@std/dotenv/load";

const chatModel = new ChatAnthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});
const outputParser = new StringOutputParser();
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a world class technical documentation writer."],
  ["user", "{input}"],
]);
const chain = prompt.pipe(chatModel).pipe(outputParser);

const message = await chain.invoke({
  input: "what is LangSmith?",
});

console.log(message);
