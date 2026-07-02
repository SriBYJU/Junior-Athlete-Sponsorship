import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SponsorSpark — AI Sponsorship Copilot for Junior Athletes",
  description:
    "SponsorSpark helps families of junior athletes build media kits, find the right brands, and write winning sponsorship pitches — with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
              <span className="text-xl">🏅</span>
              <span>SponsorSpark</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <Link href="/#how" className="hover:text-slate-900">How it works</Link>
              <Link href="/copilot" className="rounded-md bg-brand-600 px-3 py-1.5 text-white hover:bg-brand-700">
                Open the Copilot
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} SponsorSpark. Built for young athletes and their families.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-slate-800">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-800">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
