// Adapted from https://usehooks.com/useAuth
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, sendEmailVerificationToUser } from "./firebase";

const authContext = createContext();

// Provider component that wraps your app and makes auth object available to any
// child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object and re-render when it changes.
export default function useAuth() {
  return useContext(authContext);
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure to save the user to state.
  const signIn = (email, password) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signInWithRedirect = (provider) => {
    return auth().signInWithRedirect(provider);
  };

  const getRedirectResult = () => {
    return auth().getRedirectResult();
    // Don't setUser here, Firebase will update via onAuthStateChanged
  };

  const signUp = (email, password) => {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signOut = () => {
    return auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  const sendEmailVerification = () => {
    if (!user) return false;
    return sendEmailVerificationToUser(user);
  };

  const reloadUser = () => {
    if (!user) return false;
    return user.reload().then(() => {
      setUser(user);
      return true;
    });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any component that
  // utilizes this hook to re-render with the latest auth object.
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signIn,
    signInWithRedirect,
    getRedirectResult,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    sendEmailVerification,
    reloadUser,
  };
}
