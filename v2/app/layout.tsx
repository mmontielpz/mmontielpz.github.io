import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Miguel López, Ph.D.",
    template: "%s | Miguel López, Ph.D.",
  },
  description:
    "From AI Strategy to Execution. AI Engineering Leader · Applied Scientist · Researcher.",
  authors: [{ name: "Miguel López, Ph.D." }],
};

const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work/" },
  { label: "Research", href: "/research/" },
  { label: "Writing", href: "/writing/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header">
          <Link className="site-name" href="/">Miguel López, Ph.D.</Link>
          <nav aria-label="Main navigation">
            <ul>
              {navigation.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <small>Miguel López, Ph.D.</small>
        </footer>
      </body>
    </html>
  );
}
