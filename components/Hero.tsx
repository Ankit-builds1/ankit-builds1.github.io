import { ArrowDown, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { profile } from "@/lib/data";
import { quotes } from "@/lib/quotes";

export default function Hero() {
  const quote = quotes[0];

  return (
    <section id="top" className="min-h-[100svh] border-b border-border">
      <div className="mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-14 px-6 pb-20 pt-32 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)] lg:gap-20 lg:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow flex flex-wrap items-center gap-2 text-signal">
            <MapPin size={13} aria-hidden />
            {profile.location}
            <span aria-hidden>·</span>
            <span>Open to opportunities</span>
          </p>

          <h1 className="mt-8 font-display text-[clamp(4rem,10vw,7.75rem)] font-semibold leading-[0.82] tracking-[-0.055em]">
            <span className="mb-3 block font-mono text-[0.11em] font-medium uppercase tracking-[0.2em] text-fg-muted">
              Hi, I&apos;m
            </span>
            {profile.name}
            <span className="text-accent">.</span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl text-fg-muted sm:text-2xl">
            <span>I work across</span>
            {profile.roles.map((role, index) => (
              <span key={role} className="flex items-center gap-3 font-semibold text-fg">
                {index > 0 ? <span className="text-accent">/</span> : null}
                {role}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-[65ch] text-base leading-8 text-fg-muted sm:text-lg">
            {profile.bio}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-[2px] border border-accent bg-accent px-5 py-3 text-sm font-semibold text-bg no-underline transition-colors hover:bg-transparent hover:text-accent"
            >
              View projects
              <ArrowDown size={15} aria-hidden />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
                "Hi Ankit — let's talk"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link py-2 text-sm font-semibold"
            >
              <Mail size={15} aria-hidden />
              Get in touch
            </a>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-[25rem] lg:mx-0 lg:justify-self-end">
          <div className="profile-photo-card">
            <Image
              src="/me.jpg"
              alt={`${profile.name} in Bhubaneswar`}
              fill
              priority
              sizes="(min-width: 1024px) 25rem, (min-width: 640px) 60vw, 92vw"
              className="object-cover object-[center_20%]"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between gap-4 border-b border-border pb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-subtle">
            <span>Portrait / 2026</span>
            <span>Bhubaneswar, IN</span>
          </figcaption>

          <blockquote className="mt-8 border-l border-accent pl-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              A line I keep close
            </p>
            <p className="mt-3 font-display text-xl leading-snug text-fg">
              “{quote.text}”
            </p>
            {quote.author ? (
              <cite className="mt-3 block font-mono text-[11px] not-italic tracking-[0.04em] text-fg-muted">
                — {quote.author}
              </cite>
            ) : null}
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
