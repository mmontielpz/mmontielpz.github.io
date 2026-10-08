import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results",
  reporter: "list",
  workers: 2,
  use: { baseURL: "http://127.0.0.1:8877", browserName: "chromium", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "laptop", use: { viewport: { width: 1280, height: 800 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: "python3 -m http.server 8877 --bind 127.0.0.1 --directory out",
    url: "http://127.0.0.1:8877/",
    reuseExistingServer: false,
  },
});
