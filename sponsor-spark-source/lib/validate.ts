// Input validation at the system boundary (untrusted request bodies).

import type { AthleteProfile, Sport } from "./types";

const SPORTS: Sport[] = [
  "pickleball",
  "esports",
  "golf",
  "gymnastics",
  "wrestling",
  "other",
];

export class ValidationError extends Error {}

function str(value: unknown, field: string, { required = true, max = 4000 } = {}): string {
  if (value === undefined || value === null || value === "") {
    if (required) throw new ValidationError(`Missing required field: ${field}`);
    return "";
  }
  if (typeof value !== "string") throw new ValidationError(`Field ${field} must be a string`);
  if (value.length > max) throw new ValidationError(`Field ${field} is too long`);
  return value.trim();
}

export function parseAthleteProfile(body: unknown): AthleteProfile {
  if (typeof body !== "object" || body === null) {
    throw new ValidationError("Request body must be a JSON object");
  }
  const b = body as Record<string, unknown>;

  const sportRaw = str(b.sport, "sport");
  const sport = (SPORTS.includes(sportRaw as Sport) ? sportRaw : "other") as Sport;

  const ageNum = typeof b.age === "number" ? b.age : Number(b.age);
  if (!Number.isFinite(ageNum) || ageNum <= 0 || ageNum > 100) {
    throw new ValidationError("Field age must be a number between 1 and 100");
  }

  const followingNum =
    typeof b.socialFollowing === "number" ? b.socialFollowing : Number(b.socialFollowing);
  if (!Number.isFinite(followingNum) || followingNum < 0) {
    throw new ValidationError("Field socialFollowing must be a non-negative number");
  }

  return {
    firstName: str(b.firstName, "firstName", { max: 60 }),
    age: Math.floor(ageNum),
    sport,
    sportOther: str(b.sportOther, "sportOther", { required: false, max: 60 }) || undefined,
    location: str(b.location, "location", { max: 120 }),
    achievements: str(b.achievements, "achievements", { max: 2000 }),
    socialFollowing: Math.floor(followingNum),
    platforms: str(b.platforms, "platforms", { max: 200 }),
    story: str(b.story, "story", { max: 2000 }),
    values: str(b.values, "values", { required: false, max: 500 }) || undefined,
  };
}
