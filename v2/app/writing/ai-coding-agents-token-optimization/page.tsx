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
        <p className={styles.access}>GitHub account, Codespaces and Copilot Agent access required. Open-source workshop; instructions are in Quick Start.</p>
      </header>

      <div className={styles.learningGrid}>
        <div className={styles.challenge}>
          <p className={styles.label}>The engineering challenge</p>
          <h2>One ordering bug. A real verification task.</h2>
          <p>Django widget Media can load an editor extension before its dependency. The <a href={workload.issue}>reported issue</a> also requires checking CSS order, deduplication, cycles and related widgets.</p>
          <figure className={styles.diagram} aria-label="Broken and correct JavaScript dependency order" data-diagram="dependency">
            <figcaption>Required: <code>editor.js</code> before <code>editor-extra.js</code></figcaption>
            <div className={styles.broken}><strong>Broken</strong><span><code>editor-extra.js</code><b aria-hidden="true">→</b><code>editor.js</code></span></div>
            <div className={styles.correct}><strong>Correct</strong><span><code>editor.js</code><b aria-hidden="true">→</b><code>editor-extra.js</code></span></div>
          </figure>
        </div>

        <div className={styles.experiment}>
          <p className={styles.label}>The controlled experiment</p>
          <h2>Same task. Two working strategies.</h2>
          <p>Both runs start from <code>{workload.instance}</code> at the <a href={workload.widgets}>pinned baseline</a>, with the same model when available and the same verification. Each has an equal five-minute target, not an enforced timeout.</p>
          <div className={styles.strategies} role="group" aria-label="Experiment A and B strategies">
            <div><strong>A · Normal</strong><p>Open-ended investigation and implementation.</p><a href={experimentA} target="_blank" rel="noopener noreferrer">Experiment A request ↗</a></div>
            <div><strong>B · Resource-aware</strong><p>Targeted search, bounded context and time for checks.</p><a href={experimentB} target="_blank" rel="noopener noreferrer">Experiment B request ↗</a></div>
          </div>
        </div>
      </div>

      <p className={styles.comparison}><strong>Compare verified outcomes</strong><span>Same baseline · Same tests · Correctness · Time · Tokens · Evidence</span><small>Compare resources only when measurements are reliable and outcomes are equivalent; B is not guaranteed to win.</small></p>
    </section>
  </article>;
}
