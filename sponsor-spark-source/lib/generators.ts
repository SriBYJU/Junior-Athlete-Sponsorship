// Prompt builders + demo-mode fallbacks for each copilot feature.
// Keeping these together makes the "AI path" and the "demo path" easy to keep
// in sync and easy to test.

import { brandsForSport } from "./brands";
import type { AthleteProfile } from "./types";

function sportLabel(profile: AthleteProfile): string {
  return profile.sport === "other" && profile.sportOther
    ? profile.sportOther
    : profile.sport;
}

/* -------------------------------------------------------------------------- */
/*  Media Kit                                                                 */
/* -------------------------------------------------------------------------- */

export const MEDIA_KIT_SYSTEM = `You are an expert youth-sports marketing strategist who has helped junior athletes land brand sponsorships. You write concise, credible, brand-ready one-page media kits. Never invent statistics that were not provided. Keep the tone confident but authentic and age-appropriate. The account is operated by a parent or guardian on behalf of a minor athlete, so avoid publishing sensitive personal details (no home address, no school name, no full legal name).`;

export function mediaKitUserPrompt(p: AthleteProfile): string {
  return `Create a one-page sponsorship media kit for this junior athlete.

Sport: ${sportLabel(p)}
Athlete (first name only): ${p.firstName}
Age: ${p.age}
Location/market: ${p.location}
Achievements: ${p.achievements}
Approx. total social following: ${p.socialFollowing}
Platforms: ${p.platforms}
Story: ${p.story}
Values: ${p.values || "not specified"}

Structure it with these sections:
1. Headline (one punchy line)
2. About (2-3 sentences)
3. Athletic highlights (bullets)
4. Audience & reach (bullets, only using the numbers provided)
5. What I offer sponsors (deliverables: posts, reels, event tags, discount codes, appearances)
6. Ideal partners (types of brands, not specific companies)
7. Contact line (say "Managed by parent/guardian — contact for details")

Use Markdown. Keep it to roughly one page.`;
}

export function demoMediaKit(p: AthleteProfile): string {
  const sport = sportLabel(p);
  return `# ${p.firstName} — ${sport.charAt(0).toUpperCase() + sport.slice(1)} Athlete

**${p.age}-year-old ${sport} competitor from ${p.location} building an authentic, engaged audience.**

## About
${p.firstName} is a dedicated young ${sport} athlete on the rise. ${p.story} Every post is real, family-friendly, and rooted in the daily grind of the sport.

## Athletic Highlights
- ${p.achievements}
- Competes and trains regularly in ${p.location}
- Consistent, disciplined presence in the ${sport} community

## Audience & Reach
- **~${p.socialFollowing.toLocaleString()}** total followers across ${p.platforms}
- Highly engaged, sport-focused audience of families and fellow athletes
- Authentic content: training, competition, and behind-the-scenes

## What I Offer Sponsors
- Sponsored posts and reels featuring your product in real training/competition
- Event and tournament tags and mentions
- A trackable discount/affiliate code for your brand
- Honest product reviews and "my setup" content

## Ideal Partners
Challenger equipment brands, sport-specific apparel, kid-safe wellness/nutrition, and local businesses that want authentic reach into the ${sport} community.

## Contact
_Managed by parent/guardian — contact for partnership details._

---
_Generated in demo mode. Add an OpenAI API key to generate tailored copy._`;
}

/* -------------------------------------------------------------------------- */
/*  Brand Matcher                                                             */
/* -------------------------------------------------------------------------- */

export const BRAND_MATCH_SYSTEM = `You are a sponsorship strategist. Given a junior athlete profile, suggest categories/types of brands (not necessarily specific companies) that realistically sponsor athletes at this level, WHY each is a fit, and the ANGLE that tends to work. Be realistic about a junior athlete's leverage. Keep it practical and age-appropriate.`;

