// A small, curated knowledge base of the kinds of brands that sponsor junior
// athletes in fast-growing niche sports, plus WHY they do it and the angle
// that tends to work. This encodes founder experience and also seeds the
// demo-mode Brand Matcher. In production this becomes a data-driven, learning
// model informed by real response/close-rate data.

import type { BrandMatch, Sport } from "./types";

type BrandBook = Record<Sport, BrandMatch[]>;

export const BRAND_BOOK: BrandBook = {
  pickleball: [
    {
      name: "Emerging paddle & gear makers",
      category: "Equipment",
      whyFit:
        "Newer paddle brands fight for shelf space against incumbents and love authentic young players who post gameplay.",
      angle:
        "Offer to be a 'paddle ambassador': gear reviews, tournament tags, and a discount code your followers can use.",
    },
    {
      name: "Local & regional sports apparel",
      category: "Apparel",
      whyFit:
        "Court-sport apparel brands want real athletes in real matches, not stock photos.",
      angle: "Pitch a season-long kit deal in exchange for content + event visibility.",
    },
    {
      name: "Recovery & hydration brands",
      category: "Wellness",
      whyFit:
        "Hydration and recovery brands target active families and value 'clean' youth ambassadors.",
      angle: "Propose a values-aligned partnership: healthy habits + tournament day routines.",
    },
  ],
  esports: [
    {
      name: "Peripheral makers (mice, keyboards, headsets)",
      category: "Hardware",
      whyFit:
        "Peripheral brands live and die on creator content and love rising players with engaged audiences.",
      angle: "Offer setup showcases, clips, and an affiliate code; ask for gear + a monthly stipend.",
    },
    {
      name: "Energy & focus drinks (age-appropriate lines)",
      category: "Beverage",
      whyFit: "Gaming-adjacent beverage brands chase young, online audiences.",
      angle:
        "Only pursue age-appropriate/non-caffeinated lines; lead with your clean, family-friendly image.",
    },
    {
      name: "Streaming tools & software",
      category: "Software",
      whyFit: "Overlay, capture, and editing tools want tutorials and 'my setup' content.",
      angle: "Trade authentic tutorials for licenses + a referral cut.",
    },
  ],
  golf: [
    {
      name: "Boutique glove, ball & accessory brands",
      category: "Equipment",
      whyFit: "Challenger golf brands need credible junior players to build trust.",
      angle: "Pitch a junior ambassador program: range content, on-course reels, tournament tags.",
    },
    {
      name: "Golf apparel & headwear",
      category: "Apparel",
      whyFit: "Style-forward golf apparel brands want photogenic young players.",
      angle: "Season kit deal + logo placement in tournament photos.",
    },
    {
      name: "Local courses & academies",
      category: "Local",
      whyFit: "Courses and academies sponsor promising juniors for community goodwill and marketing.",
      angle: "Offer to be the face of their junior program in exchange for fees + content.",
    },
  ],
  gymnastics: [
    {
      name: "Leotard & activewear brands",
      category: "Apparel",
      whyFit: "Leotard brands rely heavily on athlete photos and meet-day content.",
      angle: "Ambassador kit deal: wear their line at meets, tag on posts, share a discount code.",
    },
    {
      name: "Grips, chalk & training aids",
      category: "Equipment",
      whyFit: "Training-aid brands want demonstrable results from real gymnasts.",
      angle: "Trade honest product content for free gear + affiliate revenue.",
    },
    {
      name: "Recovery & nutrition (kid-safe)",
      category: "Wellness",
      whyFit: "Family-focused wellness brands value disciplined young athletes.",
      angle: "Lead with routine + values; keep everything age-appropriate.",
    },
  ],
  wrestling: [
    {
      name: "Headgear, shoes & gear brands",
      category: "Equipment",
      whyFit: "Wrestling gear brands are niche and community-driven; they reward loyal young athletes.",
      angle: "Offer match footage, tournament tags, and a code; ask for gear + a stipend.",
    },
    {
      name: "Strength & conditioning apparel",
      category: "Apparel",
      whyFit: "S&C brands want gritty, authentic training content.",
      angle: "Season-long content deal tied to your training grind.",
    },
    {
      name: "Local gyms & clubs",
      category: "Local",
      whyFit: "Clubs sponsor standout wrestlers to attract new members.",
      angle: "Be their recruiting face in exchange for dues + shoutouts.",
    },
  ],
  other: [
    {
      name: "Challenger equipment brands in your sport",
      category: "Equipment",
      whyFit: "Newer brands need credible athletes to build trust against incumbents.",
      angle: "Pitch an ambassador program: authentic content + a trackable discount code.",
    },
    {
      name: "Sport-specific apparel brands",
      category: "Apparel",
      whyFit: "Apparel brands want real athletes in real competition, not stock imagery.",
      angle: "Propose a season kit deal in exchange for content and event visibility.",
    },
    {
      name: "Local & regional businesses",
      category: "Local",
      whyFit: "Local businesses sponsor promising young athletes for community goodwill.",
      angle: "Offer local visibility (jersey/banner + social tags) for a modest sponsorship.",
    },
  ],
};

export function brandsForSport(sport: Sport): BrandMatch[] {
  return BRAND_BOOK[sport] ?? BRAND_BOOK.other;
}
