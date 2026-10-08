"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function TokenComparison() {
  const [tokensA, setTokensA] = useState("1000");
  const [tokensB, setTokensB] = useState("750");
  const [verifiedA, setVerifiedA] = useState("PASS");
  const [verifiedB, setVerifiedB] = useState("FAIL");
  const valid = /^\d+$/.test(tokensA) && /^\d+$/.test(tokensB) && Number(tokensA) > 0;
  const reduction = valid ? (Number(tokensA) - Number(tokensB)) / Number(tokensA) * 100 : null;
  const resultLabel = reduction === null ? "Enter valid whole-number totals (A must exceed zero)." : reduction < 0 ? `${Math.abs(reduction).toFixed(1)}% more tokens in B (${reduction.toFixed(1)}% reduction)` : `${reduction.toFixed(1)}% fewer tokens in B`;

  return <section className={styles.section} id="compare" aria-labelledby="compare-heading">
    <div className={styles.sectionTitle}><span className={styles.kicker}>08 / COMPARE THE EVIDENCE</span><h2 id="compare-heading">Fewer tokens only help when the engineering outcome holds.</h2><p>Try a small hypothetical comparison. The page does not read Copilot telemetry or lab reports.</p></div>
    <div className={styles.calculator}>
      <p className={styles.hypothetical}>HYPOTHETICAL EXAMPLE · Edit these values; they are not AICA005 measurements.</p>
      <div className={styles.calculatorInputs}>
        <div><label htmlFor="tokens-a">Experiment A · total tokens</label><input id="tokens-a" type="number" min="1" step="1" inputMode="numeric" value={tokensA} onChange={event => setTokensA(event.target.value)} /><label htmlFor="verified-a">Independent verification</label><select id="verified-a" value={verifiedA} onChange={event => setVerifiedA(event.target.value)}><option>PASS</option><option>FAIL</option></select></div>
        <div><label htmlFor="tokens-b">Experiment B · total tokens</label><input id="tokens-b" type="number" min="0" step="1" inputMode="numeric" value={tokensB} onChange={event => setTokensB(event.target.value)} /><label htmlFor="verified-b">Independent verification</label><select id="verified-b" value={verifiedB} onChange={event => setVerifiedB(event.target.value)}><option>PASS</option><option>FAIL</option></select></div>
      </div>
      <div className={styles.calculatorResult} role="status" aria-live="polite"><strong>{resultLabel}</strong><p>{reduction === null ? "No percentage is calculated." : verifiedA === "PASS" && verifiedB === "PASS" ? "Both hypothetical runs passed verification. Review patch quality and other resource evidence before judging efficiency." : "At least one hypothetical run failed verification. A lower token count alone does not establish a better outcome."}</p></div>
      <p className={styles.formula}>Token reduction = (A tokens − B tokens) ÷ A tokens × 100. For a real comparison, use comparable provider-reported totals and the same task, model, runtime, and checks. If totals are unavailable, report <strong>NOT_AVAILABLE</strong>; compare observed tool calls and time separately.</p>
    </div>
  </section>;
}
