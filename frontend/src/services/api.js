// services/api.js
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

/* =========================
   Auth helpers (localStorage)
   ========================= */
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

// (opcional) headers ya con Authorization para usos puntuales
export function authHeaders(extra = {}) {
  const auth = getAuth();
  const h = { 'Content-Type': 'application/json', ...extra };
  if (auth?.token) h.Authorization = `Bearer ${auth.token}`;
  return h;
}

/* =========================================
   Refresh preventivo y retry anti-401/403
   ========================================= */
let refreshInFlight = null;

function getTokenExpMs(token) {
  try {
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(b64));
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

async function refreshAccessToken() {
  const res = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include', // envía cookie httpOnly del refresh
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.token) {
    clearAuth();
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  setAuthToken(data.token);
  return data.token;
}

async function ensureFreshToken() {
  const auth = getAuth();
  if (!auth?.token) return;

  const expMs = getTokenExpMs(auth.token);
  const now = Date.now();
  const SKEW = 30_000; // refrescar si faltan < 30s

  if (!expMs || expMs - SKEW > now) return;

  if (!refreshInFlight) {
    refreshInFlight = refreshAccessToken().finally(() => { refreshInFlight = null; });
  }
  await refreshInFlight;
}

/* =========================
   apiFetch con refresh
   ========================= */
export async function apiFetch(path, { method = 'GET', headers = {}, body, _retry = false } = {}) {
  // 1) refresh preventivo antes de pegarle al endpoint
  await ensureFreshToken();

  // 2) armo headers con token (puede haber cambiado tras refresh)
  const auth = getAuth();
  const h = { 'Content-Type': 'application/json', ...headers };
  if (auth?.token) h.Authorization = `Bearer ${auth.token}`;

  const doReq = () =>
    fetch(`${API_URL}${path}`, {
      method,
      headers: h,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', // importante para cookies httpOnly
    });

  let res = await doReq();

  // 3) fallback: si igual devolvió 401/403, intento refrescar y reintentar 1 vez
  if ((res.status === 401 || res.status === 403) && !_retry) {
    try {
      await refreshAccessToken();
      const fresh = getAuth();
      if (fresh?.token) h.Authorization = `Bearer ${fresh.token}`;
      res = await doReq();
    } catch (e) {
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

/* ==============
   AUTH endpoints
   ============== */

// Login: el backend devuelve { token, user } y setea cookie httpOnly (refresh)
export async function loginApi({ username, mail, password }) {
  // tu backend acepta username o mail; enviamos el que tengas
  const payload = mail ? { mail, password } : { username, password };
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: payload,
  });
  // guardamos token + user (el refresh queda en cookie httpOnly)
  saveAuth(data);
  return data;
}

// Registro (rol opcional; server default = USUARIO/USUARIO)
export async function registerApi({ username, mail, password, rol }) {
  return apiFetch('/api/usuarios', {
    method: 'POST',
    body: { username, mail, password, rol },
  });
}

// Quién soy (protegido). Si el token expira, apiFetch hará refresh y reintentará.
export async function getMeApi() {
  return apiFetch('/api/auth/user', { method: 'GET' });
}

// Logout: limpia cookie httpOnly en backend y localStorage en frontend
export async function logoutApi() {
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } finally {
    clearAuth();
  }
}

// === Password reset ===

export async function resetPasswordApi({ token, password }) {
  return apiFetch('/api/auth/reset', {
    method: 'POST',
    body: { token, password },
  });
}

export async function forgotPasswordApi(mail) {
  return apiFetch('/api/auth/forgot', {
    method: 'POST',
    body: { mail, origin: window.location.origin }, // <= importante
  });
}

/* ==============
   POLIZAS endpoints
   ============== */

export async function listPolizasApi() {
  // Devuelve { polizas, total }
  return apiFetch('/api/polizas', { method: 'GET' });
}

export async function getPolizaApi(id) {
  return apiFetch(`/api/polizas/${id}`, { method: 'GET' });
}

export async function createPolizaForPedidoApi(idPedido, { archivoUrl }) {
  return apiFetch(`/api/polizas/${idPedido}`, {
    method: 'POST',
    body: { archivoUrl },
  });
}

/* ==============
   PEDIDOS endpoints
   ============== */

export async function listPedidosApi() {
  // Admin: lista todos; Usuario: el backend actual lista todos también, ajustar si cambia
  return apiFetch('/api/pedidos', { method: 'GET' });
}

export async function getPedidoApi(id) {
  return apiFetch(`/api/pedidos/${id}`, { method: 'GET' });
}

// Multipart upload for poliza files
export async function uploadPolizaFileApi(idPedido, file) {
  const auth = getAuth();
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/api/polizas/${idPedido}`, {
    method: 'POST',
    headers: auth?.token ? { Authorization: `Bearer ${auth.token}` } : undefined,
    body: form,
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}