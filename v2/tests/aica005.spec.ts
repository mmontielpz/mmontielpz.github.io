import { expect, test } from "@playwright/test";
import { workload } from "../content/aica005";

const route = "/writing/ai-coding-agents-token-optimization/";
const lab = "https://github.com/mmontielpz/aica005-django-agent-workshop";
const launchUrl = "https://codespaces.new/mmontielpz/aica005-django-agent-workshop/tree/main";
const noOverflow = async (page: import("@playwright/test").Page) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
};

test("five-step workshop and public handoff are clear and keyboard accessible", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  expect((await page.goto(route))?.status()).toBe(200);
  await expect(page.locator("article > section")).toHaveCount(5);
  await expect(page.locator("article > section").first()).toHaveAttribute("id", "challenge");
  await expect(page.locator("article > section").nth(1)).toHaveAttribute("id", "experiment");
  await expect(page.locator("article > section").nth(2)).toHaveAttribute("id", "launch");
  await expect(page.locator("article > section").nth(3)).toHaveAttribute("id", "compare");
  await expect(page.locator("article > section").nth(4)).toHaveAttribute("id", "learn");
  await expect(page.getByRole("list", { name: "Learning journey" }).locator("li")).toHaveText(["Understand", "Experiment", "Launch", "Compare", "Learn"]);
  await expect(page.locator('[data-diagram="dependency"]')).toBeVisible();
  await expect(page.getByText("Breaks dependency")).toBeVisible();
  await expect(page.getByText("Preserves dependency")).toBeVisible();
  await expect(page.getByRole("list", { name: "Engineering system" }).locator("li")).toHaveCount(6);
  await expect(page.getByText(workload.instance)).toBeVisible();
  await expect(page.getByRole("link", { name: workload.base })).toHaveAttribute("href", workload.widgets);
  await expect(page.getByRole("link", { name: "issue #30179" })).toHaveAttribute("href", workload.issue);
  await expect(page.getByRole("link", { name: "Experiment A request" })).toHaveAttribute("href", lab + "/blob/main/experiments/A-unstructured.md");
  await expect(page.getByRole("link", { name: "Experiment B request" })).toHaveAttribute("href", lab + "/blob/main/experiments/B-resource-aware.md");
  await expect(page.getByRole("link", { name: "public lab README" })).toHaveAttribute("href", lab + "/blob/main/README.md");
  expect(await page.locator("article").innerHTML()).not.toContain("mmontielpz/ai-coding-agent-lab");
  const launch = page.getByRole("link", { name: "Launch GitHub Codespaces Lab" }).first();
  await expect(launch).toHaveAttribute("href", launchUrl);
  await expect(launch).toHaveAttribute("target", "_blank");
  await page.context().route("https://codespaces.new/**", route => route.fulfill({ status: 200, body: "Codespaces launch destination" }));
  await launch.focus();
  await expect(launch).toBeFocused();
  const [popup] = await Promise.all([page.waitForEvent("popup"), launch.press("Enter")]);
  await expect(popup).toHaveURL(launchUrl);
  await popup.close();
  await page.getByRole("link", { name: /Understand the challenge first/ }).click();
  await expect(page).toHaveURL(/#challenge$/);
  await page.locator('article a[href="/writing/"]').click();
  await expect(page).toHaveURL(/\/writing\/$/);
  await page.goto(route);
  await noOverflow(page);
  expect(errors).toEqual([]);
  await page.screenshot({ path: info.outputPath("aica005-workshop.png"), fullPage: true });
});

test("hypothetical calculator requires both verified outcomes", async ({ page }) => {
  await page.goto(route);
  await expect(page.locator("#compare p").filter({ hasText: /^HYPOTHETICAL TEACHING EXAMPLE/ })).toBeVisible();
  await expect(page.getByRole("spinbutton", { name: "Experiment A · total tokens" })).toHaveValue("80000");
  await expect(page.getByRole("spinbutton", { name: "Experiment B · total tokens" })).toHaveValue("32000");
  await expect(page.getByText("60% fewer tokens in B")).toBeVisible();
  await page.getByLabel("Independent verification").last().selectOption("FAIL");
  await expect(page.getByText("No percentage is calculated.")).toBeVisible();
  await expect(page.getByText("Fewer tokens cannot establish an equivalent engineering outcome", { exact: false })).toBeVisible();
  await page.getByLabel("Independent verification").last().selectOption("PASS");
  await page.getByRole("spinbutton", { name: "Experiment B · total tokens" }).fill("120000");
  await expect(page.getByText("50% more tokens in B")).toBeVisible();
  await page.getByRole("spinbutton", { name: "Experiment A · total tokens" }).fill("0");
  await expect(page.getByText("No percentage is calculated.")).toBeVisible();
  await expect(page.getByText("NOT_AVAILABLE")).toBeVisible();
  await noOverflow(page);
});

test("core instructions remain readable without JavaScript", async ({ browser, baseURL }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(baseURL + "/writing/");
  await page.getByRole("link", { name: /AI coding agents: token optimization/ }).click();
  await expect(page).toHaveURL(new RegExp(route));
  await expect(page.locator("article > section")).toHaveCount(5);
  await expect(page.getByText("Breaks dependency")).toBeVisible();
  await expect(page.getByRole("link", { name: "Experiment A request" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Launch GitHub Codespaces Lab" }).first()).toBeVisible();
  await expect(page.getByText("60% fewer tokens in B")).toBeVisible();
  await page.getByText("What evidence supports a PASS decision?").click();
  await expect(page.getByText("A reviewable diff, executed checks", { exact: false })).toBeVisible();
  await noOverflow(page);
  await page.screenshot({ path: info.outputPath("aica005-no-js.png"), fullPage: true });
  await context.close();
});
