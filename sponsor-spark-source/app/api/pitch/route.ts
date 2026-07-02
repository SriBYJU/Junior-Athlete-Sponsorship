import { NextResponse } from "next/server";
import { completeWithFallback } from "@/lib/ai";
import { demoPitch, pitchUserPrompt, PITCH_SYSTEM } from "@/lib/generators";
import { parseAthleteProfile, ValidationError } from "@/lib/validate";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const profile = parseAthleteProfile(body);
    const b = body as Record<string, unknown>;
    const brandName =
      typeof b.brandName === "string" && b.brandName.trim() ? b.brandName.trim().slice(0, 120) : "the brand";
    const ask = typeof b.ask === "string" ? b.ask.trim().slice(0, 500) : "";

    const result = await completeWithFallback(
      { system: PITCH_SYSTEM, user: pitchUserPrompt(profile, brandName, ask), maxTokens: 700 },
      () => demoPitch(profile, brandName, ask),
    );
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong writing the pitch." }, { status: 500 });
  }
}
