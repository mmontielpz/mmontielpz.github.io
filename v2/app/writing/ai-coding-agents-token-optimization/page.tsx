import type { Metadata } from "next";
import Link from "next/link";
import TokenComparison from "./TokenComparison";
import TechnologyMark from "../../../components/TechnologyMark";
import { workload } from "../../../content/aica005";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Coding Agents: Resource-Aware Engineering Workshop",
  description: "Compare two coding-agent workflows on one real Django issue. Launch the public lab, verify both outcomes, and measure only what is observable.",
};

const lab = "https://github.com/mmontielpz/aica005-django-agent-workshop";
const launch = "https://codespaces.new/mmontielpz/aica005-django-agent-workshop/tree/main";

export default function Page() {
  return <article className={styles.page}>
    <header className={styles.hero}>
      <Link className={styles.back} href="/writing/">← Writing</Link>
      <p className={styles.eyebrow}>AICA005 / engineering workshop</p>
      <h1>Can an AI coding agent solve a real issue <em>with fewer resources and a verified outcome?</em></h1>
      <p className={styles.lead}>Compare a normal agent workflow with a resource-aware one on the same Django task. Learn to optimize engineering outcomes, not merely token counts.</p>
      <ol className={styles.journey} aria-label="Learning journey"><li>Understand</li><li>Experiment</li><li>Launch</li><li>Compare</li><li>Learn</li></ol>
      <p className={styles.boundary}><strong>Efficiency = verified task outcome / resources consumed.</strong> This page teaches the experiment; GitHub Codespaces runs the actual lab. No agent runs or token measurements are performed here.</p>
      <a className={"button button-primary " + styles.startLink} href={launch} target="_blank" rel="noopener noreferrer">Launch GitHub Codespaces Lab <span aria-hidden="true">↗</span></a>
      <p className={styles.note}><a href={lab + "/blob/main/PARTICIPANT_QUICK_START.md"} target="_blank" rel="noopener noreferrer">Participant Quick Start ↗</a> · <a href="#challenge">Understand the challenge first ↓</a></p>
    </header>

    <section id="challenge" className={styles.section} aria-labelledby="challenge-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>01 / THE CHALLENGE</span><h2 id="challenge-heading">One small bug, several correctness checks.</h2><p>Django combines files needed by page widgets. In <a href={workload.issue}>issue #30179</a>, merging those lists can put an editor extension before the editor it depends on. An agent must investigate, propose a change, and check that related behavior still works.</p></div>
      <figure className={styles.assetDiagram} aria-labelledby="diagram-title" data-diagram="dependency">
        <figcaption id="diagram-title">A JavaScript dependency that must survive merging</figcaption>
        <div className={styles.assetRow}><span className={styles.diagramLabel}>Required order</span><div className={styles.assetFlow}><code>text-editor.js</code><span aria-hidden="true">→</span><code>text-editor-extras.js</code></div><strong>Editor loads first</strong></div>
        <div className={styles.assetRow + " " + styles.badOrder}><span className={styles.diagramLabel}>Buggy merge</span><div className={styles.assetFlow}><code>text-editor-extras.js</code><span aria-hidden="true">→</span><code>color-picker.js</code><span aria-hidden="true">→</span><code>text-editor.js</code></div><strong>Breaks dependency</strong></div>
        <div className={styles.assetRow + " " + styles.goodOrder}><span className={styles.diagramLabel}>One valid order</span><div className={styles.assetFlow}><code>text-editor.js</code><span aria-hidden="true">→</span><code>text-editor-extras.js</code><span aria-hidden="true">→</span><code>color-picker.js</code></div><strong>Preserves dependency</strong></div>
        <p>The color picker is independent of the editor pair; only the editor-before-extension relationship is required in this example.</p>
      </figure>
      <div className={styles.challengeLower}>
        <div><h3>Independent acceptance checks</h3><ul className={styles.criteria}><li>JavaScript dependency order</li><li>CSS ordering</li><li>Shared-asset deduplication</li><li>Cycle handling</li><li>Related widget and admin behavior</li></ul></div>
        <aside className={styles.infoCard}><h3>Real workload</h3><p>Both experiments use one reproducible task. The workshop teaches agent engineering; Django is the test workload.</p><dl><div><dt>Task</dt><dd>{workload.instance}</dd></div><div><dt>Repository</dt><dd>{workload.repository}</dd></div><div><dt>Base</dt><dd><a href={workload.widgets}>{workload.base}</a></dd></div></dl></aside>
      </div>
    </section>

    <section id="experiment" className={styles.section} aria-labelledby="experiment-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>02 / THE EXPERIMENT</span><h2 id="experiment-heading">Change the strategy, keep the task constant.</h2><p>Run the fixed <a href={lab + "/blob/main/experiments/A-unstructured.md"}>Experiment A request</a>, save evidence, reset to the pinned baseline, then run the fixed <a href={lab + "/blob/main/experiments/B-resource-aware.md"}>Experiment B request</a>. Neither strategy is guaranteed to win.</p></div>
      <div className={styles.abDiagram} role="group" aria-label="Controlled A and B experiment">
        <p><strong>Same starting conditions</strong><span>Task, Django commit, model, Agent mode, runtime, limits, and verification criteria</span></p>
        <div><p><strong>A · Normal workflow</strong><span>Open-ended engineering request; the agent chooses its exploration path.</span></p><p><strong>B · Resource-aware workflow</strong><span>Targeted search, bounded inspection, evidence checkpoints, and reserved verification.</span></p></div>
        <p><strong>Same independent gate</strong><span>Review each patch and run the issue, media, and admin checks before comparing resources.</span></p>
      </div>
      <ol className={styles.systemFlow} aria-label="Engineering system" data-diagram="agent"><li><strong>Task</strong><span>Same issue</span></li><li><strong>Agent</strong><span>Chooses actions</span></li><li><strong>Tools / context</strong><span>Reads and edits</span></li><li><strong>Candidate patch</strong><span>Reviewable diff</span></li><li className={styles.verificationGate}><strong>Verification</strong><span>Independent checks</span></li><li><strong>Evidence</strong><span>Results and limits</span></li></ol>
      <p className={styles.flowCaption}>Context is information available to one model request. Tokens, tool calls, and elapsed time measure different resources. Record each only when observable; Copilot may not report exact tokens.</p>
      <details className={styles.detail}><summary>One useful resource decision</summary><p>Search relevant symbols before reading whole files. Retrieve more context when a missing dependency, test expectation, or cycle behavior could change the patch. Reserve time for verification instead of spending the whole run exploring.</p></details>
    </section>

    <section id="launch" className={styles.section + " " + styles.handoffSection} aria-labelledby="launch-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>03 / LAUNCH CODESPACES</span><h2 id="launch-heading">Run the workshop in the public laboratory.</h2><p>GitHub sign-in, Codespaces access, and Copilot Agent access may be required. The repository is public; a fresh Codespace at this publication commit has not yet been independently qualified.</p></div>
      <div className={styles.handoffGrid}>
        <div className={styles.comingNext}><div className={styles.githubHeading}><TechnologyMark name="github" /><span>GITHUB CODESPACES / DJANGO LAB</span></div><h3>Public lab</h3><a className={styles.launchLink} href={launch} target="_blank" rel="noopener noreferrer">Launch GitHub Codespaces Lab <span aria-hidden="true">↗</span></a><p className={styles.readiness}>Wait for <strong>LAB READY</strong> before starting. If readiness reports unexpected failures, stop and record them.</p><p>Use the <a href={lab + "/blob/main/README.md"}>public lab README</a> for commands, evidence export, and the task contracts.</p></div>
        <div className={styles.handoffProcess}><h3>Participant checklist</h3><ol className={styles.handoffSteps}><li>Launch a fresh Codespace.</li><li>Wait for LAB READY and confirm the pinned baseline.</li><li>Open Copilot Chat in Agent mode.</li><li>Run A, verify the patch, and export evidence.</li><li>Reset the baseline.</li><li>Run B under the same conditions and export evidence.</li><li>Compare verified outcomes and available resource measurements.</li></ol></div>
      </div>
    </section>

    <TokenComparison />

    <section id="learn" className={styles.section} aria-labelledby="learn-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>05 / KEY TAKEAWAYS</span><h2 id="learn-heading">Decide from evidence, not from a smaller number.</h2></div>
      <div className={styles.checks}><details><summary>Why are fewer tokens insufficient without verification?</summary><p>A run can consume less while missing CSS, cycles, or regressions. Compare resources only alongside equivalent verified outcomes.</p></details><details><summary>When should an agent retrieve more context?</summary><p>When a missing dependency, contract, diagnostic, or test expectation could change its patch or verdict. Record why the extra read matters.</p></details><details><summary>What evidence supports a PASS decision?</summary><p>A reviewable diff, executed checks and results, adjacent regression coverage, and a clear account of failures or unavailable evidence.</p></details></div>
      <p className={styles.endnote}><strong>Optimize the workflow, measure what is observable, and verify the outcome.</strong> This free educational workshop is separate from paid client engagements. No A/B performance result has been established here.</p>
    </section>
  </article>;
}
