import Link from "next/link";

function Feature({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-2xl">{emoji}</div>
      <h3 className="mt-2 font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-600 font-bold text-white">
        {n}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{body}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="grid items-center gap-10 pt-6 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            AI sponsorship copilot for junior athletes
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Turn young talent into real{" "}
            <span className="text-brand-600">sponsorships</span>.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Brands are sponsoring junior athletes in fast-growing sports — pickleball, esports, golf,
            gymnastics, wrestling — because they&apos;re authentic and build loyalty early. Most families
            have no idea it&apos;s even possible. SponsorSpark shows you how, and does the hard parts for you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/copilot"
              className="rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Open the Copilot →
            </Link>
            <Link
              href="/#how"
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              See how it works
            </Link>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Parent/guardian-operated. Built for families of athletes under 18.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
          <p className="text-sm font-semibold text-slate-500">Sample media kit</p>
          <div className="mt-3 space-y-3">
            <div className="h-4 w-2/3 rounded bg-brand-200" />
            <div className="h-3 w-full rounded bg-slate-100" />
            <div className="h-3 w-5/6 rounded bg-slate-100" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-brand-50 p-3 text-center">
                <div className="text-lg font-bold text-brand-700">12k</div>
                <div className="text-[10px] text-slate-500">followers</div>
              </div>
              <div className="rounded-lg bg-brand-50 p-3 text-center">
                <div className="text-lg font-bold text-brand-700">#3</div>
                <div className="text-[10px] text-slate-500">regional</div>
              </div>
              <div className="rounded-lg bg-brand-50 p-3 text-center">
                <div className="text-lg font-bold text-brand-700">6.2%</div>
                <div className="text-[10px] text-slate-500">engagement</div>
              </div>
            </div>
            <div className="h-3 w-full rounded bg-slate-100" />
            <div className="h-3 w-4/5 rounded bg-slate-100" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900">Everything you need to land a deal</h2>
        <p className="mt-1 text-slate-600">Three AI tools that do the work most families don&apos;t know how to start.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Feature
            emoji="📄"
            title="AI Media Kit Builder"
            body="Turn stats, socials, and story into a polished one-page kit brands take seriously."
          />
          <Feature
            emoji="🎯"
            title="Brand Matcher"
            body="Get sport-aware suggestions for which brands to approach — and the exact angle that works."
          />
          <Feature
            emoji="✉️"
            title="Pitch Writer"
            body="Generate warm, specific outreach emails with clear deliverables and a low-friction ask."
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how">
        <h2 className="text-2xl font-bold text-slate-900">How it works</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Step n={1} title="Confirm you're the parent/guardian" body="Accounts for athletes under 18 are operated by an adult. We keep it minor-safe by design." />
          <Step n={2} title="Add the athlete's profile" body="Sport, results, reach, and story — first name only, no sensitive details." />
          <Step n={3} title="Generate your toolkit" body="Media kit, brand matches, and a ready-to-send pitch in seconds." />
          <Step n={4} title="Reach out and track deals" body="Send pitches, land partnerships, and (soon) get matched with brands directly." />
        </div>
      </section>

      {/* Pricing tease */}
      <section className="rounded-2xl bg-slate-900 px-6 py-10 text-white">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Start free. Upgrade when it pays off.</h2>
            <p className="mt-2 text-slate-300">
              Try the copilot free. Paid plans unlock unlimited generations, saved athletes, and (coming
              soon) a marketplace that matches you with brands directly.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link
              href="/copilot"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100"
            >
              Try it now — free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
