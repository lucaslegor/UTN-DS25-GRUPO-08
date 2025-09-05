const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export function getAuth() {
  const raw = localStorage.getItem('auth');
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}
export function saveAuth(auth) {
  localStorage.setItem('auth', JSON.stringify(auth));
}
export function clearAuth() {
  localStorage.removeItem('auth');
}

export async function apiFetch(path, { method = 'GET', headers = {}, body } = {}) {
  const auth = getAuth();
  const h = { 'Content-Type': 'application/json', ...headers };
  if (auth?.token) h.Authorization = `Bearer ${auth.token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// === Auth ===
export async function loginApi({ username, mail, password }) {
  const data = await apiFetch('/api/usuarios/login', {
    method: 'POST',
    body: { username, mail, password },
  }); 
  saveAuth(data);
  return data;
}

export async function registerApi({ username, mail, password, rol }) {
  // rol es opcional; server default = USUARIO
  return apiFetch('/api/usuarios', {
    method: 'POST',
    body: { username, mail, password, rol },
  }); 
}