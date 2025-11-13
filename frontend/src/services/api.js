const RAW_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");
const API_URL = `${RAW_BASE}/api`;

// Solo guardar user, NO token (los tokens ahora están en cookies httpOnly)
export function getAuth() {
  const raw = localStorage.getItem('auth');
  try { 
    const auth = raw ? JSON.parse(raw) : null;
    if (auth && auth.token) {
      // Eliminar token si existe (migración)
      delete auth.token;
      saveAuth(auth);
    }
    return auth;
  } catch { return null; }
}
export function saveAuth(auth) {
  // Guardar solo user, NO token
  const { token, ...userData } = auth;
  localStorage.setItem('auth', JSON.stringify({ user: userData.user || userData }));
  // Disparar evento para actualizar componentes que dependen del estado de auth
  window.dispatchEvent(new Event('authChanged'));
}
export function clearAuth() {
  localStorage.removeItem('auth');
  // Disparar evento para actualizar componentes que dependen del estado de auth
  window.dispatchEvent(new Event('authChanged'));
}

export function authHeaders(extra = {}) {
  // El token ahora viene automáticamente en la cookie con credentials: 'include'
  // NO agregar Authorization header
  return { 'Content-Type': 'application/json', ...extra };
}

let refreshInFlight = null;

async function refreshAccessToken() {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    clearAuth();
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  
  // El token ahora viene en cookie, no en el body
  // Solo actualizar user si viene en la respuesta
  if (data?.user) {
    const currentAuth = getAuth();
    if (currentAuth?.user?.profileImage) {
      data.user.profileImage = currentAuth.user.profileImage;
    }
    saveAuth({ user: data.user });
  }
  
  return true; // Token está en cookie
}

export async function apiFetch(path, { method = 'GET', headers = {}, body, _retry = false } = {}) {
  // El token viene automáticamente en la cookie con credentials: 'include'
  // NO agregar Authorization header
  const h = { 'Content-Type': 'application/json', ...headers };

  const doReq = () =>
    fetch(`${API_URL}${path}`, {
      method,
      headers: h,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', // ✅ Esto envía las cookies automáticamente
    });

  let res = await doReq();

  // Si recibimos 401/403, intentar refrescar el token
  if ((res.status === 401 || res.status === 403) && !_retry) {
    try {
      await refreshAccessToken();
      // Reintentar la petición (el nuevo token está en cookie)
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

export async function loginApi({ username, mail, password, recaptchaToken }) {
  const payload = mail ? { mail, password, recaptchaToken } : { username, password, recaptchaToken };
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: payload,
  });
  
  // El token ahora viene en cookie, no en el body
  // Solo guardar user
  if (data?.user?.username) {
    const userProfileImage = localStorage.getItem(`profileImage:${data.user.username}`);
    if (userProfileImage) {
      data.user.profileImage = userProfileImage;
    }
  }
  
  saveAuth({ user: data.user });
  return data;
}

export async function loginWithGoogleApi(token) {
  const data = await apiFetch('/auth/google', {
    method: 'POST',
    body: { token },
  });
  
  // El token ahora viene en cookie, no en el body
  // Solo guardar user
  if (data?.user?.username) {
    const userProfileImage = localStorage.getItem(`profileImage:${data.user.username}`);
    if (userProfileImage) {
      data.user.profileImage = userProfileImage;
    }
  }
  
  saveAuth({ user: data.user });
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
  // El token viene automáticamente en la cookie con credentials: 'include'
  // NO agregar Authorization header
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/polizas/${idSolicitud}`, {
    method: 'POST',
    body: form,
    credentials: 'include', // ✅ Esto envía las cookies automáticamente
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}