import * as SecureStore from 'expo-secure-store';

const ACCESS_KEY = 'myrecipebook.access';
const ACCESS_EXPIRY_KEY = 'myrecipebook.access_expiry';
const REFRESH_KEY = 'myrecipebook.refresh';
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:8000/api';

interface Token {
  access: string;
  refresh?: string;
  access_expiry: string;
}

export async function saveToken(token: Token): Promise<void> {
  await SecureStore.setItemAsync(ACCESS_KEY, token.access);
  await SecureStore.setItemAsync(ACCESS_EXPIRY_KEY, token.access_expiry);
  if (token.refresh) await SecureStore.setItemAsync(REFRESH_KEY, token.refresh);
}

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(ACCESS_KEY);
}

export async function isTokenValid(): Promise<boolean> {
  const access_expiry: string | null =
    await SecureStore.getItemAsync(ACCESS_EXPIRY_KEY);
  if (access_expiry !== null) {
    // Consider the token expired 30 seconds early to handle network latency
    const expirationBuffer = 30 * 1000;
    const expiryTime: number =
      new Date(access_expiry).getTime() - expirationBuffer;
    const currentTime: number = Date.now();
    if (currentTime < expiryTime)
      // Token is still valid return it
      return true;
    else
      // Token is invalid refresh it
      return false;
  } else
    // No token stored, consider it invalid
    return false;
}

export async function getValidToken(): Promise<string | null> {
  if (await isTokenValid()) return getToken();
  else return refreshToken();
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_KEY);
}

export async function refreshToken(): Promise<string | null> {
  const refresh = await getRefreshToken();
  if (!refresh) return null;
  const response = await fetch(`${BASE_URL}/auth/login/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    await clearToken(); // Clear storage on invalid/expired refresh token
    return null;
  }

  const data: Token = await response.json();
  await saveToken(data);
  return data.access;
}

export async function clearToken(): Promise<void> {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
  await SecureStore.deleteItemAsync(ACCESS_EXPIRY_KEY);
}

export async function login(username: string, password: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid username or password');
  }

  const data: Token = await response.json();
  await saveToken(data);
}

export async function register(
  username: string,
  password: string,
): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }
}
