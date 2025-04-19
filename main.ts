import OpenAI from "@openai/openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: Deno.env.get("OPENROUTER_API_KEY") || "",
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "google/gemini-2.5-pro-exp-03-25:free",
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
