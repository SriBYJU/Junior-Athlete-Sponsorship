// Provider-agnostic AI wrapper.
//
// Design goal: the app must run and demo perfectly WITHOUT any API key.
// If OPENAI_API_KEY is set we call the model; otherwise we fall back to
// high-quality templated output and label the result as "demo" mode so the
// UI can be honest about what the user is seeing.

import type { GenerationResult } from "./types";

export interface ChatOptions {
  system: string;
  user: string;
  temperature?: number;
  maxTokens?: number;
}

export function isAiConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

/**
 * Calls the OpenAI Chat Completions API. Throws if not configured or on error.
 * We use fetch directly to avoid an SDK dependency.
 */
async function chat(opts: ChatOptions): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: opts.temperature ?? 0.7,
      max_tokens: opts.maxTokens ?? 900,
      messages: [
        { role: "system", content: opts.system },
        { role: "user", content: opts.user },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`OpenAI request failed (${res.status}): ${detail.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("OpenAI returned an empty response");
  }
  return text;
}

/**
 * Runs the model if configured, otherwise returns the demo output.
 * Never throws for a missing key; on a real API error it also degrades to demo
 * so a live demo is never broken by a transient upstream failure.
 */
export async function completeWithFallback(
  opts: ChatOptions,
  demo: () => string,
): Promise<GenerationResult> {
  if (!isAiConfigured()) {
    return { text: demo(), mode: "demo" };
  }
  try {
    const text = await chat(opts);
    return { text, mode: "ai" };
  } catch {
    return { text: demo(), mode: "demo" };
  }
}
