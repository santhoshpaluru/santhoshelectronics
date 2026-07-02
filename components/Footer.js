import Link from 'next/link';
import { Cpu, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-raised">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-pcb text-paper">
              <Cpu size={17} strokeWidth={2.2} />
            </span>
            <span className="font-mono text-[13px] font-medium tracking-[0.08em] text-ink">
              P.SANTHOSH ELECTRONICS
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            Hand-built electronic project kits, from first-solder basics to weekend-sized
            intermediate builds. Designed, tested, and shipped by P. Santhosh.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
            Catalog
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/#catalog" className="text-ink/80 hover:text-pcb-dark">
                All projects
              </Link>
            </li>
            <li>
              <Link href="/#catalog" className="text-ink/80 hover:text-pcb-dark">
                Basic level
              </Link>
            </li>
            <li>
              <Link href="/#catalog" className="text-ink/80 hover:text-pcb-dark">
                Intermediate level
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-ink/80 hover:text-pcb-dark">
                My cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-ink/80">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-ink-muted" />
              Ithepalli, Andhra Pradesh – 517102, India
            </li>
            <li className="flex items-start gap-2">
              <Phone size={15} className="mt-0.5 shrink-0 text-ink-muted" />
              <span>
                +91 XXXXX XXXXX{' '}
                <span className="text-ink-muted">(add your number)</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={15} className="mt-0.5 shrink-0 text-ink-muted" />
              <span>
                your-email@example.com{' '}
                <span className="text-ink-muted">(add yours)</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-4 py-5 sm:px-6">
        <p className="mx-auto max-w-6xl font-mono text-[11px] text-ink-muted">
          © {new Date().getFullYear()} P Santhosh Electronics. All kits assembled to order.
        </p>
      </div>
    </footer>
  );
}
