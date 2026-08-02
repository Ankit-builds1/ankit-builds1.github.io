import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import SectionHeading from "./SectionHeading";

const socials = [
  {
    label: "Email",
    icon: Mail,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
      "Hi Ankit — let's talk"
    )}`,
    value: profile.email,
  },
  {
    label: "GitHub",
    icon: GitHubIcon,
    href: profile.github,
    value: "@Ankit-builds1",
  },
  {
    label: "LinkedIn",
    icon: LinkedInIcon,
    href: profile.linkedin,
    value: "ankitdash-edu",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-b border-border">
      <div className="section-wrap">
        <SectionHeading number="06" title="Get in touch" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)] lg:items-end">
          <p className="max-w-4xl font-display text-[clamp(2.2rem,5.8vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg">
            Got a <span className="text-accent">hard ML problem</span>, an
            interesting role, or just want to talk agentic systems and
            biomedical signals?{" "}
            <span className="text-fg-muted">My inbox is wide open.</span>
          </p>

          <div className="border-t border-border-strong">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1.5rem_minmax(0,1fr)_1rem] items-center gap-3 border-b border-border py-4 no-underline transition-colors hover:text-accent"
                >
                  <Icon size={16} aria-hidden />
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">
                      {social.label}
                    </span>
                    <span className="mt-1 block break-all text-sm font-semibold sm:break-normal">
                      {social.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-fg-subtle transition-colors group-hover:text-accent"
                    aria-hidden
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
