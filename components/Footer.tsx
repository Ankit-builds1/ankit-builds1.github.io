import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-10 sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-end">
          <span>Built with Next.js &amp; Tailwind</span>
          <span>{profile.location}</span>
          <a
            className="underline decoration-border-strong transition-colors hover:text-accent"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
