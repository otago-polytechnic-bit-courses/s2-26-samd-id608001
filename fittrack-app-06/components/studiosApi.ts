import { getRefreshToken, getToken, refreshToken } from "./auth";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = await getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = fetch(`${BASE_URL}${path}`, { ...options, headers });

  if ((await response).status === 401) {
    await refreshToken()
    return apiFetch(path, options);
  } else return response;
}

export interface Studio {
  id: number;
  name: string;
  suburb: string;
  city: string;
}

export async function getStudios(): Promise<Studio[]> {
  const response = await apiFetch("/studios/");

  if (!response.ok) {
    throw new Error("Could not load studios");
  }

  return response.json();
}

export async function createStudio(
  studio: Omit<Studio, "id">,
): Promise<Studio> {
  const response = await apiFetch("/studios/", {
    method: "POST",
    body: JSON.stringify(studio),
  });

  if (!response.ok) {
    throw new Error("Could not create studio");
  }

  return response.json();
}

export async function updateStudio(
  studio: Studio,
): Promise<Studio> {
  const response = await apiFetch(`/studios/${studio.id}`, {
    method: "PATCH",
    body: JSON.stringify(studio),
  });

  if (!response.ok) {
    throw new Error("Could not update studio");
  }

  return response.json();
}

export async function deleteStudio(
  studioID: number,
): Promise<void> {
  const response = await apiFetch(`/studios/${studioID}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete studio");
  }

  return response.json();
}