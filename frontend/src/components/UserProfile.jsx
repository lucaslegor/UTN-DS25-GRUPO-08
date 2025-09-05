import React, { useEffect, useState } from "react";
import "../styles/userProfile.css";


const RAW_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");
const API_BASE = RAW_BASE.endsWith("/api") ? RAW_BASE : `${RAW_BASE}/api`;

function getAuth() {
  try {
    return JSON.parse(localStorage.getItem("auth") || "{}");
  } catch {
    return {};
  }
}

async function apiGetUser(username) {
  if (!username) return null;
  const { token } = getAuth();
  const res = await fetch(`${API_BASE}/usuarios/${encodeURIComponent(username)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.usuario || data || null;
}

async function apiUpdateUser(currentUsername, payload) {
  const { token } = getAuth();
  if (!currentUsername) throw new Error("No hay usuario actual");
  if (!token) throw new Error("No autenticado");
  const res = await fetch(`${API_BASE}/usuarios/${encodeURIComponent(currentUsername)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error actualizando usuario");
  }
  return res.json();
}

/* ===== Secciones ===== */
const SECTIONS = [
  { id: "datos", label: "Datos personales", icon: "bi-person-circle" },
  { id: "cuenta", label: "Cuenta de usuario", icon: "bi-shield-lock" },
];

export default function UserProfile() {
  const [active, setActive] = useState("datos");
  const [editing, setEditing] = useState(null); // 'datos' | 'cuenta' | null
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Usuario actual (para PUT /:username y para key localStorage)
  const [currentUsername, setCurrentUsername] = useState("");

  // Estado principal
  const [user, setUser] = useState({
    // Cuenta
    username: "",
    email: "",
    seguridad: {
      ultimoCambioPass: "",
      nuevoPassword: "",
      repeatNuevoPassword: "",
    },
    // Datos personales (solo local)
    datos: {
      nombre: "",
      apellido: "",
      dni: "",
      nacimiento: "",
      direccion: "",
      ciudad: "",
      provincia: "",
      cp: "",
    },
  });

  // Borrador de edición
  const [draft, setDraft] = useState(user);

  // Helpers para datos personales local
  const extraKey = (u) => `profileExtra:${u || ""}`;
  const loadExtras = (u) => {
    try {
      const raw = localStorage.getItem(extraKey(u));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const saveExtras = (u, datos) => {
    localStorage.setItem(extraKey(u), JSON.stringify(datos));
  };
  const migrateExtrasKey = (oldU, newU) => {
    if (!oldU || !newU || oldU === newU) return;
    const oldRaw = localStorage.getItem(extraKey(oldU));
    if (oldRaw) {
      localStorage.setItem(extraKey(newU), oldRaw);
      localStorage.removeItem(extraKey(oldU));
    }
  };

  // Carga inicial desde localStorage.auth y (opcional) GET /usuarios/:username
  useEffect(() => {
    (async () => {
      setLoading(true);
      setMsg("");
      try {
        const auth = getAuth();
        const localUser = auth?.user || {};
        const localUsername = localUser?.username || "";
        const localMail = localUser?.mail || localUser?.email || "";

        let next = { ...user };
        if (localUsername || localMail) {
          next.username = localUsername;
          next.email = localMail;
        }

        // Si tengo username, intento refrescar contra el backend
        if (localUsername) {
          const remote = await apiGetUser(localUsername);
          if (remote) {
            next.username = remote.username || next.username;
            next.email = remote.mail || next.email;
          }
          // cargar datos personales locales para ese username
          const extras = loadExtras(next.username);
          if (extras) {
            next.datos = { ...next.datos, ...extras };
          }
          setCurrentUsername(next.username);
        }

        setUser(next);
        setDraft(next);

        // sincroniza localStorage.auth.user si faltaba el mail
        if (auth?.user) {
          const merged = { ...auth.user, username: next.username, mail: next.email };
          localStorage.setItem("auth", JSON.stringify({ ...auth, user: merged }));
        }
      } catch {
        setMsg("No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const startEdit = (section) => {
    setEditing(section);
    setDraft(user);
    setMsg("");
  };

  const cancelEdit = () => {
    setEditing(null);
    setDraft(user);
    setMsg("");
  };

  const onInput = (e) => {
    const { name, value } = e.target;
    if (active === "cuenta") {
      if (name === "username" || name === "email") {
        setDraft((d) => ({ ...d, [name]: value }));
      } else {
        setDraft((d) => ({
          ...d,
          seguridad: { ...d.seguridad, [name]: value },
        }));
      }
    } else {
      setDraft((d) => ({
        ...d,
        datos: { ...d.datos, [name]: value },
      }));
    }
  };

  async function saveSection(section) {
    setLoading(true);
    setMsg("");
    try {
      if (section === "datos") {
        // Solo local
        const newDatos = { ...draft.datos };
        saveExtras(currentUsername || draft.username, newDatos);
        const next = { ...user, datos: newDatos };
        setUser(next);
        setDraft(next);
        setMsg("Datos personales guardados (localmente - Por ahora)");
        setEditing(null);
        setLoading(false);
        return;
      }

      // === CUENTA (backend) ===
      const payload = {};
      // cambios de username/mail
      if (draft.username !== user.username) {
        if (!draft.username?.trim()) throw new Error("El usuario no puede estar vacío");
        payload.username = draft.username.trim();
      }
      if (draft.email !== user.email) {
        if (!draft.email?.trim()) throw new Error("El email no puede estar vacío");
        payload.mail = draft.email.trim().toLowerCase();
      }
      // cambio de contraseña (opcional)
      const p1 = draft.seguridad.nuevoPassword || "";
      const p2 = draft.seguridad.repeatNuevoPassword || "";
      if (p1 || p2) {
        if (p1.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres");
        if (p1 !== p2) throw new Error("Las contraseñas no coinciden");
        payload.password = p1;
      }

      if (Object.keys(payload).length === 0) {
        setMsg("Nada para guardar");
        setEditing(null);
        setLoading(false);
        return;
      }

      const resp = await apiUpdateUser(currentUsername || user.username, payload);
      const updated = resp?.usuario || resp || {};

      const newUsername = updated.username ?? payload.username ?? user.username;
      const newEmail = updated.mail ?? payload.mail ?? user.email;

      // Migrar extras locales si cambió el username
      if (newUsername && (currentUsername || user.username) && newUsername !== (currentUsername || user.username)) {
        migrateExtrasKey(currentUsername || user.username, newUsername);
      }

      const next = {
        ...user,
        username: newUsername,
        email: newEmail,
        seguridad: {
          ...user.seguridad,
          ultimoCambioPass: payload.password ? "recién" : user.seguridad.ultimoCambioPass,
          nuevoPassword: "",
          repeatNuevoPassword: "",
        },
      };
      setUser(next);
      setDraft(next);
      setCurrentUsername(newUsername);

      // actualiza localStorage.auth.user
      const auth = getAuth();
      if (auth?.user) {
        const merged = { ...auth.user, username: newUsername, mail: newEmail };
        localStorage.setItem("auth", JSON.stringify({ ...auth, user: merged }));
      }

      setMsg(resp?.message || "Cuenta actualizada");
      setEditing(null);
    } catch (e) {
      setMsg(e.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="profile-layout">
      <aside className="profile-aside">
        <nav>
          <ul className="menu">
            {SECTIONS.map(({ id, label, icon }) => (
              <li key={id}>
                <button
                  className={`menu-btn ${active === id ? "active" : ""}`}
                  onClick={() => {
                    setActive(id);
                    setMsg("");
                  }}
                  disabled={loading}
                >
                  <i className={`bi ${icon}`} />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="profile-content">
        {msg && <div className="profile-msg">{msg}</div>}

        {/* ===== DATOS PERSONALES (LOCAL) ===== */}
        {active === "datos" && (
          <div className="panel">
            <div className="panel-header">
              <h2>Datos personales</h2>
              {editing === "datos" ? (
                <div className="actions">
                  <button className="btn" onClick={cancelEdit} disabled={loading}>
                    Cancelar
                  </button>
                  <button className="btn primary" onClick={() => saveSection("datos")} disabled={loading}>
                    Guardar
                  </button>
                </div>
              ) : (
                <button className="btn" onClick={() => startEdit("datos")} disabled={loading}>
                  Editar
                </button>
              )}
            </div>

            <form
              className="form grid2"
              onSubmit={(e) => {
                e.preventDefault();
                saveSection("datos");
              }}
            >
              <label>
                <span>Nombre</span>
                <input
                  type="text"
                  name="nombre"
                  value={(editing ? draft : user).datos.nombre}
                  onChange={onInput}
                  disabled={editing !== "datos" || loading}
                />
              </label>

              <label>
                <span>Apellido</span>
                <input
                  type="text"
                  name="apellido"
                  value={(editing ? draft : user).datos.apellido}
                  onChange={onInput}
                  disabled={editing !== "datos" || loading}
                />
              </label>

              <label>
                <span>DNI</span>
                <input
                  type="text"
                  name="dni"
                  pattern="[0-9]{7,8}"
                  title="Sólo números, 7 u 8 dígitos"
                  value={(editing ? draft : user).datos.dni}
                  onChange={onInput}
                  disabled={editing !== "datos" || loading}
                />
              </label>

              <label>
                <span>Fecha de nacimiento</span>
                <input
                  type="date"
                  name="nacimiento"
                  value={(editing ? draft : user).datos.nacimiento}
                  onChange={onInput}
                  disabled={editing !== "datos" || loading}
                />
              </label>

              <label>
                <span>Calle</span>
                <input
                  type="text"
                  name="direccion"
                  value={(editing ? draft : user).datos.direccion}
                  onChange={onInput}
                  disabled={editing !== "datos" || loading}
                />
              </label>

              <label>
                <span>Ciudad</span>
                <input
                  type="text"
                  name="ciudad"
                  value={(editing ? draft : user).datos.ciudad}
                  onChange={onInput}
                  disabled={editing !== "datos" || loading}
                />
              </label>

              <label>
                <span>Provincia</span>
                <input
                  type="text"
                  name="provincia"
                  value={(editing ? draft : user).datos.provincia}
                  onChange={onInput}
                  disabled={editing !== "datos" || loading}
                />
              </label>

              <label>
                <span>Código Postal</span>
                <input
                  type="text"
                  name="cp"
                  value={(editing ? draft : user).datos.cp}
                  onChange={onInput}
                  disabled={editing !== "datos" || loading}
                />
              </label>
            </form>
          </div>
        )}

        {/* ===== CUENTA (BACKEND) ===== */}
        {active === "cuenta" && (
          <div className="panel">
            <div className="panel-header">
              <h2>Cuenta de usuario</h2>
              {editing === "cuenta" ? (
                <div className="actions">
                  <button className="btn" onClick={cancelEdit} disabled={loading}>
                    Cancelar
                  </button>
                  <button className="btn primary" onClick={() => saveSection("cuenta")} disabled={loading}>
                    Guardar
                  </button>
                </div>
              ) : (
                <button className="btn" onClick={() => startEdit("cuenta")} disabled={loading}>
                  Editar
                </button>
              )}
            </div>

            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                saveSection("cuenta");
              }}
            >
              <div className="grid2">
                <label>
                  <span>Usuario</span>
                  <input
                    type="text"
                    name="username"
                    value={(editing ? draft : user).username}
                    onChange={onInput}
                    disabled={editing !== "cuenta" || loading}
                    required
                  />
                </label>

                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={(editing ? draft : user).email}
                    onChange={onInput}
                    disabled={editing !== "cuenta" || loading}
                    required
                  />
                </label>
              </div>

              <div className="grid2">
                <label>
                  <span>Nueva contraseña</span>
                  <input
                    type="password"
                    name="nuevoPassword"
                    value={(editing ? draft : user).seguridad.nuevoPassword || ""}
                    onChange={onInput}
                    disabled={editing !== "cuenta" || loading}
                    minLength={8}
                  />
                </label>
                <label>
                  <span>Repetir contraseña</span>
                  <input
                    type="password"
                    name="repeatNuevoPassword"
                    value={(editing ? draft : user).seguridad.repeatNuevoPassword || ""}
                    onChange={onInput}
                    disabled={editing !== "cuenta" || loading}
                    minLength={8}
                  />
                </label>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
