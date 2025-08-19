# 📱 Mobile Setup Guide - SafeZone Alert

## 🚀 Deploy to Mobile Device

To use **real SMS sending** and enhanced location services, follow these steps:

### 1. Export to GitHub
- Click "Export to GitHub" button in Lovable
- Clone your repository locally

### 2. Local Setup
```bash
git clone <your-repo-url>
cd <your-project-name>
npm install
```

### 3. Initialize Capacitor
```bash
npx cap init
```

### 4. Add Mobile Platforms
```bash
# For Android
npx cap add android

# For iOS (Mac only)
npx cap add ios
```

### 5. Build and Sync
```bash
npm run build
npx cap sync
```

### 6. Run on Device
```bash
# Android (requires Android Studio)
npx cap run android

# iOS (requires Xcode on Mac)
npx cap run ios
```

## 📋 Requirements

### For Android:
- Android Studio installed
- Android SDK 26+
- USB debugging enabled on device

### For iOS:
- Mac with Xcode installed
- iOS development certificate
- iOS device or simulator

## ✨ Native Features Enabled

✅ **Real SMS Sending** - Opens device SMS app with pre-filled emergency message
✅ **High-Accuracy Location** - Uses device GPS for precise coordinates  
✅ **Offline Capability** - Works without internet connection
✅ **Background Operation** - Can run in background
✅ **Native Permissions** - Proper location and SMS permissions

## 🔧 Current Behavior

- **Web Preview**: Simulates SMS (logs to console)
- **Mobile Device**: Opens SMS app with emergency message
- **Location**: Works on both web and mobile with high accuracy

## 🚨 Emergency Features Ready

The app is production-ready for emergency use with:
- Large, accessible SOS button
- Instant location capture
- Emergency contact management
- Real-time SMS alerts on mobile devices

## 📖 Need Help?

Check the [Capacitor documentation](https://capacitorjs.com/docs) for platform-specific setup details.