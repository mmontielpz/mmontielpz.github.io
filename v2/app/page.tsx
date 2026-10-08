import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "From AI Strategy to Execution | Miguel López, Ph.D." },
};

export default function Page() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-eyebrow">AI Engineering · Applied Science · Research</p>
        <h1 id="hero-title">
          From AI Strategy{" "}<br />
          to <span>Execution.</span>
        </h1>
        <p className="hero-introduction">
          I’m <strong>Miguel López, Ph.D.</strong>, an AI Engineering Leader,
          Applied Scientist, and Researcher.
        </p>
        <p className="hero-value">
          I research emerging AI technologies and build systems that put them to work.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/work/">
            Explore My Work <span aria-hidden="true">↗</span>
          </Link>
          <Link className="button button-secondary" href="/contact/">
            Let’s Connect <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="hero-profiles" aria-label="Professional profiles">
          <li><a href="https://github.com/mmontielpz">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/miguel-angel-lopez-montiel/">LinkedIn</a></li>
          <li><a href="https://orcid.org/0000-0001-5367-9801">ORCID</a></li>
        </ul>
      </div>
      <div className="hero-trajectory" aria-hidden="true">
        <svg viewBox="0 0 440 440" fill="none" focusable="false">
          <defs>
            <pattern id="trajectory-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M44 0H0V44" stroke="currentColor" strokeOpacity=".1" />
            </pattern>
          </defs>
          <rect x="22" y="22" width="396" height="396" fill="url(#trajectory-grid)" />
          <path d="M22 220H418M220 22V418" stroke="currentColor" strokeOpacity=".16" />
          <path d="M44 44H68M44 44V68M372 396H396V372" stroke="currentColor" strokeOpacity=".45" />
          <path d="M88 330V242H176V198H286V110H352" className="trajectory-path" />
          <path d="M88 330L176 242L286 198L352 110" stroke="currentColor" strokeOpacity=".16" strokeDasharray="3 7" />
          {[ [88, 330], [176, 242], [286, 198], [352, 110] ].map(([x, y]) => (
            <g key={x}>
              <circle cx={x} cy={y} r="12" className="trajectory-ring" />
              <circle cx={x} cy={y} r="3" className="trajectory-node" />
            </g>
          ))}
          <g className="trajectory-labels">
            <text x="108" y="354">Research</text>
            <text x="196" y="266">Apply</text>
            <text x="306" y="222">Build</text>
            <text x="352" y="86" textAnchor="middle">Lead</text>
          </g>
        </svg>
      </div>
    </section>
  );
}
