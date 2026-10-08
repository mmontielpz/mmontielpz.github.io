/** Authored teaching fixtures. No event below is an observed agent action. */
export const workload = {
  instance: "django__django-11019",
  repository: "django/django",
  base: "93e892bb645b16ebaf287beb5fe7f3ffe8d10408",
  recordHash: "54202703365b28436fecc9b1a8f2241a3b86888bf594963faa7c1dd254664965",
  issue: "https://code.djangoproject.com/ticket/30179",
  reference: "https://github.com/django/django/pull/11019",
  widgets: "https://github.com/django/django/blob/93e892bb645b16ebaf287beb5fe7f3ffe8d10408/django/forms/widgets.py",
  sort: "https://github.com/django/django/blob/93e892bb645b16ebaf287beb5fe7f3ffe8d10408/django/utils/topological_sort.py",
} as const;

export type Workflow = "A0" | "A1";
export type ScenarioEvent = {
  id: string;
  workflow: Workflow;
  action: string;
  why: string;
  observation: string;
  implication: string;
  sourceLabel: string;
  sourceUrl: string;
  filesInspected: string[];
  provenance: "SYNTHETIC";
};

const event = (value: Omit<ScenarioEvent, "provenance">): ScenarioEvent => ({ ...value, provenance: "SYNTHETIC" });

type Scenario = {
  id: string;
  version: "1";
  provenance: "SYNTHETIC";
  taskHash: typeof workload.recordHash;
  engine: "Educational Fixture Engine V1";
  title: string;
  policy: string;
  events: ScenarioEvent[];
};

