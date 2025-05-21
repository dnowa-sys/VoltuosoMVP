import 'dotenv/config';

export default {
  expo: {
    name: "Voltuoso MVP",
    slug: "voltuoso-mvp",
    version: "1.0.0",
    sdkVersion: "50.0.0",
    owner: "dnowa-org",
    plugins: [
      [
        "expo-maps",
        {
          locationPermission: "Allow Voltuoso to access your location",
          requestLocationPermission: true
        }
      ]
    ],
    android: {
      package: process.env.ANDROID_BUNDLE_ID,
      config: {
        googleMaps: {
          apiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY
        }
      }
    },
    ios: {
      bundleIdentifier: process.env.IOS_BUNDLE_ID, // ✅ Fixed!
      config: {
        googleMapsApiKey: process.env.IOS_GOOGLE_MAPS_API_KEY
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "We use your location to show EV charging stations nearby."
      }
    },
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      eas: {
        projectId: "6d2dbe8f-5178-421d-b3a2-9543bac3433f"
      }
    }
  }
};
