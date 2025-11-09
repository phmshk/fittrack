import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
let auth: Auth;
let analytics: Analytics;
let db: Firestore;

// Initialize Firebase only if not using mocks and config is present
if (import.meta.env.VITE_USE_MOCKS !== "true" && firebaseConfig.apiKey) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  analytics = getAnalytics(app);
} else {
  // Log a warning if Firebase is not initialized due to missing config
  if (import.meta.env.VITE_USE_MOCKS !== "true" && !firebaseConfig.apiKey) {
    console.error(
      "Firebase config is missing or incomplete. Please check your .env files. App will run in mock mode if VITE_USE_MOCKS is not set.",
    );
  }
  // @ts-expect-error: Providing stubs when Firebase is not initialized
  app = {};
  // @ts-expect-error: Providing stubs when Firebase is not initialized
  auth = {};
  // @ts-expect-error: Providing stubs when Firebase is not initialized
  db = {};
  // @ts-expect-error: Providing stubs when Firebase is not initialized
  analytics = {};
}

export { app, auth, db, analytics };
