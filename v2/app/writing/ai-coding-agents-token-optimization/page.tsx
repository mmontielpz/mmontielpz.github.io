import type { Metadata } from "next";
import Link from "next/link";
import { workload } from "../../../content/aica005";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Coding Agents: Resource-Aware Engineering Workshop",
  description: "Compare two coding-agent strategies on one real Django issue, then launch the public Codespaces lab.",
};

const lab = "https://github.com/mmontielpz/aica005-django-agent-workshop";
const launch = "https://codespaces.new/mmontielpz/aica005-django-agent-workshop/tree/main";
const quickStart = lab + "/blob/main/PARTICIPANT_QUICK_START.md";
const experimentA = lab + "/blob/main/experiments/A-unstructured.md";
const experimentB = lab + "/blob/main/experiments/B-resource-aware.md";

export default function Page() {
  return <article className={styles.page}>
    <Link className={styles.back} href="/writing/">← Writing</Link>
    <section className={styles.workshop} aria-labelledby="workshop-title">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>AICA005 / 60-minute engineering workshop</p>
        <h1 id="workshop-title">AI Coding Agents: <em>Resource-Aware Engineering</em></h1>
        <p className={styles.lead}>Explore how an AI coding agent can solve a real task while managing resources and preserving a verified outcome.</p>
        <div className={styles.actions}>
          <a className={"button button-primary " + styles.launch} href={launch} target="_blank" rel="noopener noreferrer">Launch Lab <span aria-hidden="true">↗</span></a>
          <a className={styles.quickStart} href={quickStart} target="_blank" rel="noopener noreferrer">Quick Start <span aria-hidden="true">↗</span></a>
        </div>
        <p className={styles.access}>GitHub account, Codespaces and Copilot Agent access required.</p>
      </header>

      <div className={styles.learningGrid}>
        <div className={styles.challenge}>
          <p className={styles.label}>The engineering challenge</p>
          <h2>Django Media ordering</h2>
          <p>The <a href={workload.issue}>reported issue</a> can load an extension before its dependency; the fix must also preserve CSS order, deduplication and related widgets.</p>
          <figure className={styles.diagram} aria-label="Broken and correct JavaScript dependency order" data-diagram="dependency">
            <figcaption>Required: <code>editor.js</code> before <code>editor-extra.js</code></figcaption>
            <div className={styles.broken}><strong>Broken</strong><span><code>editor-extra.js</code><b aria-hidden="true">→</b><code>editor.js</code></span></div>
            <div className={styles.correct}><strong>Correct</strong><span><code>editor.js</code><b aria-hidden="true">→</b><code>editor-extra.js</code></span></div>
          </figure>
        </div>

        <div className={styles.experiment}>
          <p className={styles.label}>The controlled experiment</p>
          <h2>Experiment A / Experiment B</h2>
          <p>Both use <code>{workload.instance}</code>, the <a href={workload.widgets}>same baseline</a>, model when available, and verification.</p>
          <div className={styles.strategies} role="group" aria-label="Experiment A and B strategies">
            <div><strong>A · Normal</strong><p>Open-ended investigation and implementation.</p><a href={experimentA} target="_blank" rel="noopener noreferrer">Experiment A request ↗</a></div>
            <div><strong>B · Resource-aware</strong><p>Targeted search, bounded context and time for checks.</p><a href={experimentB} target="_blank" rel="noopener noreferrer">Experiment B request ↗</a></div>
          </div>
        </div>
      </div>

      <p className={styles.comparison}><strong>Verify &amp; Compare</strong><span>Same baseline · Same tests · Correctness · Time · Measured tokens · Evidence</span></p>
    </section>
  </article>;
}
