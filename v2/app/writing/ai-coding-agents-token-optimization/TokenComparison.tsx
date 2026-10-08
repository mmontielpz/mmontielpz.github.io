"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function TokenComparison() {
  const [tokensA, setTokensA] = useState("80000");
  const [tokensB, setTokensB] = useState("32000");
  const [verifiedA, setVerifiedA] = useState("PASS");
  const [verifiedB, setVerifiedB] = useState("PASS");
  const validTotals = /^\d+$/.test(tokensA) && /^\d+$/.test(tokensB) && Number.isSafeInteger(Number(tokensA)) && Number.isSafeInteger(Number(tokensB)) && Number(tokensA) > 0;
  const equivalentPass = verifiedA === "PASS" && verifiedB === "PASS";
  const reduction = validTotals && equivalentPass ? (Number(tokensA) - Number(tokensB)) / Number(tokensA) * 100 : null;
  const resultLabel = reduction === null ? "No percentage is calculated." : reduction < 0 ? `${Number(Math.abs(reduction).toFixed(1))}% more tokens in B` : `${Number(reduction.toFixed(1))}% fewer tokens in B`;

  return <section className={styles.section} id="compare" aria-labelledby="compare-heading">
    <div className={styles.sectionTitle}><span className={styles.kicker}>04 / COMPARE RESULTS</span><h2 id="compare-heading">Compare verified outcomes before resource use.</h2><p>Try a hypothetical teaching example. This page does not read Copilot telemetry or lab reports.</p></div>
    <div className={styles.calculator}>
      <p className={styles.hypothetical}>HYPOTHETICAL TEACHING EXAMPLE · 80,000 versus 32,000 tokens; both pass equivalent verification. These are NOT observed AICA005 measurements.</p>
      <div className={styles.calculatorInputs}>
        <div><label htmlFor="tokens-a">Experiment A · total tokens</label><input id="tokens-a" type="number" min="1" step="1" inputMode="numeric" value={tokensA} onChange={event => setTokensA(event.target.value)} /><label htmlFor="verified-a">Independent verification</label><select id="verified-a" value={verifiedA} onChange={event => setVerifiedA(event.target.value)}><option>PASS</option><option>FAIL</option></select></div>
        <div><label htmlFor="tokens-b">Experiment B · total tokens</label><input id="tokens-b" type="number" min="0" step="1" inputMode="numeric" value={tokensB} onChange={event => setTokensB(event.target.value)} /><label htmlFor="verified-b">Independent verification</label><select id="verified-b" value={verifiedB} onChange={event => setVerifiedB(event.target.value)}><option>PASS</option><option>FAIL</option></select></div>
      </div>
      <div className={styles.calculatorResult} role="status" aria-live="polite"><strong>{resultLabel}</strong><p>{!validTotals ? "Enter valid whole-number token totals; A must exceed zero." : !equivalentPass ? "At least one run failed verification. Fewer tokens cannot establish an equivalent engineering outcome." : "Both outcomes are marked PASS. Confirm equivalent checks and patch quality before drawing an efficiency conclusion."}</p></div>
      <p className={styles.formula}>Token Reduction (%) = (Tokens A − Tokens B) / Tokens A × 100. Use this calculation for real runs only with comparable provider-reported totals and equivalent verified outcomes. If exact tokens are unavailable, report <strong>NOT_AVAILABLE</strong>; compare observed tool calls and time separately.</p>
    </div>
  </section>;
}
