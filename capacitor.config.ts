import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tiklaisgelsin',
  appName: 'Tıkla İş Gelsin',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
