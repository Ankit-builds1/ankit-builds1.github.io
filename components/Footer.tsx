import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-7">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Built with Next.js &amp; Tailwind</span>
          <span>{profile.location}</span>
          <a className="transition-colors hover:text-accent" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
