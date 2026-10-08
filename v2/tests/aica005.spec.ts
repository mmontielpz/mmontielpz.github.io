import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { workload } from "../content/aica005";

const route = "/writing/ai-coding-agents-token-optimization/";

const promptText = (page: import("@playwright/test").Page) => page.getByRole("textbox", { name: "Generated execution prompt" });

const noOverflow = async (page: import("@playwright/test").Page) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
};

test("challenge, dependency diagram, workflow, and Codespaces handoff are clear", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  expect((await page.goto(route))?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("dd").filter({ hasText: workload.instance })).toBeVisible();
  await expect(page.getByRole("link", { name: workload.base })).toBeVisible();
  await expect(page.getByText("Problematic merge")).toBeVisible();
  await expect(page.getByText("Breaks dependency")).toBeVisible();
  await expect(page.getByText("One valid topological order")).toBeVisible();
  await expect(page.getByText("Preserves dependency")).toBeVisible();
  await expect(page.getByText("color-picker.js is independent", { exact: false })).toBeVisible();
  await expect(page.getByRole("list", { name: "Engineering system" }).locator("li")).toHaveCount(6);
  await expect(page.locator("h3").filter({ hasText: /^(Discover|Plan|Execute|Verify|Report)$/ })).toHaveCount(5);
  await expect(page.getByRole("heading", { name: "GitHub Codespaces Laboratory" })).toBeVisible();
  await expect(page.getByText("Hands-on environment: Ready to launch")).toBeVisible();
  const launch = page.getByRole("link", { name: /Launch GitHub Codespaces Lab/ });
  await expect(launch).toHaveAttribute("href", "https://codespaces.new/mmontielpz/ai-coding-agent-lab/tree/feat/aica005-django-codespaces-lab");
  await expect(launch).toHaveAttribute("target", "_blank");
  await expect(launch).toBeEnabled();
  await expect(page.getByRole("link", { name: "Experiment A request" })).toHaveAttribute("href", "https://github.com/mmontielpz/ai-coding-agent-lab/blob/feat/aica005-django-codespaces-lab/experiments/A-unstructured.md");
  await expect(page.getByRole("link", { name: "Experiment B request" })).toHaveAttribute("href", "https://github.com/mmontielpz/ai-coding-agent-lab/blob/feat/aica005-django-codespaces-lab/experiments/B-resource-aware.md");
  await expect(page.getByText("the configurable prompt above is for a separate practice run", { exact: false })).toBeVisible();
  await page.context().route("https://codespaces.new/**", route => route.fulfill({ status: 200, body: "Codespaces launch destination" }));
  const [launchPopup] = await Promise.all([page.waitForEvent("popup"), launch.click()]);
  await expect(launchPopup.locator("body")).toHaveText("Codespaces launch destination");
  await expect(launchPopup).toHaveURL("https://codespaces.new/mmontielpz/ai-coding-agent-lab/tree/feat/aica005-django-codespaces-lab");
  await launchPopup.close();
  await expect(page.locator('[data-diagram="dependency"]')).toBeVisible();
  await expect(page.locator('[data-diagram="agent"]')).toBeVisible();
  await expect(page.locator('[data-diagram="workflow"]')).toBeVisible();
  await expect(page.locator('[data-diagram="agent"]').getByText("Candidate patch", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: /Start with the challenge/ }).click();
  await expect(page).toHaveURL(/#challenge$/);
  await page.getByRole("link", { name: /Configure the policy/ }).click();
  await expect(page).toHaveURL(/#experiment$/);
  await page.getByRole("link", { name: /Copy or download your prompt/ }).click();
  await expect(page).toHaveURL(/#prompt-panel$/);
  await expect(page.getByRole("textbox", { name: "Generated execution prompt" })).toBeInViewport();
  await page.locator('article a[href="/writing/"]').click();
  await expect(page).toHaveURL(/\/writing\/$/);
  await page.goto(route);
  await expect(page.getByRole("heading", { name: "GitHub Codespaces Laboratory" })).toBeVisible();
  await noOverflow(page);
  expect(errors).toEqual([]);
  await page.screenshot({ path: info.outputPath("learning-portal-initial.png"), fullPage: true });
});

test("all three policies update summary, trade-offs, generated prompt, and clipboard offline", async ({ page }, info) => {
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(route);
  await expect(page.getByRole("radio", { name: "Broad" })).toBeEnabled();
  const summary = page.locator("[data-policy-summary]");
  const tradeoffs = page.locator("[data-policy-tradeoffs]");
  const prompt = promptText(page);
  await expect(summary).toContainText("Targeted");
  await expect(summary).toContainText("Bounded");
  await expect(summary).toContainText("Focused + regression");
  await expect(prompt).toHaveValue(/Context strategy — Targeted/);
  await expect(prompt).toHaveValue(/Exploration policy — Bounded/);
  await expect(prompt).toHaveValue(/Verification policy — Focused \+ regression/);
  for (const file of ["TASK.md", "AGENT.md", "VERIFY.md", "REPORT.md"]) await expect(prompt).toHaveValue(new RegExp(file.replace(".", "\\.")));
  await expect(prompt).toHaveValue(new RegExp(workload.base));
  await expect(prompt).toHaveValue(/GitHub Copilot Chat Agent mode/);

  await page.context().setOffline(true);
  const broad = page.getByRole("radio", { name: "Broad" });
  await broad.focus();
  await broad.press("Space");
  await expect(broad).toBeChecked();
  await expect(summary).toContainText("Broad");
  await expect(tradeoffs).toContainText("May reveal distant behavior sooner");
  await expect(prompt).toHaveValue(/Context strategy — Broad/);
  await expect(prompt).toHaveValue(/Survey relevant forms, widget, and adjacent admin paths/);

  await page.getByRole("radio", { name: "Open", exact: true }).check();
  await expect(summary).toContainText("Open");
  await expect(tradeoffs).toContainText("resource use may grow");
  await expect(prompt).toHaveValue(/Exploration policy — Open/);
  await expect(prompt).toHaveValue(/Allow wider exploration as needed/);

  await page.getByRole("radio", { name: "Focused only" }).check();
  await expect(summary).toContainText("Focused only");
  await expect(tradeoffs).toContainText("overall engineering outcome remains unverified");
  await expect(prompt).toHaveValue(/Verification policy — Focused only/);
  await expect(prompt).toHaveValue(/Mark the result PARTIAL/);
  await expect(prompt).toHaveValue(/do not claim task-level PASS/);
  await expect(prompt).toHaveValue(/not files supplied by this learning portal/);
  await expect(page.getByText("No resource totals or outcome predictions are generated here.")).toBeVisible();

  const expected = await prompt.inputValue();
  await page.getByRole("button", { name: "Copy prompt" }).click();
  await expect(page.locator('[aria-live="polite"]')).toHaveText("Prompt copied to clipboard.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
  await page.context().setOffline(false);
  await page.reload();
  await expect(page.getByRole("radio", { name: "Broad" })).toBeChecked();
  await expect(page.getByRole("radio", { name: "Open", exact: true })).toBeChecked();
  await expect(page.getByRole("radio", { name: "Focused only" })).toBeChecked();
  await expect(prompt).toHaveValue(expected);
  await expect(page.locator("[data-storage-status]")).toContainText("Saved policy restored");
  await page.getByRole("button", { name: "Reset to defaults" }).click();
  await expect(page.getByRole("radio", { name: "Targeted" })).toBeChecked();
  await expect(page.getByRole("radio", { name: "Bounded" })).toBeChecked();
  await expect(page.getByRole("radio", { name: "Focused + regression" })).toBeChecked();
  await expect(prompt).toHaveValue(/Context strategy — Targeted/);
  await expect(prompt).toHaveValue(/Exploration policy — Bounded/);
  await expect(prompt).toHaveValue(/Verification policy — Focused \+ regression/);
  await page.reload();
  await expect(page.getByRole("radio", { name: "Targeted" })).toBeChecked();
  await expect(page.getByRole("radio", { name: "Bounded" })).toBeChecked();
  await expect(page.getByRole("radio", { name: "Focused + regression" })).toBeChecked();
  await noOverflow(page);
  await page.screenshot({ path: info.outputPath("learning-portal-configured.png"), fullPage: true });
});

test("Writing discovery and essential lesson remain readable without JavaScript", async ({ browser, baseURL }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(baseURL + "/writing/");
  await page.getByRole("link", { name: /AI coding agents: token optimization/ }).click();
  await expect(page).toHaveURL(new RegExp(route));
  await expect(page.getByText("Breaks dependency")).toBeVisible();
  await expect(page.getByText("Preserves dependency")).toBeVisible();
  await expect(page.getByText("Input / output tokens")).toBeVisible();
  await expect(page.locator("code").filter({ hasText: "TASK.md" })).toBeVisible();
  await expect(page.getByText("Hands-on environment: Ready to launch")).toBeVisible();
  await expect(promptText(page)).toHaveValue(/Context strategy — Targeted/);
  await page.getByText("Example evidence checkpoint before a patch").click();
  await expect(page.getByText("Next retrieval:", { exact: false })).toBeVisible();
  await page.getByText("What evidence is required before claiming PASS?").click();
  await expect(page.getByText("A reviewable diff, the relevant executed checks", { exact: false })).toBeVisible();
  await noOverflow(page);
  await page.screenshot({ path: info.outputPath("learning-portal-no-js.png"), fullPage: true });
  await context.close();
});

test("blocked clipboard selects the exact prompt and text export remains available", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => { throw new Error("Permission denied"); } },
    });
  });
  await page.goto(route);
  await expect(page.getByRole("button", { name: "Copy prompt" })).toBeEnabled();
  await page.getByRole("radio", { name: "Broad" }).check();
  const expected = await promptText(page).inputValue();
  await page.getByRole("button", { name: "Copy prompt" }).click();
  await expect(page.locator('[aria-live="polite"]')).toContainText("press Ctrl+C or Cmd+C");
  expect(await promptText(page).evaluate((element: HTMLTextAreaElement) => element.value.slice(element.selectionStart, element.selectionEnd))).toBe(expected);
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download prompt" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("aica005-execution-prompt.txt");
  expect(await readFile(await download.path(), "utf8")).toBe(expected);
});

