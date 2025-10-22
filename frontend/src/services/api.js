// services/api.js
const RAW_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");
const API_URL = RAW_BASE.endsWith("/api") ? RAW_BASE : `${RAW_BASE}/api`;

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
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include', // envía cookie httpOnly del refresh
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.token) {
    clearAuth();
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  
  // Mantener la foto de perfil existente al refrescar el token
  const currentAuth = getAuth();
  if (currentAuth?.user?.profileImage && data?.user) {
    data.user.profileImage = currentAuth.user.profileImage;
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
  console.log(`apiFetch: ${method} ${path}`);
  
  // 1) Refresh preventivo si hay token
  const auth = getAuth();
  console.log('apiFetch: Auth inicial:', auth ? 'Token presente' : 'Sin token');
  
  if (auth?.token) {
    console.log('apiFetch: Verificando si token necesita refresh...');
    await ensureFreshToken();
  }

  // 2) Obtener auth actualizado después del refresh
  const freshAuth = getAuth();
  console.log('apiFetch: Auth después de refresh:', freshAuth ? 'Token presente' : 'Sin token');
  
  // Armar headers con token actualizado
  const h = { 'Content-Type': 'application/json', ...headers };
  if (freshAuth?.token) h.Authorization = `Bearer ${freshAuth.token}`;

  const doReq = () =>
    fetch(`${API_URL}${path}`, {
      method,
      headers: h,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', // importante para cookies httpOnly
    });

  let res = await doReq();
  console.log(`apiFetch: Respuesta ${res.status} para ${path}`);

  // 3) Si aún hay error 401/403, intentar refresh reactivo una vez más
  if (freshAuth?.token && (res.status === 401 || res.status === 403) && !_retry) {
    console.log('apiFetch: Token aún expirado, intentando refresh reactivo...');
    try {
      await refreshAccessToken();
      const finalAuth = getAuth();
      if (finalAuth?.token) h.Authorization = `Bearer ${finalAuth.token}`;
      res = await doReq();
      console.log(`apiFetch: Respuesta después de refresh reactivo ${res.status} para ${path}`);
    } catch (e) {
      console.log('apiFetch: Error en refresh reactivo, limpiando auth');
      clearAuth();
      throw e;
    }
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    console.log(`apiFetch: Error ${res.status}: ${msg}`);
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
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: payload,
  });
  
  // Cargar foto de perfil desde localStorage específico del usuario
  if (data?.user?.username) {
    const userProfileImage = localStorage.getItem(`profileImage:${data.user.username}`);
    if (userProfileImage) {
      data.user.profileImage = userProfileImage;
    }
  }
  
  // guardamos token + user (el refresh queda en cookie httpOnly)
  saveAuth(data);
  return data;
}

// Registro (rol opcional; server default = USUARIO/USUARIO)
export async function registerApi({ username, mail, password, rol }) {
  return apiFetch('/usuarios', {
    method: 'POST',
    body: { username, mail, password, rol },
  });
}

// Quién soy (protegido). Si el token expira, apiFetch hará refresh y reintentará.
export async function getMeApi() {
  return apiFetch('/auth/user', { method: 'GET' });
}

// Logout: limpia cookie httpOnly en backend y localStorage en frontend
export async function logoutApi() {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } finally {
    clearAuth();
  }
}

// === Password reset ===

export async function resetPasswordApi({ token, newPassword }) {
  return apiFetch('/auth/reset', {
    method: 'POST',
    body: { token, newPassword }, 
  });
}

export async function forgotPasswordApi(mail) {
  return apiFetch('/auth/forgot', {
    method: 'POST',
    body: { mail, origin: window.location.origin }, // <= importante
  });
}

/* ==============
   POLIZAS endpoints
   ============== */

export async function listPolizasApi() {
  // Devuelve { polizas, total }
  return apiFetch('/polizas', { method: 'GET' });
}

export async function getPolizaApi(id) {
  return apiFetch(`/polizas/${id}`, { method: 'GET' });
}

export async function createPolizaForSolicitudApi(idSolicitud, { archivoUrl }) {
  return apiFetch(`/api/polizas/${idSolicitud}`, {
    method: 'POST',
    body: { archivoUrl },
  });
}

/* ==============
   SOLICITUDES endpoints
   ============== */

export async function listSolicitudesApi() {
  // Admin: lista todos; Usuario: el backend actual lista todos también, ajustar si cambia
  return apiFetch('/solicitudes', { method: 'GET' });
}

export async function getSolicitudApi(id) {
  return apiFetch(`/solicitudes/${id}`, { method: 'GET' });
}

// Multipart upload for poliza files
export async function uploadPolizaFileApi(idSolicitud, file) {
  const auth = getAuth();
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/polizas/${idSolicitud}`, {
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