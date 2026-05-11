import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-fg-subtle">
          © {year} {profile.name} — built with Next.js, Tailwind & Framer Motion.
        </p>
        <p className="text-xs text-fg-subtle">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-fg transition-colors"
          >
            {profile.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
