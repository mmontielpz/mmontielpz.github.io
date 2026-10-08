import type { Metadata } from "next";
import Link from "next/link";
import AgentResourceLab from "./AgentResourceLab";
import TechnologyMark from "../../../components/TechnologyMark";
import { workload } from "../../../content/aica005";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Coding Agents: Engineering Learning Portal",
  description: "Prepare a resource-aware coding-agent experiment for a real Django Media issue. Understand the task, configure a workflow, and plan independent verification.",
};

const workflowStages = [
  { name: "Discover", goal: "Locate the behavior behind the report.", do: "Reproduce the ordering problem, then search Media and related symbols. Expand only when a dependency points elsewhere.", avoid: "Dumping the repository before identifying the failing path.", output: "A short map of relevant files, observed behavior, and open questions." },
  { name: "Plan", goal: "Define the change and its evidence boundary.", do: "State the dependency contract, check for an existing sorting utility, and reserve verification time.", avoid: "Assuming the first plausible file or algorithm is the whole solution.", output: "A scoped change plan and an acceptance checklist." },
  { name: "Execute", goal: "Produce a reviewable candidate patch.", do: "Edit the smallest justified surface; inspect the diff and keep a checkpoint of decisions.", avoid: "Adding an abstraction or changing unrelated behavior without evidence.", output: "A candidate diff with stated assumptions—not a success verdict." },
  { name: "Verify", goal: "Test the reported failure and connected behavior.", do: "Run the checks defined by VERIFY.md when available: JS order, CSS order, deduplication, cycles, then adjacent widgets.", avoid: "Calling one narrow passing test complete verification.", output: "Commands, results, failures, and coverage gaps." },
  { name: "Report", goal: "Make the result auditable.", do: "Summarize the diff, verification evidence, remaining risks, and resource data actually available.", avoid: "Claiming PASS from the agent's own statement or inventing token/cost values.", output: "A report that distinguishes verified facts from unknowns." },
] as const;

const practices = [
  ["Start with the reported three-widget failure.", "Read unrelated packages before locating Media."],
  ["Search relevant symbols, then inspect bounded source windows.", "Repeat broad searches without a new question."],
  ["Check for a repository utility before writing a sort routine.", "Add a new abstraction by default."],
  ["Checkpoint facts, uncertainty, and files already inspected.", "Discard the reason a dependency or risk matters."],
  ["Reserve time and context for target and adjacent checks.", "Spend the whole budget exploring and stop at a narrow pass."],
  ["Review the patch and attach commands, results, and gaps.", "Claim success from a plausible diff without execution evidence."],
] as const;

const contracts = [
  { file: "TASK.md", role: "The issue, pinned baseline, scope, and acceptance criteria." },
  { file: "AGENT.md", role: "The agent's operating rules, resource boundaries, and stopping conditions." },
  { file: "VERIFY.md", role: "The independent checks and how to record their actual outcomes." },
  { file: "REPORT.md", role: "The final evidence format, including unknown or unavailable metrics." },
] as const;

