// @ts-check
const { devices, expect } = require('@playwright/test');
const { timeout, workers } = require('./playwright_orign.config');



const config = ({
  //testDir: './tests',
  testDir: './tests',
  reporter: 'html',
  /* Time out for entire test */
  timeout: 50*1000,
  expect:{
    /*time out for expect operation */
    timeout: 5000

  },

  use: {

    headless: true,
    screenshot: 'on',
    trace: 'retain-on-failure',
    reporter: 'html',
    viewport: { width: 1920, height: 1080 },
    workers: 1
  },
  projects: [
    {
       name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }
      }

  ]
  }
  

);

module.exports = config;
