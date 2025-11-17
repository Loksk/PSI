import { UserRole } from '../types';

const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  role: UserRole;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Unable to sign in with the provided credentials.');
  }

  return response.json();
}

export function getStudentId() {
  return localStorage.getItem("studentId") ?? "";
}
