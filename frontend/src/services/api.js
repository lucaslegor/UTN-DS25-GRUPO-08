// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function getAuth() {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
export function saveAuth(auth) {
  localStorage.setItem("auth", JSON.stringify(auth));
}
export function clearAuth() {
  localStorage.removeItem("auth");
}

async function parseJSON(res) {
  if (res.status === 204) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiFetch(
  path,
  { method = "GET", headers = {}, body } = {}
) {
  const auth = getAuth();
  const h = { "Content-Type": "application/json", ...headers };
  if (auth?.token) h.Authorization = `Bearer ${auth.token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = (await parseJSON(res)) ?? {};
  if (!res.ok) {
    const msg =
      data?.error ||
      data?.message ||
      (data?.issues ? JSON.stringify(data.issues) : null) ||
      `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

/* ====== AUTH ====== */
export async function loginApi({ mail, password }) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: { mail, password },
  });
  saveAuth(data);
  return data;
}

export async function userApi() {
  return apiFetch("/api/auth/user");
}

export function logout() {
  clearAuth();
}

/* ====== USUARIOS ====== */
export async function registerApi({ username, mail, password, rol }) {
  return apiFetch("/api/usuarios", {
    method: "POST",
    body: { username, mail, password, rol }, // rol opcional; backend default = USUARIO
  });
}

// GET /api/usuarios  (lista)
export async function listUsersApi() {
  return apiFetch("/api/usuarios");
}

// GET /api/usuarios/:username  (detalle)
export async function getUserByUsernameApi(username) {
  return apiFetch(`/api/usuarios/${encodeURIComponent(username)}`);
}

// PUT /api/usuarios/:username  (actualiza)
export async function updateUserApi(username, partial) {
  return apiFetch(`/api/usuarios/${encodeURIComponent(username)}`, {
    method: "PUT",
    body: partial,
  });
}