export function brandMatchUserPrompt(p: AthleteProfile): string {
  const seed = brandsForSport(p.sport)
    .map((b) => `- ${b.name} (${b.category}): ${b.whyFit} Angle: ${b.angle}`)
    .join("\n");
  return `Athlete profile:
Sport: ${sportLabel(p)}
Age: ${p.age}
Location: ${p.location}
Following: ${p.socialFollowing} on ${p.platforms}
Achievements: ${p.achievements}
Values: ${p.values || "not specified"}

Here is a starting list of brand archetypes for this sport:
${seed}

Refine and expand this into 5-6 concrete brand-category recommendations tailored to THIS athlete's reach and story. For each: name the category, why it fits this athlete specifically, and a specific first-approach angle. Use Markdown with a short bold header per recommendation.`;
}

export function demoBrandMatch(p: AthleteProfile): string {
  const matches = brandsForSport(p.sport);
  const body = matches
    .map(
      (b) =>
        `### ${b.name} — ${b.category}\n**Why it fits ${p.firstName}:** ${b.whyFit}\n\n**First-approach angle:** ${b.angle}`,
    )
    .join("\n\n");
  return `## Recommended brand categories for ${p.firstName}

Based on ${sportLabel(p)}, a following of ~${p.socialFollowing.toLocaleString()}, and your story, start here:

${body}

> **Tip:** With a smaller following, lead with *authenticity and affiliate performance* rather than a big flat fee. Land 1-2 partnerships, show real results, then raise your rates.

---
_Generated in demo mode. Add an OpenAI API key for fully tailored matches._`;
}

/* -------------------------------------------------------------------------- */
/*  Pitch Writer                                                              */
/* -------------------------------------------------------------------------- */

export const PITCH_SYSTEM = `You write concise, authentic sponsorship outreach emails for junior athletes. The email is sent by a parent/guardian on behalf of a minor. Be warm, specific, and brief (under ~180 words). Never fabricate stats. Make a clear, low-friction ask and offer specific deliverables. Age-appropriate and professional.`;

export function pitchUserPrompt(p: AthleteProfile, brandName: string, ask: string): string {
  return `Write a sponsorship outreach email to "${brandName}" for this athlete.

Sport: ${sportLabel(p)}
Athlete (first name): ${p.firstName}
Age: ${p.age}
Location: ${p.location}
Achievements: ${p.achievements}
Following: ${p.socialFollowing} on ${p.platforms}
Story: ${p.story}
What we're asking for: ${ask || "a starter product/ambassador partnership"}

Requirements:
- Sent from the parent/guardian's perspective (mention it's managed by a parent).
- Subject line + body.
- Specific deliverables offered (posts, reels, tags, discount code).
- One clear, low-friction call to action.
- Under ~180 words. Markdown.`;
}

export function demoPitch(p: AthleteProfile, brandName: string, ask: string): string {
  const sport = sportLabel(p);
  const askLine = ask || "a starter ambassador partnership (gear + a small stipend)";
  return `**Subject:** Partnership idea — ${p.firstName}, rising ${sport} athlete (${p.socialFollowing.toLocaleString()} followers)

Hi ${brandName} team,

I'm reaching out on behalf of my ${p.age}-year-old, ${p.firstName}, a ${sport} athlete in ${p.location}. (I manage all partnerships as their parent/guardian.)

A quick snapshot: ${p.achievements}, with ~${p.socialFollowing.toLocaleString()} engaged followers across ${p.platforms}. ${p.story}

We love what ${brandName} is building and think ${p.firstName} would be a genuine fit. Here's what we can offer:
- 2 sponsored posts + 1 reel featuring your product in real training/competition
- Tags and mentions at upcoming events
- A trackable discount/affiliate code for your audience

We'd love to explore **${askLine}**. Would you be open to a quick call, or should I send ${p.firstName}'s one-page media kit?

Thank you for your time!

Warm regards,
[Parent/Guardian name] — on behalf of ${p.firstName}

---
_Generated in demo mode. Add an OpenAI API key to tailor this pitch._`;
}
