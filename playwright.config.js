// @ts-check
const { devices, expect } = require('@playwright/test');
const { timeout } = require('./playwright_orign.config');



const config = ({
  //testDir: './tests',
  testDir: './tests-examples/AIDrivenTesting',
  reporter: 'html',
  /* Time out for entire test */
  timeout: 50*1000,
  expect:{
    /*time out for expect operation */
    timeout: 5000

  },

  use: {

    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure',
    reporter: 'html',
    viewport: { width: 1920, height: 1080 }
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
