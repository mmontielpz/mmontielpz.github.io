import { expect, test } from "@playwright/test";

const routes = ["/", "/work/", "/research/", "/writing/", "/about/", "/contact/"];

test("shared shell and navigation resolve at every viewport", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main-content");
  for (const route of routes) {
    await page.locator(`nav a[href="${route}"]`).click();
    await expect.poll(() => new URL(page.url()).pathname).toBe(route);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  expect(errors).toEqual([]);
});

test("exported shell remains readable without JavaScript", async ({ browser, baseURL }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  for (const route of routes) {
    expect((await page.goto(baseURL + route))?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  await context.close();
});