test("keyboard can change and reset policy; unavailable storage keeps controls usable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { configurable: true, get: () => { throw new Error("Storage blocked"); } });
  });
  await page.goto(route);
  await expect(page.locator("[data-storage-status]")).toContainText("storage is unavailable");
  const broad = page.getByRole("radio", { name: "Broad" });
  await broad.focus();
  await broad.press("Space");
  await expect(broad).toBeChecked();
  await expect(promptText(page)).toHaveValue(/Context strategy — Broad/);
  await broad.press("Tab");
  await expect(page.getByRole("radio", { name: "Bounded" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Open", exact: true })).toBeChecked();
  await expect(promptText(page)).toHaveValue(/Exploration policy — Open/);
  await page.getByRole("button", { name: "Reset to defaults" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("radio", { name: "Targeted" })).toBeChecked();
  await expect(promptText(page)).toHaveValue(/Context strategy — Targeted/);
});

test("every same-site navigation link on the portal resolves", async ({ page }) => {
  await page.goto(route);
  const paths = await page.locator('a[href^="/"]').evaluateAll(anchors => [...new Set(anchors.map(anchor => anchor.getAttribute("href")))].filter((path): path is string => Boolean(path)));
  expect(paths.length).toBeGreaterThan(0);
  for (const path of paths) {
    await page.locator(`a[href="${path}"]`).first().click();
    await expect.poll(() => new URL(page.url()).pathname).toBe(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.goto(route);
  }
});
