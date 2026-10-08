import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Writing" };

export default function Page() {
  return (
    <>
      <h1>Writing</h1>
      <p>Technical notes and learning experiences about AI and engineering decisions.</p>
      <section aria-labelledby="learning-lab-heading">
        <p className="hero-eyebrow">Learning portal · workshop preparation</p>
        <h2 id="learning-lab-heading">
          <Link href="/writing/ai-coding-agents-token-optimization/">
            AI coding agents: token optimization →
          </Link>
        </h2>
        <p>Explore a real Django Media ordering issue, choose an agent resource policy, and prepare a verified engineering workflow.</p>
      </section>
    </>
  );
}
