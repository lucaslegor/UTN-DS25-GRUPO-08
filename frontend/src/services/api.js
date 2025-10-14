const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

// ===== Helpers de auth en localStorage (sólo access token + user "seguro") =====
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

// Actualiza sólo el token en localStorage, preservando user
function setAuthToken(token) {
  const auth = getAuth() || {};
  const next = { ...auth, token };
  saveAuth(next);
  return next;
}

// ===== Llamada al backend para refrescar token usando la cookie httpOnly =====
async function refreshAccessToken() {
  const res = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // MUY IMPORTANTE para enviar cookies
  });

  // si no hay refresh cookie válida, el backend devolverá 401/403
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    clearAuth();
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  // esperamos { token, user? }
  if (!data?.token) {
    clearAuth();
    throw new Error('No se recibió token nuevo en refresh');
  }
  return setAuthToken(data.token);
}

// ===== Wrapper de fetch con retry en 401 (refresh + reintento UNA vez) =====
export async function apiFetch(path, { method = 'GET', headers = {}, body, _retry } = {}) {
  const auth = getAuth();
  const h = { 'Content-Type': 'application/json', ...headers };
  if (auth?.token) h.Authorization = `Bearer ${auth.token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include', // MUY IMPORTANTE para cookies httpOnly
  });

  // si expira el access token, intentamos refresh y reintentamos una vez
  if (res.status === 401 && !_retry) {
    try {
      await refreshAccessToken(); // renueva y guarda el token
      // reintento con _retry = true para no entrar en loop
      return apiFetch(path, { method, headers, body, _retry: true });
    } catch (e) {
      // refresh falló => sesión inválida
      clearAuth();
      throw e;
    }
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// ====== AUTH ======

// Login: backend devolverá { token, user }, y también setea cookie del refresh
export async function loginApi({ username, mail, password }) {
  // según tu validación, puedes enviar username o mail; aquí soportamos ambos
  const payload = mail ? { mail, password } : { username, password };

  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: payload,
  });

  // guardamos token y user en localStorage
  saveAuth(data); // data = { token, user }
  return data;
}

// Registro: crea usuario (rol opcional, servidor default = USUARIO/USUARIO)
export async function registerApi({ username, mail, password, rol }) {
  return apiFetch('/api/usuarios', {
    method: 'POST',
    body: { username, mail, password, rol },
  });
}

// Obtener el usuario actual desde el backend (requiere Authorization y cookies)
export async function getMeApi() {
  // usa el token actual y cookies por si el servidor necesita
  // si el token expiró, apiFetch hará refresh y reintentará.
  return apiFetch('/api/auth/user', { method: 'GET' });
}

// Logout: limpia cookie httpOnly del refresh en el backend y limpiamos localStorage
export async function logoutApi() {
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  } finally {
    clearAuth();
  }
}
