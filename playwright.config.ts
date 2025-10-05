import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 15000,
  testDir: './tests',
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html']
  ],
  retries: 2,
  use: {
    video: 'on-first-retry',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
