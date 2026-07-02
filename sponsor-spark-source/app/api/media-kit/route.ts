import { NextResponse } from "next/server";
import { completeWithFallback } from "@/lib/ai";
import { demoMediaKit, mediaKitUserPrompt, MEDIA_KIT_SYSTEM } from "@/lib/generators";
import { parseAthleteProfile, ValidationError } from "@/lib/validate";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const profile = parseAthleteProfile(body);
    const result = await completeWithFallback(
      { system: MEDIA_KIT_SYSTEM, user: mediaKitUserPrompt(profile), maxTokens: 1000 },
      () => demoMediaKit(profile),
    );
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong generating the media kit." }, { status: 500 });
  }
}
