import { expect, test } from "@playwright/test";
import { workload } from "../content/aica005";

const route = "/writing/ai-coding-agents-token-optimization/";
const lab = "https://github.com/mmontielpz/aica005-django-agent-workshop";
const launchUrl = "https://codespaces.new/mmontielpz/aica005-django-agent-workshop/tree/main";
const quickStartUrl = lab + "/blob/main/PARTICIPANT_QUICK_START.md";
const noOverflow = async (page: import("@playwright/test").Page) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
};

test("short workshop landing page leads to the public lab", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  expect((await page.goto(route))?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("AI Coding Agents: Resource-Aware Engineering");
  await expect(page.locator("article > section")).toHaveCount(3);
  await expect(page.locator("article > section").first()).toHaveAttribute("id", "challenge");
  await expect(page.locator('article > section[id="experiment"]')).toBeVisible();
  await expect(page.locator('article > section[id="lab"]')).toBeVisible();
  await expect(page.locator('[data-diagram="dependency"]')).toBeVisible();
  await expect(page.getByText("Broken merge")).toBeVisible();
  await expect(page.getByText("Correct order")).toBeVisible();
  await expect(page.getByText(workload.instance)).toBeVisible();
  await expect(page.getByRole("link", { name: "issue #30179" })).toHaveAttribute("href", workload.issue);
  await expect(page.getByRole("link", { name: /Read the fixed A request/ })).toHaveAttribute("href", lab + "/blob/main/experiments/A-unstructured.md");
  await expect(page.getByRole("link", { name: /Read the fixed B request/ })).toHaveAttribute("href", lab + "/blob/main/experiments/B-resource-aware.md");
  await expect(page.getByRole("list", { name: "Lab workflow" }).locator("li strong")).toHaveText(["Launch", "A", "B", "Compare", "Cleanup"]);
  await expect(page.locator("#experiment").getByText("NOT_AVAILABLE")).toBeVisible();
  await expect(page.getByText("five-minute target", { exact: false })).toBeVisible();
  await expect(page.locator("#compare")).toHaveCount(0);
  expect(await page.locator("article").innerHTML()).not.toContain("mmontielpz/ai-coding-agent-lab");

  const launch = page.getByRole("link", { name: "Launch Lab" }).first();
  await expect(launch).toHaveAttribute("href", launchUrl);
  await expect(page.getByRole("link", { name: "Quick Start Guide" }).first()).toHaveAttribute("href", quickStartUrl);
  await expect(page.getByRole("link", { name: "View Repository" })).toHaveAttribute("href", lab);
  await page.context().route("https://codespaces.new/**", route => route.fulfill({ status: 200, body: "Codespaces launch destination" }));
  await launch.focus();
  await expect(launch).toBeFocused();
  const [popup] = await Promise.all([page.waitForEvent("popup"), launch.press("Enter")]);
  await expect(popup).toHaveURL(launchUrl);
  await popup.close();
  await page.getByRole("link", { name: /See the challenge/ }).click();
  await expect(page).toHaveURL(/#challenge$/);
  await page.locator('article a[href="/writing/"]').click();
  await expect(page).toHaveURL(/\/writing\/$/);
  await page.goto(route);
  await noOverflow(page);
  expect(errors).toEqual([]);
  await page.screenshot({ path: info.outputPath("aica005-landing.png"), fullPage: true });
});

test("essential context works without JavaScript", async ({ browser, baseURL }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(baseURL + "/writing/");
  await page.getByRole("link", { name: /AI coding agents: token optimization/ }).click();
  await expect(page).toHaveURL(new RegExp(route));
  await expect(page.locator("article > section")).toHaveCount(3);
  await expect(page.getByText("Dependency broken")).toBeVisible();
  await expect(page.getByText("Dependency preserved")).toBeVisible();
  await expect(page.getByRole("link", { name: "Launch Lab" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Quick Start Guide" }).first()).toBeVisible();
  await expect(page.getByRole("list", { name: "Lab workflow" }).locator("li")).toHaveCount(5);
  await noOverflow(page);
  await page.screenshot({ path: info.outputPath("aica005-landing-no-js.png"), fullPage: true });
  await context.close();
});
