const RAW_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");
const API_URL = `${RAW_BASE}/api`;

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
function setAuthToken(token) {
  const auth = getAuth() || {};
  const next = { ...auth, token };
  saveAuth(next);
  return next;
}

export function authHeaders(extra = {}) {
  const auth = getAuth();
  const h = { 'Content-Type': 'application/json', ...extra };
  if (auth?.token) h.Authorization = `Bearer ${auth.token}`;
  return h;
}

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
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.token) {
    clearAuth();
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  
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

export async function apiFetch(path, { method = 'GET', headers = {}, body, _retry = false, timeout = 10000 } = {}) {
  const auth = getAuth();
  
  if (auth?.token) {
    await ensureFreshToken();
  }

  const freshAuth = getAuth();
  
  const h = { 'Content-Type': 'application/json', ...headers };
  if (freshAuth?.token) h.Authorization = `Bearer ${freshAuth.token}`;

  const doReq = () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    return fetch(`${API_URL}${path}`, {
      method,
      headers: h,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));
  };

  let res;
  try {
    res = await doReq();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('La solicitud tardó demasiado tiempo. Por favor, intenta de nuevo.');
    }
    throw new Error('Error de conexión. Verifica tu conexión a internet.');
  }

  if (freshAuth?.token && (res.status === 401 || res.status === 403) && !_retry) {
    try {
      await refreshAccessToken();
      const finalAuth = getAuth();
      if (finalAuth?.token) h.Authorization = `Bearer ${finalAuth.token}`;
      res = await doReq();
    } catch (e) {
      clearAuth();
      throw e;
    }
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Mejorar mensajes de error específicos
    if (res.status === 404) {
      throw new Error(data?.message || 'No encontrado');
    } else if (res.status === 403) {
      throw new Error('No tienes permisos para realizar esta acción');
    } else if (res.status === 401) {
      throw new Error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
    } else if (res.status >= 500) {
      throw new Error('Error del servidor. Por favor, intenta más tarde.');
    }
    
    const msg = data?.error || data?.message || `Error HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export async function loginApi({ username, mail, password, recaptchaToken }) {
  const payload = mail ? { mail, password, recaptchaToken } : { username, password, recaptchaToken };
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: payload,
  });
  
  if (data?.user?.username) {
    const userProfileImage = localStorage.getItem(`profileImage:${data.user.username}`);
    if (userProfileImage) {
      data.user.profileImage = userProfileImage;
    }
  }
  
  saveAuth(data);
  return data;
}

export async function loginWithGoogleApi(token) {
  const data = await apiFetch('/auth/google', {
    method: 'POST',
    body: { token },
  });
  
  if (data?.user?.username) {
    const userProfileImage = localStorage.getItem(`profileImage:${data.user.username}`);
    if (userProfileImage) {
      data.user.profileImage = userProfileImage;
    }
  }
  
  saveAuth(data);
  return data;
}

export async function registerApi({ username, mail, password, rol, recaptchaToken }) {
  return apiFetch('/usuarios', {
    method: 'POST',
    body: { username, mail, password, rol, recaptchaToken },
  });
}

export async function getMeApi() {
  return apiFetch('/auth/user', { method: 'GET' });
}

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

export async function listPolizasApi() {
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

export async function listSolicitudesApi() {
  return apiFetch('/solicitudes', { method: 'GET' });
}

export async function getSolicitudApi(id) {
  return apiFetch(`/solicitudes/${id}`, { method: 'GET' });
}

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