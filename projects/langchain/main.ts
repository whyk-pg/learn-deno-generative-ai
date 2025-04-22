import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { TextLineStream } from "@std/streams/text-line-stream";
import { isLangChainErrorLike } from "./error.ts";

const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

if (!OPENROUTER_API_KEY) {
  console.error("Please set the OPENROUTER_API_KEY environment variable.");
  Deno.exit(1);
}

const API_MODEL = Deno.env.get("API_MODEL") ??
  "google/gemini-2.0-flash-exp:free";

const chat = new ChatOpenAI({
  model: API_MODEL,
  openAIApiKey: OPENROUTER_API_KEY,
  temperature: 0.5,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

async function main() {
  console.log(`
+-----------------------------------------------------+
  Deno + LangChain + OpenRouter CLI
  モデル: ${API_MODEL}
+-----------------------------------------------------+
`);
  console.log("質問を入力してください ('exit' または Ctrl+D で終了)");
  console.log("---");

  const lineStream = Deno.stdin.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());

  for await (const line of lineStream) {
    const userInput = line.trim();

    if (userInput.toLowerCase() === "exit") {
      break;
    }

    if (!userInput) {
      continue;
    }

    try {
      console.log("🤖 考え中...");
      const messages = [new HumanMessage(userInput)];
      const response = await chat.invoke(messages);

      const aiResponse = response?.content ?? "応答を取得できませんでした。";

      console.log("---");
      console.log(`👤 あなた: ${userInput}`);
      console.log(`🤖 AI: ${aiResponse}`);
      console.log("---");
      console.log("次の質問を入力してください ('exit' または Ctrl+D で終了)");
    } catch (error) {
      if (isLangChainErrorLike(error)) {
        console.error("エラーが発生しました:", error.message);
        if (error.response?.status === 401) {
          console.error(
            "APIキーが無効か、認証に失敗した可能性があります。キーを確認してください。",
          );
        } else if (error.message?.includes("rate limit")) {
          console.error(
            "OpenRouterのレート制限に達した可能性があります。しばらく待ってから再試行してください。",
          );
        } else if (error.message?.includes("insufficient_quota")) {
          console.error(
            "OpenRouterのクレジットが不足している可能性があります。",
          );
        }
        console.log("---");
        console.log(
          "質問をもう一度入力してください ('exit' または Ctrl+D で終了)",
        );
      }
    }
  }
  console.log("👋 CLIを終了します。");
}

main();
