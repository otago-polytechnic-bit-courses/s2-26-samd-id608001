import * as SecureStore from "expo-secure-store";

const ACCESS_KEY = "fittrack.access";
const REFRESH_KEY = "fittrack.refresh";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

interface Token {
    access: string,
    refresh: string,
}

export async function saveToken(token: Token): Promise<void> {
  await SecureStore.setItemAsync(ACCESS_KEY, token.access);
  await SecureStore.setItemAsync(REFRESH_KEY, token.refresh);
}

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(ACCESS_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_KEY);
}

export async function refreshToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  const response = await fetch(`${BASE_URL}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Invalid refresh token");
  }

  const data: Token = await response.json();
  await saveToken(data);
  return data.access;
}

export async function clearToken(): Promise<void> {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
}

export async function login(username: string, password: string): Promise<void> {
  const response = await fetch("http://10.0.2.2:8000/api/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  const data: Token = await response.json();
  await saveToken(data);
}