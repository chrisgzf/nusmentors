import { auth as firebaseAuth } from "auth/firebase";
import useAuth from "auth/useAuth";

const backendHost = process.env.REACT_APP_BACKEND_HOST
  ? process.env.REACT_APP_BACKEND_HOST
  : process.env.NODE_ENV === "development"
  ? "http://localhost:8080"
  : "https://someherokuurl";

console.log(`Backend host: ${backendHost}`);

function sendBackendRequest(endpoint, method, data, headers) {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const actualHeaders = { ...defaultHeaders, ...headers };

  return fetch(`${backendHost}/${endpoint}`, {
    method, // GET POST PUT DELETE etc
    headers: actualHeaders,
    body: JSON.stringify(data),
  });
}

export function useBackend() {
  const { user } = useAuth();

  async function sendRequest(endpoint, method, data, headers) {
    let token;
    let additionalHeaders;

    // Decide if user is logged in, and if user is logged in,
    // add JWT token to request headers
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      token = idTokenResult.token;
    }
    if (token) {
      additionalHeaders = { ...headers, Authorization: `Bearer ${token}` };
    } else {
      additionalHeaders = headers;
    }
    return sendBackendRequest(endpoint, method, data, additionalHeaders);
  }

  return { sendRequest };
}

export async function sendRequest(endpoint, method, data, headers) {
  const { currentUser } = firebaseAuth();
  let additionalHeaders;
  let token;

  // Decide if user is logged in, and if user is logged in,
  // add JWT token to request headers
  if (currentUser) {
    const idTokenResult = await currentUser.getIdTokenResult();
    token = idTokenResult.token;
  }

  if (token) {
    additionalHeaders = { ...headers, Authorization: `Bearer ${token}` };
  } else {
    additionalHeaders = headers;
  }
  return sendBackendRequest(endpoint, method, data, additionalHeaders);
}
