import { useSelector } from "react-redux";
import { selectJWT } from "./firebase";

const backendHost = process.env.REACT_APP_BACKEND_HOST
  ? process.env.z
  : process.env.NODE_ENV === "development"
  ? "http://localhost:8080"
  : "https://someherokuurl";

console.log(`Backend host: ${backendHost}`);

function sendBackendRequest(endpoint, method, data, headers) {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const actualHeaders = { ...defaultHeaders, ...headers };

  return fetch(`${backendHost}/${endpoint}`, {
    method, // GET POST PUT DELETE etc
    headers: actualHeaders,
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }
    return response.json();
  });
}

export function useBackend() {
  const token = useSelector(selectJWT);

  async function sendRequest(endpoint, method, data, headers) {
    let additionalHeaders;

    // Add JWT token to request headers if it exists
    if (token) {
      additionalHeaders = { ...headers, Authorization: `Bearer ${token}` };
    } else {
      additionalHeaders = headers;
    }
    return sendBackendRequest(endpoint, method, data, additionalHeaders);
  }
  return { sendRequest };
}

export function sendRequest(endpoint, method, data, headers) {
  return async (dispatch, getState) => {
    const token = selectJWT(getState());
    let additionalHeaders;

    // Add JWT token to request headers if it exists
    if (token) {
      additionalHeaders = { ...headers, Authorization: `Bearer ${token}` };
    } else {
      additionalHeaders = headers;
    }
    return sendBackendRequest(endpoint, method, data, additionalHeaders);
  };
}
