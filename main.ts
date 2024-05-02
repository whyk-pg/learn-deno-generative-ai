import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatAnthropic } from "@langchain/anthropic";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { DenoDOMWebBaseLoader } from "./document_loader.ts";
import "@std/dotenv/load";

const loader = new DenoDOMWebBaseLoader(
  "https://docs.smith.langchain.com/user_guide",
  { selector: "main" },
);
const docs = await loader.load();
const splitter = new RecursiveCharacterTextSplitter();
const splitDocs = await splitter.splitDocuments(docs);

const chatModel = new ChatAnthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});
const prompt = ChatPromptTemplate.fromTemplate(
  `Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {input}`,
);

const documentChain = await createStuffDocumentsChain({
  llm: chatModel,
  prompt,
});

const message = await documentChain.invoke({
  input: "what is LangSmith?",
  context: splitDocs,
});

console.log(message);
