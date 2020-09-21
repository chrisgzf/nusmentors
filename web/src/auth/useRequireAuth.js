import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useAuth from "./useAuth";

// Adapted from https://usehooks.com/useRequireAuth
export default function useRequireAuth(
  requireVerification = false,
  loggedOutRedirectUrl = "/login",
  unverifiedRedirectUrl = "/dashboard",
) {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    // If auth.user is false that means we're not
    // logged in and should redirect.
    if (auth.user === false) {
      history.push(loggedOutRedirectUrl);
    }
    // Otherwise, redirect if we are logged in and require verification but is
    // unverified.
    else if (requireVerification && auth.user && !auth.user.emailVerified) {
      history.push(unverifiedRedirectUrl);
    }
  }, [
    auth,
    history,
    loggedOutRedirectUrl,
    requireVerification,
    unverifiedRedirectUrl,
  ]);

  return auth;
}
