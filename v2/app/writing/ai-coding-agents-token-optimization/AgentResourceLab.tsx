"use client";

import { useEffect, useRef, useState } from "react";
import { workload } from "../../../content/aica005";
import styles from "./page.module.css";

type Configuration = {
  context: "targeted" | "broad";
  exploration: "bounded" | "open";
  verification: "regression" | "focused";
};

const defaultConfig: Configuration = { context: "targeted", exploration: "bounded", verification: "regression" };
const storageKey = "aica005-learning-portal-policy-v2";

function isConfiguration(value: unknown): value is Configuration {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (candidate.context === "targeted" || candidate.context === "broad")
    && (candidate.exploration === "bounded" || candidate.exploration === "open")
    && (candidate.verification === "regression" || candidate.verification === "focused");
}

const contextOptions = {
  targeted: {
    label: "Targeted",
    instruction: "Start at the reported Media behavior. Search relevant symbols and paths, inspect bounded source windows, and expand when an unresolved dependency requires it.",
    tradeoff: "Reduces irrelevant material, but a missed dependency may require another read.",
  },
  broad: {
    label: "Broad",
    instruction: "Survey relevant forms, widget, and adjacent admin paths before narrowing. Explain why each wider read helps resolve the issue.",
    tradeoff: "May reveal distant behavior sooner, but can increase tool output and attention spent.",
  },
} as const;

const explorationOptions = {
  bounded: {
    label: "Bounded",
    instruction: "Set a working scope, checkpoint known facts and uncertainty, and request more context deliberately. Preserve room for verification.",
    tradeoff: "Makes expansion deliberate, but overly tight bounds may delay needed evidence.",
  },
  open: {
    label: "Open",
    instruction: "Allow wider exploration as needed. Record why each expansion matters and checkpoint before repeating an inspection.",
    tradeoff: "Allows flexible investigation, but resource use may grow without a checkpoint.",
  },
} as const;

const verificationOptions = {
  regression: {
    label: "Focused + regression",
    instruction: "Run the focused checks specified by VERIFY.md, then the adjacent widget and admin checks it defines. Record commands, results, and remaining gaps.",
    tradeoff: "Provides broader correctness evidence, while requiring more execution time and tool work.",
  },
  focused: {
    label: "Focused only",
    instruction: "Run only the focused checks specified by VERIFY.md. Mark the result PARTIAL until adjacent CSS, cycle, widget, and admin risks are checked; do not claim task-level PASS.",
    tradeoff: "Uses a narrower check scope, so the overall engineering outcome remains unverified.",
  },
} as const;

function buildPrompt(config: Configuration): string {
  return `AICA005 engineering experiment — ${workload.instance}

In GitHub Copilot Chat Agent mode, use the prepared Codespaces execution repository only after confirming its checkout is at ${workload.base}. Original issue: ${workload.issue}

Before editing, read TASK.md, AGENT.md, VERIFY.md, and REPORT.md in that repository. These are planned runtime contracts, not files supplied by this learning portal. If any contract, baseline, or required verification command is missing, stop and report the gap rather than improvising.

Objective: Correct Django widget Media composition so declared JavaScript and CSS dependencies are preserved, shared assets are deduplicated, real cycles are handled, and related widgets do not regress. Do not consult an upstream reference patch while producing the candidate.

Selected instructional policy:
- Context strategy — ${contextOptions[config.context].label}: ${contextOptions[config.context].instruction}
- Exploration policy — ${explorationOptions[config.exploration].label}: ${explorationOptions[config.exploration].instruction}
- Verification policy — ${verificationOptions[config.verification].label}: ${verificationOptions[config.verification].instruction}

Work through Discover → Plan → Execute → Verify → Report. Produce a reviewable diff. Use VERIFY.md for actual commands and acceptance checks; do not assume a command or test exists until confirmed in the runtime repository. Follow REPORT.md for the final evidence record.

Report the executed checks and their outputs, unresolved risks, and resource observations that are actually available (such as tool actions and elapsed time). Mark exact tokens, provider quota, or monetary cost UNAVAILABLE when unsupported. Never claim PASS solely from a plausible patch or a narrow test.`;
}

