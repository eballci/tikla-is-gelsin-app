import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tiklaisgelsin',
  appName: 'Tıkla İş Gelsin',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    cleartext: true,
  }
};

export default config;
