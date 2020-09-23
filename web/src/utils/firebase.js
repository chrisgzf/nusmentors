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

export const selectFBDisplayName = (state) => state.firebase.auth.displayName;
export const selectFBEmail = (state) => state.firebase.auth.email;
export const selectFBEmailVerified = (state) =>
  state.firebase.auth.emailVerified;
export const selectFBPhotoURL = (state) => state.firebase.auth.photoURL;
export const selectUid = (state) => state.firebase.auth.uid;
export const selectFBAuthError = (state) => state.firebase.authError;
