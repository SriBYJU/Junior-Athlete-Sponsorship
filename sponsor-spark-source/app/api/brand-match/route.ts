import { NextResponse } from "next/server";
import { completeWithFallback } from "@/lib/ai";
import { brandMatchUserPrompt, BRAND_MATCH_SYSTEM, demoBrandMatch } from "@/lib/generators";
import { parseAthleteProfile, ValidationError } from "@/lib/validate";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const profile = parseAthleteProfile(body);
    const result = await completeWithFallback(
      { system: BRAND_MATCH_SYSTEM, user: brandMatchUserPrompt(profile), maxTokens: 900 },
      () => demoBrandMatch(profile),
    );
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong finding brand matches." }, { status: 500 });
  }
}
