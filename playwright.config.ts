import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  //retries: 1, //local only for CI use above line
  
  /* Opt out of parallel tests on CI. */
 // workers: process.env.CI ? 1 : undefined,

  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', {open: 'always'}], ['line'], ['allure-playwright'] ], 
  /*Time out for each test case */
  timeout: 30000,

  /** properties for assertion using expect */
  expect: {timeout: 10000},

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    //For API testing module/test cases
    //baseURL: 'https://restful-booker.herokuapp.com'

  },

 
  /* Configure projects for major browsers */
  projects: [
   {

      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      //fullyParallel: false,
      workers: 4,
    },
 /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      fullyParallel: false,
      workers: 2,
    },
/*
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
