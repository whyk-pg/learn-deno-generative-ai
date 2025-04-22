import OpenAI from "@openai/openai";

const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

if (!OPENROUTER_API_KEY) {
  console.error("Please set the OPENROUTER_API_KEY environment variable.");
  Deno.exit(1);
}

const API_MODEL = Deno.env.get("API_MODEL") ??
  "google/gemini-2.0-flash-exp:free";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
});

async function main() {
  console.log(`
+-----------------------------------------------------+
  Deno + OpenAI SDK + OpenRouter CLI
  モデル: ${API_MODEL}
+-----------------------------------------------------+
`);

  const completion = await openai.chat.completions.create({
    model: API_MODEL,
    messages: [
      {
        role: "user",
        content: "今日の天気はどう？",
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}

main();