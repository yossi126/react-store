import { redirect } from "react-router-dom";

export function getTokenDuration() {
  // if no expiration return -1 (expired)
  const storedExpirationDate = localStorage.getItem("expiration");
  if (!storedExpirationDate) {
    return -1;
  } else {
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  }
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();

  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  if (token === "EXPIRED") {
    alert("Your session has expired. Please login again.");
    localStorage.clear();
    return redirect("/auth?mode=login");
  }

  return null;
}
