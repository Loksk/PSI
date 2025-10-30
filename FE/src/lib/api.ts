// src/lib/api.ts
export const API = import.meta.env.VITE_API_URL;

export async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
  });
  if (!res.ok) throw new Error(await res.text());

  return res.json();
}