export const scenario: Record<Workflow, Scenario> = {
  A0: {
    id: "AICA005-A0",
    version: "1",
    provenance: "SYNTHETIC",
    taskHash: workload.recordHash,
    engine: "Educational Fixture Engine V1",
    title: "Broad exploration",
    policy: "Search widely, allow large reads, and consider broad tests early.",
    events: [
      event({ id: "A0-01", workflow: "A0", action: "Search broadly across forms, admin, and static assets", why: "The issue mentions widgets, media, and a form; this policy starts with a wide search.", observation: "Authored search summary: the issue points toward widget Media composition; many adjacent paths would also be visible. No repository search runs in this browser.", implication: "One scenario tool action; a real broad search might return more output than this summary.", sourceLabel: "Original Django issue", sourceUrl: workload.issue, filesInspected: [] }),
      event({ id: "A0-02", workflow: "A0", action: "Request the complete widgets.py file", why: "A broad read avoids missing nearby behavior, but fills the evidence window quickly.", observation: "Authored file summary: Media stores CSS and JS lists and merges them pairwise when the properties are read. The pinned base file is larger than this displayed summary.", implication: "One file inspected in the scenario. Count only displayed fixture bytes, not an unshown full-file payload.", sourceLabel: "Pinned base: widgets.py", sourceUrl: workload.widgets, filesInspected: ["django/forms/widgets.py"] }),
      event({ id: "A0-03", workflow: "A0", action: "Reread the Media merge area", why: "Without a checkpoint, the same source area can be requested again.", observation: "Authored reread: Media.merge combines two lists, tries to preserve relative order, and may warn on opposite order. This repeats an inspected file, not a new file.", implication: "Another scenario action and more displayed bytes; unique-file count stays unchanged.", sourceLabel: "Pinned base: widgets.py", sourceUrl: workload.widgets, filesInspected: ["django/forms/widgets.py"] }),
      event({ id: "A0-04", workflow: "A0", action: "Queue a broad test sweep before a focused reproduction", why: "The policy seeks quick confidence before identifying the exact acceptance cases.", observation: "Authored plan only: a broad suite would mix relevant Media cases with unrelated output. No Django command or test has run here.", implication: "One scenario action is budgeted; no test result, runtime, or test-output bytes are claimed.", sourceLabel: "Original Django issue", sourceUrl: workload.issue, filesInspected: [] }),
      event({ id: "A0-05", workflow: "A0", action: "Look for an existing dependency-order utility", why: "The issue is about ordering constraints; repository utilities may already encode the needed graph behavior.", observation: "Authored discovery: the pinned base has stable_topological_sort and CyclicDependencyError in django/utils/topological_sort.py.", implication: "A second unique source file enters the scenario evidence window.", sourceLabel: "Pinned base: topological_sort.py", sourceUrl: workload.sort, filesInspected: ["django/utils/topological_sort.py"] }),
      event({ id: "A0-06", workflow: "A0", action: "Define a focused verification plan", why: "Broad exploration still needs an independent correctness gate.", observation: "Authored plan: check three-way JavaScript order, CSS groups, deduplication, real cycles, and adjacent admin/widget behavior. Tests remain not executed.", implication: "The scenario ends with a plan, not a verified patch or a benchmark score.", sourceLabel: "Reference PR and research acceptance design", sourceUrl: workload.reference, filesInspected: [] }),
    ],
  },
  A1: {
    id: "AICA005-A1",
    version: "1",
    provenance: "SYNTHETIC",
    taskHash: workload.recordHash,
    engine: "Educational Fixture Engine V1",
    title: "Resource-aware",
    policy: "Localize first, inspect bounded windows, checkpoint evidence, then reserve checks.",
    events: [
      event({ id: "A1-01", workflow: "A1", action: "Search for Media and merge near the reported widget behavior", why: "The same issue identifies widget Media, so start with matching symbols and expand if needed.", observation: "Authored search summary: the relevant Media implementation is in django/forms/widgets.py. This is a discovery step, not advance access to the reference patch.", implication: "One targeted scenario action; actual search output was not captured.", sourceLabel: "Original Django issue and pinned base", sourceUrl: workload.widgets, filesInspected: [] }),
      event({ id: "A1-02", workflow: "A1", action: "Inspect the bounded Media composition and merge window", why: "See how per-widget lists are combined without loading unrelated widget code.", observation: "Authored source observation: _css and _js merge stored lists in sequence; merge handles two lists. Pairwise order can imply a dependency the original declarations did not specify.", implication: "One unique file inspected. The byte counter measures this displayed fixture text only.", sourceLabel: "Pinned base: widgets.py", sourceUrl: workload.widgets, filesInspected: ["django/forms/widgets.py"] }),
      event({ id: "A1-03", workflow: "A1", action: "Search for a repository sorting utility", why: "Before inventing a graph algorithm, check whether the repository already has one.", observation: "Authored discovery: stable_topological_sort exists in django/utils/topological_sort.py. The browser does not supply a gold patch to this workflow.", implication: "A second unique file is inspected; retrieving it is a deliberate context expense.", sourceLabel: "Pinned base: topological_sort.py", sourceUrl: workload.sort, filesInspected: ["django/utils/topological_sort.py"] }),
      event({ id: "A1-04", workflow: "A1", action: "Checkpoint facts and uncertainty", why: "Keep the dependency contract and unresolved cycle/CSS questions visible before changing code.", observation: "Authored checkpoint: known—pairwise merging can invent order, and a stable sort utility exists. Uncertain—cycle fallback and CSS-medium behavior until inspected and checked.", implication: "A compact authored note could replace repeated inspection in a future run; savings are unmeasured.", sourceLabel: "Original issue and pinned base", sourceUrl: workload.issue, filesInspected: [] }),
      event({ id: "A1-05", workflow: "A1", action: "Plan targeted tests, then adjacent checks", why: "Reserve effort for both the reported failure and regressions in connected widgets.", observation: "Authored plan: reproduce three-way JS ordering, then check CSS, duplicates, cycles, admin autocomplete and inlines. No tests execute in this browser.", implication: "The workflow is still unverified; fewer displayed bytes do not establish a better agent outcome.", sourceLabel: "Reference PR and research acceptance design", sourceUrl: workload.reference, filesInspected: [] }),
    ],
  },
};

export const extraContext = {
  observation: "Additional authored source window: stable_topological_sort preserves input order within dependency layers; topological_sort_as_sets raises CyclicDependencyError when no node is free of dependencies. That cycle behavior needs an explicit fallback check. CSS media groups also need separate ordering checks.",
  sourceLabel: "Pinned base: topological_sort.py; reference PR for CSS scope",
  sourceUrl: workload.sort,
  file: "django/utils/topological_sort.py",
  provenance: "SYNTHETIC" as const,
};

export const fixtureBytes = (content: string) => new TextEncoder().encode(content).byteLength;
export const actionBudget = 7; // Preauthored scenario slots, not an agent deadline or provider quota.
