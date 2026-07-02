import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SponsorSpark",
};

export default function PrivacyPage() {
  return (
    <article className="prose-basic mx-auto max-w-3xl">
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Template — not legal advice.</strong> This Privacy Policy is a starting draft written with
        U.S. children&apos;s-privacy rules (including COPPA) in mind. Because SponsorSpark handles data about
        minors, you must have it reviewed and finalized by a qualified attorney before launch, and update the
        bracketed placeholders below.
      </div>

      <h1>Privacy Policy</h1>
      <p><em>Last updated: [DATE]</em></p>

      <h2>1. Who we are</h2>
      <p>
        SponsorSpark (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) provides AI tools that help families of
        junior athletes create sponsorship media kits, identify potential brand partners, and draft outreach.
        This policy explains what we collect, how we use it, and the choices you have. It applies to
        [sponsorspark.com] and related services.
      </p>

      <h2>2. Children&apos;s privacy and parental consent</h2>
      <p>
        SponsorSpark is intended to be operated by a <strong>parent or legal guardian</strong> on behalf of an
        athlete. We do not knowingly allow children under 18 to create their own accounts. When an account
        concerns a minor:
      </p>
      <ul>
        <li>The adult account holder must confirm they are the athlete&apos;s parent or legal guardian and consent to our processing of the minor&apos;s information.</li>
        <li>We practice <strong>data minimization</strong>: we ask for a first name only and discourage entry of sensitive identifiers (see Section 4).</li>
        <li>A parent/guardian may review, correct, or delete the athlete&apos;s information and revoke consent at any time (see Section 8).</li>
      </ul>
      <p>
        If you believe we have collected information from or about a child without appropriate parental
        consent, contact us at [privacy@sponsorspark.com] and we will delete it.
      </p>

      <h2>3. Information we collect</h2>
      <ul>
        <li><strong>Account information</strong> (from the adult): name, email, and authentication details.</li>
        <li><strong>Athlete profile</strong> (entered by the adult): first name, age, sport, general location/market, achievements, approximate social following, platforms, story, and optional values.</li>
        <li><strong>Content you generate</strong>: media kits, brand matches, and pitches created with our tools.</li>
        <li><strong>Usage data</strong>: basic, privacy-respecting analytics such as pages visited and features used.</li>
      </ul>

      <h2>4. Information we intentionally do NOT ask for</h2>
      <p>
        To keep the service minor-safe, we ask you <strong>not</strong> to enter a child&apos;s full legal name,
        home address, exact geolocation, school name, date of birth, or government identifiers. Please provide a
        first name (or nickname) and a general market only.
      </p>

      <h2>5. How we use information</h2>
      <ul>
        <li>To generate media kits, brand matches, and pitches you request.</li>
        <li>To operate, secure, and improve the service.</li>
        <li>To communicate with the adult account holder about the service.</li>
      </ul>
      <p>We do <strong>not</strong> sell personal information, and we do not use a child&apos;s information for behavioral advertising.</p>

      <h2>6. AI processing and third parties</h2>
      <p>
        When you generate content, the profile text you submit is sent to our AI provider ([OpenAI]) solely to
        produce your result. We choose providers that contractually agree not to train their models on data
        submitted through their API. We also use vetted service providers for hosting and, where applicable,
        payments. Each is bound by confidentiality and data-protection obligations.
      </p>

      <h2>7. Data retention</h2>
      <p>
        We keep information only as long as needed to provide the service or as required by law. You can delete
        saved athletes and generated content at any time; deletion removes it from active systems within
        [30] days, subject to routine backups.
      </p>

      <h2>8. Your choices and parental rights</h2>
      <ul>
        <li><strong>Access &amp; correction:</strong> view and edit athlete profiles in your account.</li>
        <li><strong>Deletion:</strong> delete individual athletes, generated content, or your entire account.</li>
        <li><strong>Revoke consent:</strong> stop further processing of a minor&apos;s data and request deletion.</li>
        <li><strong>Requests:</strong> email [privacy@sponsorspark.com]; we respond within the timeframe required by applicable law.</li>
      </ul>
      <p>
        Depending on where you live (e.g., California/CCPA and similar U.S. state laws), you may have additional
        rights, including the right to know, delete, and not be discriminated against for exercising your rights.
      </p>

      <h2>9. Security</h2>
      <p>
        We use reasonable administrative, technical, and physical safeguards to protect information. No system is
        perfectly secure, but we design for least-privilege access and encrypt data in transit.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>We will post changes here and update the &quot;Last updated&quot; date. Material changes affecting a minor&apos;s data will be communicated to account holders.</p>

      <h2>11. Contact</h2>
      <p>Questions or requests: [privacy@sponsorspark.com], [company legal address].</p>
    </article>
  );
}
