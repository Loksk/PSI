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

export function getStudentId() {
  return localStorage.getItem("studentId") ?? "";
}
