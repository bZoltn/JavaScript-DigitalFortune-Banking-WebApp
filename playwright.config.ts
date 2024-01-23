import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://digitalfortune-demo.netlify.app/',
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    video: 'off',
    actionTimeout: 20000,
  },
  retries: 3,
  // Other global configuration options...
};

export default config;
