// Shared types for the SponsorSpark copilot.

export type Sport =
  | "pickleball"
  | "esports"
  | "golf"
  | "gymnastics"
  | "wrestling"
  | "other";

export interface AthleteProfile {
  /** The athlete's first name (or a nickname). We intentionally avoid collecting full legal names in the demo. */
  firstName: string;
  /** Age in years. Used only to tailor guidance; the app is parent/guardian-operated for minors. */
  age: number;
  sport: Sport;
  /** Free-text description of the sport if "other" is selected. */
  sportOther?: string;
  /** Region / market, e.g. "Austin, TX" or "Pacific Northwest". */
  location: string;
  /** Notable results, rankings, titles. */
  achievements: string;
  /** Approximate total social following across platforms. */
  socialFollowing: number;
  /** Primary platforms, e.g. "Instagram, TikTok". */
  platforms: string;
  /** The athlete's story / what makes them compelling. */
  story: string;
  /** What the athlete cares about (helps match values-aligned brands). */
  values?: string;
}

export type GenerationMode = "ai" | "demo";

export interface GenerationResult {
  text: string;
  mode: GenerationMode;
}

export interface BrandMatch {
  name: string;
  category: string;
  whyFit: string;
  angle: string;
}
