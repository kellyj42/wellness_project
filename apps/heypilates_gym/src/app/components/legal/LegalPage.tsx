import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

type LegalSection = {
  title: string;
  body: string[];
  bullets?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-brand-cream/40 to-white">
      <section className="relative overflow-hidden border-b border-brand-sageLight/60 bg-brand-cream/50 pt-28 pb-16">
        <div className="absolute -top-16 right-0 h-56 w-56 rounded-full bg-brand-sageLight/70 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-brand-sage/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-sageDark transition hover:text-brand-sage"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-8 rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-sageLight px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
              <ShieldCheck className="h-4 w-4" />
              {eyebrow}
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-charcoal sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-brand-muted sm:text-lg">
              {intro}
            </p>
            <p className="mt-6 text-sm font-medium text-brand-sageDark">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="space-y-8">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[28px] border border-brand-sageLight/70 bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-brand-charcoal">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-brand-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-5 space-y-3 text-base leading-7 text-brand-muted">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-sageDark" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
