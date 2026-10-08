import type { Metadata } from "next";
import Link from "next/link";
import TechnologyMark from "../../../components/TechnologyMark";
import { workload } from "../../../content/aica005";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Coding Agents: Resource-Aware Engineering Workshop",
  description: "Explore two coding-agent workflows on one real Django issue, then launch the public Codespaces lab.",
};

const lab = "https://github.com/mmontielpz/aica005-django-agent-workshop";
const launch = "https://codespaces.new/mmontielpz/aica005-django-agent-workshop/tree/main";
const quickStart = lab + "/blob/main/PARTICIPANT_QUICK_START.md";
const experimentA = lab + "/blob/main/experiments/A-unstructured.md";
const experimentB = lab + "/blob/main/experiments/B-resource-aware.md";

export default function Page() {
  return <article className={styles.page}>
    <header className={styles.hero}>
      <Link className={styles.back} href="/writing/">← Writing</Link>
      <p className={styles.eyebrow}>AICA005 / 60-minute engineering workshop</p>
      <h1>AI Coding Agents: <em>Resource-Aware Engineering</em></h1>
      <p className={styles.lead}>Can an agent solve a real coding task while managing its resources and preserving a verified outcome?</p>
      <p className={styles.boundary}><strong>Efficiency = Verified Task Outcome / Resources Consumed.</strong> Compare resources only alongside equivalent verified outcomes and reliable measurements.</p>
      <div className={styles.entryActions}>
        <a className={"button button-primary " + styles.startLink} href={launch} target="_blank" rel="noopener noreferrer">Launch Lab <span aria-hidden="true">↗</span></a>
        <a className={styles.secondaryLink} href={quickStart} target="_blank" rel="noopener noreferrer">Quick Start Guide <span aria-hidden="true">↗</span></a>
        <a className={styles.supportLink} href={lab} target="_blank" rel="noopener noreferrer">View Repository <span aria-hidden="true">↗</span></a>
      </div>
      <p className={styles.note}>Hands-on participation requires a GitHub account, Codespaces access, and Copilot Agent access. <a href="#challenge">See the challenge ↓</a></p>
    </header>

    <section id="challenge" className={styles.section} aria-labelledby="challenge-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>01 / THE CHALLENGE</span><h2 id="challenge-heading">One dependency-ordering bug.</h2><p>Django widget Media merges JavaScript and CSS assets. In <a href={workload.issue}>issue #30179</a>, a merge can load an editor extension before the editor it needs. A valid fix must also respect CSS ordering, deduplication, cycles, and related widgets.</p></div>
      <figure className={styles.assetDiagram} aria-labelledby="diagram-title" data-diagram="dependency">
        <figcaption id="diagram-title">The editor must load before its extension</figcaption>
        <div className={styles.assetRow + " " + styles.badOrder}><span className={styles.diagramLabel}>Broken merge</span><div className={styles.assetFlow}><code>editor-extra.js</code><span aria-hidden="true">→</span><code>editor.js</code></div><strong>Dependency broken</strong></div>
        <div className={styles.assetRow + " " + styles.goodOrder}><span className={styles.diagramLabel}>Correct order</span><div className={styles.assetFlow}><code>editor.js</code><span aria-hidden="true">→</span><code>editor-extra.js</code></div><strong>Dependency preserved</strong></div>
        <p>Real workload: <code>{workload.instance}</code> at the <a href={workload.widgets}>pinned Django baseline</a>. The diagram simplifies one ordering constraint; the lab checks the wider behavior.</p>
      </figure>
    </section>

    <section id="experiment" className={styles.section} aria-labelledby="experiment-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>02 / THE EXPERIMENT</span><h2 id="experiment-heading">Same task. Two working strategies.</h2><p>A and B share the Django baseline, model when available, runtime, and verification. Each has the same five-minute target after preflight; it is a policy, not an enforced timeout.</p></div>
      <div className={styles.abDiagram} role="group" aria-label="Controlled A and B experiment">
        <div><p><strong>A · Normal workflow</strong><span>Open-ended investigation and implementation. <a href={experimentA} target="_blank" rel="noopener noreferrer">Read the fixed A request ↗</a></span></p><p><strong>B · Resource-aware</strong><span>Targeted search, bounded context, and time reserved for checks. <a href={experimentB} target="_blank" rel="noopener noreferrer">Read the fixed B request ↗</a></span></p></div>
        <p><strong>Same verification gate</strong><span>Review each patch and executed issue, media, and admin checks before interpreting resource use.</span></p>
      </div>
      <div className={styles.comparisonGrid} aria-label="Comparison dimensions">
        <div><strong>Correctness</strong><span>Which required checks passed?</span></div>
        <div><strong>Time</strong><span>What elapsed time was observed?</span></div>
        <div><strong>Tokens</strong><span>Are comparable provider totals available?</span></div>
        <div><strong>Evidence</strong><span>Can the patch and logs be reviewed?</span></div>
      </div>
      <p className={styles.flowCaption}>Unavailable telemetry stays <strong>NOT_AVAILABLE</strong>. Fewer tokens alone do not establish a better solution, and B is not guaranteed to win.</p>
    </section>

    <section id="lab" className={styles.section + " " + styles.handoffSection} aria-labelledby="lab-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>03 / HANDS-ON LAB</span><h2 id="lab-heading">Take the experiment into Codespaces.</h2><p>Codespaces prepares the environment. Copilot Agent runs the fixed requests and scripts; you review the evidence and make the engineering decision.</p></div>
      <ol className={styles.systemFlow} aria-label="Lab workflow" data-diagram="lab"><li><strong>Launch</strong><span>Wait for LAB READY</span></li><li><strong>A</strong><span>Fresh chat; export evidence A</span></li><li><strong>B</strong><span>Fresh chat; reset and export B</span></li><li><strong>Compare</strong><span>Check outcomes and available resources</span></li><li><strong>Cleanup</strong><span>Export, then delete the Codespace</span></li></ol>
      <div className={styles.labHandoff}><div className={styles.githubHeading}><TechnologyMark name="github" /><span>PUBLIC GITHUB CODESPACES LAB</span></div><a className={styles.launchLink} href={launch} target="_blank" rel="noopener noreferrer">Launch Lab <span aria-hidden="true">↗</span></a><p>Use the <a href={quickStart} target="_blank" rel="noopener noreferrer">Quick Start Guide</a> for exact steps. This page does not run agents or collect telemetry; the open-source workshop is separate from paid client work.</p></div>
    </section>
  </article>;
}
