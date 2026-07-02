"use client";

import { useState } from "react";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import type { AthleteProfile, GenerationResult, Sport } from "@/lib/types";

const SPORTS: { value: Sport; label: string }[] = [
  { value: "pickleball", label: "Pickleball" },
  { value: "esports", label: "Esports" },
  { value: "golf", label: "Golf" },
  { value: "gymnastics", label: "Gymnastics" },
  { value: "wrestling", label: "Wrestling" },
  { value: "other", label: "Other" },
];

type ToolKey = "media-kit" | "brand-match" | "pitch";

const EMPTY: AthleteProfile = {
  firstName: "",
  age: 14,
  sport: "pickleball",
  location: "",
  achievements: "",
  socialFollowing: 0,
  platforms: "",
  story: "",
  values: "",
};

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";

export default function CopilotPage() {
  const [agreed, setAgreed] = useState(false);
  const [consent, setConsent] = useState(false);
  const [profile, setProfile] = useState<AthleteProfile>(EMPTY);
  const [brandName, setBrandName] = useState("");
  const [ask, setAsk] = useState("");
  const [loading, setLoading] = useState<ToolKey | null>(null);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function update<K extends keyof AthleteProfile>(key: K, value: AthleteProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  async function run(tool: ToolKey) {
    setError(null);
    setResult(null);
    setLoading(tool);
    try {
      const body: Record<string, unknown> = { ...profile };
      if (tool === "pitch") {
        body.brandName = brandName;
        body.ask = ask;
      }
      const res = await fetch(`/api/${tool}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setResult(data as GenerationResult);
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(null);
    }
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (!consent) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Before we start</h1>
        <p className="mt-3 text-slate-600">
          SponsorSpark is designed for families of athletes under 18. Accounts are operated by a{" "}
          <strong>parent or guardian</strong>. We collect only what&apos;s needed to build a media kit and
          keep it minor-safe: use a <strong>first name only</strong> and avoid sensitive details like home
          address or school.
        </p>
        <label className="mt-5 flex items-start gap-3 rounded-lg bg-slate-50 p-4">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span className="text-sm text-slate-700">
            I confirm I am the parent or legal guardian of the athlete, and I consent to using SponsorSpark
            on their behalf. I&apos;ve read the{" "}
            <Link href="/privacy" className="text-brand-600 underline">Privacy Policy</Link> and{" "}
            <Link href="/terms" className="text-brand-600 underline">Terms</Link>.
          </span>
        </label>
        <button
          type="button"
          disabled={!agreed}
          onClick={() => setConsent(true)}
          className="mt-5 w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: form */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Athlete profile</h1>
          <p className="text-sm text-slate-600">First name only. No home address, school, or full legal name.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="First name">
            <input
              className={inputClass}
              value={profile.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder="Alex"
            />
          </Field>
          <Field label="Age">
            <input
              type="number"
              className={inputClass}
              value={profile.age}
              min={1}
              max={100}
              onChange={(e) => update("age", Number(e.target.value))}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Sport">
            <select
              className={inputClass}
              value={profile.sport}
              onChange={(e) => update("sport", e.target.value as Sport)}
            >
              {SPORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          {profile.sport === "other" ? (
            <Field label="Which sport?">
              <input
                className={inputClass}
                value={profile.sportOther || ""}
                onChange={(e) => update("sportOther", e.target.value)}
                placeholder="e.g. climbing"
              />
            </Field>
          ) : (
            <Field label="Location / market">
              <input
                className={inputClass}
                value={profile.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Austin, TX"
              />
            </Field>
          )}
        </div>

        {profile.sport === "other" ? (
          <Field label="Location / market">
            <input
              className={inputClass}
              value={profile.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Austin, TX"
            />
          </Field>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          <Field label="Total social following" hint="Across all platforms">
            <input
              type="number"
              className={inputClass}
              value={profile.socialFollowing}
              min={0}
              onChange={(e) => update("socialFollowing", Number(e.target.value))}
            />
          </Field>
          <Field label="Platforms">
            <input
              className={inputClass}
              value={profile.platforms}
              onChange={(e) => update("platforms", e.target.value)}
              placeholder="Instagram, TikTok"
            />
          </Field>
        </div>

        <Field label="Achievements & results">
          <textarea
            className={inputClass}
            rows={2}
            value={profile.achievements}
            onChange={(e) => update("achievements", e.target.value)}
            placeholder="State runner-up 2025, regional #3, 3 tournament wins…"
          />
        </Field>

        <Field label="Story — what makes them compelling?">
          <textarea
            className={inputClass}
            rows={3}
            value={profile.story}
            onChange={(e) => update("story", e.target.value)}
            placeholder="Started at 8, trains before school, mentors younger players…"
          />
        </Field>

        <Field label="Values (optional)" hint="Helps match values-aligned brands">
          <input
            className={inputClass}
            value={profile.values || ""}
            onChange={(e) => update("values", e.target.value)}
            placeholder="Healthy habits, sportsmanship, giving back"
          />
        </Field>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-700">Pitch a specific brand (optional)</p>
          <div className="mt-2 grid gap-2">
            <input
              className={inputClass}
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Brand name (for the Pitch Writer)"
            />
            <input
              className={inputClass}
              value={ask}
              onChange={(e) => setAsk(e.target.value)}
              placeholder="What to ask for (e.g. free gear + $200/post)"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={() => run("media-kit")}
            disabled={loading !== null}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {loading === "media-kit" ? "Generating…" : "📄 Media Kit"}
          </button>
          <button
            type="button"
            onClick={() => run("brand-match")}
            disabled={loading !== null}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {loading === "brand-match" ? "Matching…" : "🎯 Find Brands"}
          </button>
          <button
            type="button"
            onClick={() => run("pitch")}
            disabled={loading !== null}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {loading === "pitch" ? "Writing…" : "✉️ Write Pitch"}
          </button>
        </div>
      </div>

      {/* Right: results */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <div className="min-h-[400px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Result</h2>
            {result ? (
              <div className="flex items-center gap-2">
                {result.mode === "demo" ? (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                    demo mode
                  </span>
                ) : (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    AI
                  </span>
                )}
                <button
                  type="button"
                  onClick={copyResult}
                  className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-4">
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {!result && !error ? (
              <p className="text-sm text-slate-400">
                Fill in the profile and pick a tool. Results appear here — ready to copy and send.
              </p>
            ) : null}
            {result ? <Markdown content={result.text} /> : null}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          SponsorSpark provides educational tools, not legal, financial, or contractual advice. Review any
          agreement involving a minor with a qualified professional.
        </p>
      </div>
    </div>
  );
}
