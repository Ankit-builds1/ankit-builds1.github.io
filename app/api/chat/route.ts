import OpenAI from "openai";
import { ANKIT_SYSTEM } from "@/lib/ankit-system";

const client = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

const MODEL = "meta/llama-3.3-70b-instruct";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json() as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    };

    const stream = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: ANKIT_SYSTEM },
        ...messages,
      ],
      stream: true,
      max_tokens: 600,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("[ANKIT GPT]", err);
    return new Response("Something went wrong — try again.", { status: 500 });
  }
}
