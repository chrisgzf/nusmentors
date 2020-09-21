import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

export function setupFirebase() {
  // Initialise Firebase
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    console.error("Firebase initialization error", err.stack);
  }
  return firebase;
}

// Selectors
export const selectAuth = (state) => state.firebase.auth;
export const selectJWT = (state) =>
  state.firebase.auth.stsTokenManager
    ? state.firebase.auth.stsTokenManager.accessToken
    : null;