export default function AgentResourceLab() {
  const [config, setConfig] = useState<Configuration>(defaultConfig);
  const [ready, setReady] = useState(false);
  const [storageStatus, setStorageStatus] = useState("Restoring saved policy…");
  const [copyStatus, setCopyStatus] = useState("");
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const prompt = buildPrompt(config);

  useEffect(() => {
    // Read after hydration so the server and first client render agree.
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        const parsed: unknown = saved ? JSON.parse(saved) : null;
        if (isConfiguration(parsed)) {
          setConfig(parsed);
          setStorageStatus("Saved policy restored. Changes are kept in this browser.");
        } else {
          setStorageStatus("Default policy. Changes are kept in this browser.");
        }
      } catch {
        setStorageStatus("Browser storage is unavailable. Changes will last only until this page closes.");
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function updateConfig(next: Configuration) {
    setConfig(next);
    setCopyStatus("");
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      setStorageStatus("Policy saved in this browser.");
    } catch {
      setStorageStatus("Browser storage is unavailable. Changes will last only until this page closes.");
    }
  }

  function resetConfig() {
    setConfig(defaultConfig);
    setCopyStatus("");
    try {
      window.localStorage.removeItem(storageKey);
      setStorageStatus("Default policy restored.");
    } catch {
      setStorageStatus("Default policy restored for this page. Browser storage is unavailable.");
    }
  }

  async function copyPrompt() {
    try {
      if (!window.isSecureContext || !navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(prompt);
      setCopyStatus("Prompt copied to clipboard.");
    } catch {
      promptRef.current?.focus();
      promptRef.current?.select();
      setCopyStatus("Automatic copy is unavailable or blocked. The prompt is selected: press Ctrl+C or Cmd+C, or use Download prompt.");
    }
  }

  function downloadPrompt() {
    const url = URL.createObjectURL(new Blob([prompt], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "aica005-execution-prompt.txt";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setCopyStatus("Prompt download started. Check your browser downloads.");
  }

  return <section id="experiment" className={styles.section} aria-labelledby="experiment-heading">
    <div className={styles.sectionTitle}><span className={styles.kicker}>05 / EXPERIMENT CONFIGURATION</span><h2 id="experiment-heading">Choose an instructional policy.</h2><p>Each choice changes the handoff prompt and the trade-offs below. This panel configures a learning experiment; it does not control a live agent.</p></div>
      <div className={styles.configLayout}>
      <div className={styles.controls}>
        <fieldset disabled={!ready}><legend>Context strategy</legend><p>Where should source inspection begin?</p><div className={styles.radioPair}><label><input type="radio" name="context" value="targeted" checked={config.context === "targeted"} onChange={() => updateConfig({ ...config, context: "targeted" })} />Targeted</label><label><input type="radio" name="context" value="broad" checked={config.context === "broad"} onChange={() => updateConfig({ ...config, context: "broad" })} />Broad</label></div></fieldset>
        <fieldset disabled={!ready}><legend>Exploration policy</legend><p>How should the agent expand its search?</p><div className={styles.radioPair}><label><input type="radio" name="exploration" value="bounded" checked={config.exploration === "bounded"} onChange={() => updateConfig({ ...config, exploration: "bounded" })} />Bounded</label><label><input type="radio" name="exploration" value="open" checked={config.exploration === "open"} onChange={() => updateConfig({ ...config, exploration: "open" })} />Open</label></div></fieldset>
        <fieldset disabled={!ready}><legend>Verification policy</legend><p>What evidence is required before reporting?</p><div className={styles.radioPair}><label><input type="radio" name="verification" value="regression" checked={config.verification === "regression"} onChange={() => updateConfig({ ...config, verification: "regression" })} />Focused + regression</label><label><input type="radio" name="verification" value="focused" checked={config.verification === "focused"} onChange={() => updateConfig({ ...config, verification: "focused" })} />Focused only</label></div></fieldset>
        <div className={styles.policyActions}><p role="status" data-storage-status>{storageStatus}</p><button type="button" onClick={resetConfig} disabled={!ready}>Reset to defaults</button></div>
      </div>
      <aside className={styles.policySummary} aria-labelledby="summary-heading">
        <span className={styles.kicker}>SELECTED POLICY / INSTRUCTIONAL</span><h3 id="summary-heading">Configuration summary</h3>
        <dl data-policy-summary><div><dt>Context</dt><dd>{contextOptions[config.context].label}</dd></div><div><dt>Exploration</dt><dd>{explorationOptions[config.exploration].label}</dd></div><div><dt>Verification</dt><dd>{verificationOptions[config.verification].label}</dd></div></dl>
        <h4>Trade-offs to watch</h4><ul data-policy-tradeoffs><li>{contextOptions[config.context].tradeoff}</li><li>{explorationOptions[config.exploration].tradeoff}</li><li>{verificationOptions[config.verification].tradeoff}</li></ul>
        <p>No resource totals or outcome predictions are generated here.</p>
      </aside>
    </div>
    <div id="prompt-panel" className={styles.promptPanel}><div className={styles.promptHeading}><div><span className={styles.kicker}>COPYABLE HANDOFF</span><h3>Generated execution prompt</h3><p>For the future prepared repository. It references all four planned contracts and changes with your selections.</p></div><div className={styles.promptActions}><button type="button" className="button button-primary" onClick={copyPrompt} disabled={!ready}>Copy prompt</button><button type="button" onClick={downloadPrompt} disabled={!ready}>Download prompt</button></div></div><textarea ref={promptRef} aria-label="Generated execution prompt" readOnly value={prompt} rows={18} spellCheck={false} /><p className={styles.copyStatus} role="status" aria-live="polite">{copyStatus || "Review the policy before copying it into a future agent session. You can also select this text manually."}</p></div>
    <noscript><p className={styles.note}>Enable JavaScript to change the policy or use the copy button. The default prompt remains readable and can be selected manually.</p></noscript>
  </section>;
}
