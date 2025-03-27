import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ToverStock',
  webDir: 'www',
  plugins: {
    keyboard: {
      resize: false
    },
  }
};

export default config;
