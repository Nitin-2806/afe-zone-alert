import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2eba32aee6ab41ea97da0122720d2e23',
  appName: 'SafeZone Alert',
  webDir: 'dist',
  server: {
    url: 'https://2eba32ae-e6ab-41ea-97da-0122720d2e23.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#DC2626',
      showSpinner: false
    }
  }
};

export default config;