export default function Page() {
  return <article className={styles.page}>
    <header className={styles.hero}>
      <Link className={styles.back} href="/writing/">← Writing</Link>
      <p className={styles.eyebrow}>AICA005 / engineering workshop</p>
      <h1>Can an AI coding agent fix a real issue while <em>managing resources and preserving correctness?</em></h1>
      <p className={styles.lead}>Prepare one hands-on experiment around Django widget Media ordering. Follow the engineering decisions from the bug report to a verified result, then generate a policy prompt for the separate Codespaces lab.</p>
      <ol className={styles.journey} aria-label="Learning journey"><li>Understand</li><li>Configure</li><li>Execute</li><li>Verify</li><li>Learn</li></ol>
      <p className={styles.boundary}><strong>Learning portal only.</strong> This page does not run Django, GitHub Copilot, or an agent. The separate Codespaces environment is being qualified before a launch link is enabled.</p>
      <a className={`button button-primary ${styles.startLink}`} href="#challenge">Start with the challenge <span aria-hidden="true">↓</span></a>
    </header>

    <section id="challenge" className={styles.section} aria-labelledby="challenge-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>01 / ENGINEERING CHALLENGE</span><h2 id="challenge-heading">One dependency can expose a system problem.</h2><p>Django combines JavaScript and CSS assets declared by multiple widgets. In <a href={workload.issue}>issue #30179</a>, pairwise Media merging adds an order constraint that no widget declared. The editor extension may appear before the editor it needs.</p></div>
      <figure className={styles.assetDiagram} aria-labelledby="diagram-title" data-diagram="dependency">
        <figcaption id="diagram-title">Dependency ordering / three JavaScript assets</figcaption>
        <div className={styles.assetRow}><span className={styles.diagramLabel}>Declared dependency</span><div className={styles.assetFlow}><code>text-editor.js</code><span aria-hidden="true">→</span><code>text-editor-extras.js</code></div><strong>Editor loads first</strong></div>
        <div className={`${styles.assetRow} ${styles.badOrder}`}><span className={styles.diagramLabel}>Problematic merge</span><div className={styles.assetFlow}><code>text-editor-extras.js</code><span aria-hidden="true">→</span><code>color-picker.js</code><span aria-hidden="true">→</span><code>text-editor.js</code></div><strong>Breaks dependency</strong></div>
        <div className={`${styles.assetRow} ${styles.goodOrder}`}><span className={styles.diagramLabel}>One valid topological order</span><div className={styles.assetFlow}><code>text-editor.js</code><span aria-hidden="true">→</span><code>text-editor-extras.js</code><span aria-hidden="true">→</span><code>color-picker.js</code></div><strong>Preserves dependency</strong></div>
        <p><strong>Why it matters:</strong> the editor extension may load before its required editor and fail at runtime. <code>color-picker.js</code> is independent of the editor pair; its shown position adds no required dependency.</p>
      </figure>
      <div className={styles.challengeLower}>
        <div><h3>Acceptance criteria</h3><ul className={styles.criteria}><li>Preserve JavaScript dependency order.</li><li>Preserve CSS order within media groups.</li><li>Deduplicate shared assets.</li><li>Handle genuine dependency cycles.</li><li>Avoid related widget and admin regressions.</li></ul></div>
        <aside className={styles.infoCard}><h3>Why this is engineering work</h3><p>A change to one merge rule can affect several asset types and connected widgets. The agent must discover the contract, select a scoped change, and verify behavior beyond the motivating example.</p><dl><div><dt>Task</dt><dd>{workload.instance}</dd></div><div><dt>Repository</dt><dd>{workload.repository}</dd></div><div><dt>Base</dt><dd><a href={workload.widgets}>{workload.base}</a></dd></div></dl></aside>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="model-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>02 / ENGINEERING MENTAL MODEL</span><h2 id="model-heading">An agent proposal is only one link in the chain.</h2><p>The engineer defines the task and acceptance gate. The agent can inspect and edit in the future runtime; evidence from tools and independent checks determines what can be claimed.</p></div>
      <ol className={styles.systemFlow} aria-label="Engineering system" data-diagram="agent"><li><strong>Task</strong><span>Issue and baseline</span></li><li><strong>Agent</strong><span>Proposes actions</span></li><li><strong>Tools / context</strong><span>Source and observations</span></li><li><strong>Candidate patch</strong><span>Reviewable diff</span></li><li className={styles.verificationGate}><strong>Verification</strong><span>Independent checks</span></li><li><strong>Evidence</strong><span>Report and limits</span></li></ol>
      <p className={styles.flowCaption}>The candidate patch crosses a verification gate before its outcome can be reported as evidence.</p>
      <div className={styles.resourceIntro}><h3>Resource terms to keep separate</h3><p>These describe different constraints. A future Copilot session may expose only some of them.</p></div>
      <dl className={styles.glossary}><div><dt>Context window</dt><dd>Information available to one model request.</dd></div><div><dt>Input / output tokens</dt><dd>Text processed and generated for a request, when reported.</dd></div><div><dt>Cumulative usage</dt><dd>Consumption added across requests; repeated context can count again.</dd></div><div><dt>Tool calls</dt><dd>Searches, reads, edits, and checks requested during a run.</dd></div><div><dt>Execution time</dt><dd>Elapsed time for work and verification.</dd></div><div><dt>Provider quota</dt><dd>An account allowance, separate from one request or task budget.</dd></div><div><dt>Monetary cost</dt><dd>Charges only when usage and applicable rates are known.</dd></div></dl>
      <p className={styles.note}>Exact Copilot token, cache, and cost data are not assumed available. Record supported evidence and mark the rest unavailable.</p>
    </section>

    <section id="workflow" className={styles.section} aria-labelledby="workflow-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>03 / ENGINEERING WORKFLOW</span><h2 id="workflow-heading">Discover → Plan → Execute → Verify → Report</h2><p>Use these five stages as a working loop. A stage ends with an artifact or an explicit uncertainty—not merely an agent message.</p></div>
      <ol className={styles.stageList} data-diagram="workflow">{workflowStages.map((stage, index) => <li key={stage.name} className={styles.stage}><div className={styles.stageName}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage.name}</h3><p>{stage.goal}</p></div><dl><div><dt>Do</dt><dd>{stage.do}</dd></div><div><dt>Avoid</dt><dd>{stage.avoid}</dd></div><div><dt>Expected output</dt><dd>{stage.output}</dd></div></dl></li>)}</ol>
      <details className={styles.detail}><summary>Example evidence checkpoint before a patch</summary><p><strong>Known:</strong> the three-widget order fails; Media merges asset lists pairwise. <strong>Uncertain:</strong> CSS grouping and cycle fallback. <strong>Next retrieval:</strong> inspect the relevant utility or test expectation before editing. A small extra read is justified when it reduces correctness risk.</p></details>
    </section>

    <section className={styles.section} aria-labelledby="practice-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>04 / PRACTICAL HABITS</span><h2 id="practice-heading">Spend attention where it changes the decision.</h2><p>Resource discipline means choosing useful evidence and leaving enough room to verify the change.</p></div>
      <div className={styles.practiceRows}>{practices.map(([doThis, avoidThis]) => <div key={doThis} className={styles.practiceRow}><p><strong>Do</strong>{doThis}</p><p><strong>Avoid</strong>{avoidThis}</p></div>)}</div>
    </section>

    <AgentResourceLab />

    <section className={styles.section} aria-labelledby="contracts-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>06 / ENGINEERING CONTRACTS</span><h2 id="contracts-heading">Four files define the execution boundary.</h2><p>These contracts are drafted in the separate lab repository. They are not provided or executed by this website.</p></div>
      <div className={styles.contractGrid}>{contracts.map((contract) => <div key={contract.file}><code>{contract.file}</code><p>{contract.role}</p></div>)}</div>
      <p className={styles.note}>The generated prompt asks the future agent to read all four files and stop if a file, baseline, or verification command is missing.</p>
    </section>

    <section id="handoff" className={`${styles.section} ${styles.handoffSection}`} aria-labelledby="handoff-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>07 / HANDS-ON HANDOFF</span><h2 id="handoff-heading">GitHub Codespaces Laboratory</h2><p>Prepare the selected policy here. In the separate runtime, Copilot can inspect Django, propose a patch, and run tests while the engineer reviews the evidence.</p></div>
      <div className={styles.handoffGrid}><div className={styles.comingNext}><div className={styles.githubHeading}><TechnologyMark name="github" /><span>GITHUB CODESPACES / LAB QUALIFICATION</span></div><h3>Hands-on environment: Pending setup</h3><p>The Django workshop branch passes local devcontainer checks. A fresh GitHub Codespace has not yet been qualified, so the launch link remains inactive.</p><button className={styles.pendingLaunch} type="button" disabled aria-describedby="codespaces-readiness">Launch GitHub Codespaces Lab</button><p id="codespaces-readiness" className={styles.readiness}>Pending fresh Codespace qualification. You can still configure and export the prompt now.</p><div className={styles.handoffLinks}><a href="#experiment">Configure the policy ↑</a><a href="#prompt-panel">Copy or download your prompt ↑</a></div><h4>Preparation checklist</h4><ul><li>Prepared repository at the approved Django baseline</li><li>TASK.md, AGENT.md, VERIFY.md, and REPORT.md present</li><li>Verification commands checked in the runtime</li><li>Copilot Chat Agent mode available to the participant</li></ul></div><div className={styles.handoffProcess}><h3>When the runtime is ready</h3><ol className={styles.handoffSteps}><li>Open the prepared Codespaces environment.</li><li>Review the task and four contracts.</li><li>Open Copilot Chat in Agent mode, if enabled for your account.</li><li>Submit the generated prompt with your selected policy.</li><li>Review the resulting candidate patch.</li><li>Run the verification specified by the runtime contract.</li><li>Record available metrics, commands, results, and gaps.</li></ol></div></div>
      <p className={styles.note}><a href="https://docs.github.com/en/codespaces/reference/using-github-copilot-in-github-codespaces">Copilot in Codespaces</a> requires the relevant extension and access; <a href="https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide?tool=vscode">Agent mode</a> may depend on organization settings. The portal makes no promise about per-run token telemetry.</p>
    </section>

    <section id="learning-check" className={styles.section} aria-labelledby="check-heading">
      <div className={styles.sectionTitle}><span className={styles.kicker}>08 / LEARNING CHECK</span><h2 id="check-heading">Three decisions to take into the lab.</h2></div>
      <div className={styles.checks}><details><summary>Why is minimum token consumption not sufficient?</summary><p>A short, cheap path can miss CSS, cycles, or regressions. Compare resource use only alongside independently checked outcomes.</p></details><details><summary>When should an agent retrieve additional context?</summary><p>When a missing dependency, contract, diagnostic, or test expectation could change the patch or verdict. Record why the extra read matters.</p></details><details><summary>What evidence is required before claiming PASS?</summary><p>A reviewable diff, the relevant executed checks and their results, adjacent regression coverage, and an honest account of failures or unavailable evidence.</p></details></div>
      <p className={styles.endnote}>This free educational portal is separate from paid client engagements. The Django task is real; the runtime and any measured agent outcome belong to a future slice.</p>
    </section>
  </article>;
}
