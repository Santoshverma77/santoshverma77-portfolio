import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CONTACT, MORE_LINKS, NAV, PERSON } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="relative mt-24 px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-background sm:px-12">
        <p className="font-mono-ui text-xs uppercase tracking-[0.25em] opacity-60">Have an idea?</p>
        <Link to="/hire" className="group font-display mt-4 flex items-end gap-4 text-5xl font-bold leading-none sm:text-7xl md:text-8xl">
          Let's build it
          <ArrowUpRight className="mb-2 h-10 w-10 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 sm:h-16 sm:w-16" />
        </Link>

        <div className="mt-14 grid gap-10 border-t border-background/15 pt-10 sm:grid-cols-3">
          <div>
            <a href={`mailto:${CONTACT.email}`} className="block text-lg underline-offset-4 hover:underline">{CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone}`} className="mt-1 block opacity-70 hover:opacity-100">{CONTACT.phoneDisplay}</a>
          </div>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {[...NAV, ...MORE_LINKS].map((n) => (
              <li key={n.to}><Link to={n.to} className="opacity-70 hover:opacity-100">{n.label}</Link></li>
            ))}
          </ul>
          <ul className="flex flex-wrap content-start gap-2">
            {CONTACT.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="block rounded-full border border-background/20 px-4 py-2 text-sm hover:bg-background hover:text-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-12 text-xs opacity-50">© {new Date().getFullYear()} {PERSON.name}. Designed & built in India.</p>
      </div>
    </footer>
  );
}
