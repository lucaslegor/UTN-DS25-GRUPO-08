import React, { useEffect, useState } from "react";
import { apiFetch, getAuth } from "../services/api";
import "../styles/UserProfile.css";

async function apiGetUser(username) {
  if (!username) return null;
  try {
    // Usar el endpoint /auth/user que devuelve la información del usuario actual
    const data = await apiFetch(`/auth/user`);
    return data?.user || data || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

async function apiUpdateUser(currentUsername, payload) {
  if (!currentUsername) throw new Error("No hay usuario actual");
  try {
    // Usar el endpoint /auth/user para actualizar el perfil propio
    const data = await apiFetch(`/auth/user`, {
      method: "PUT",
      body: payload,
    });
    return data;
  } catch (error) {
    throw new Error(error?.message || "Error actualizando usuario");
  }
}

/* ===== Secciones ===== */
const SECTIONS = [
  { id: "cuenta", label: "Cuenta de usuario", icon: "bi-shield-lock" },
];

export default function UserProfile() {
  const [active, setActive] = useState("cuenta");
  const [editing, setEditing] = useState(null); // 'cuenta' | null
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Usuario actual (para PUT /:username y para key localStorage)
  const [currentUsername, setCurrentUsername] = useState("");

  // Estado principal
  const [user, setUser] = useState({
    // Cuenta
    username: "",
    email: "",
    profileImage: "",
  });

  // Borrador de edición
  const [draft, setDraft] = useState(user);

  // Helpers para foto de perfil
  const profileImageKey = (u) => `profileImage:${u || ""}`;
  const loadProfileImage = (u) => {
    try {
      return localStorage.getItem(profileImageKey(u)) || "";
    } catch {
      return "";
    }
  };
  const saveProfileImage = (u, imageData) => {
    localStorage.setItem(profileImageKey(u), imageData);
  };
  const migrateProfileImageKey = (oldU, newU) => {
    if (!oldU || !newU || oldU === newU) return;
    const oldImage = localStorage.getItem(profileImageKey(oldU));
    if (oldImage) {
      localStorage.setItem(profileImageKey(newU), oldImage);
      localStorage.removeItem(profileImageKey(oldU));
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
          // cargar foto de perfil local para ese username
          const profileImage = loadProfileImage(next.username);
          if (profileImage) {
            next.profileImage = profileImage;
          }
          setCurrentUsername(next.username);
        }

        setUser(next);
        setDraft(next);

        // sincroniza localStorage.auth.user si faltaba el mail
        if (auth?.user) {
          const merged = { ...auth.user, username: next.username, mail: next.email, profileImage: next.profileImage };
          localStorage.setItem("auth", JSON.stringify({ ...auth, user: merged }));
        }
      } catch {
        setMsg("No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Listener para cambios en localStorage (para actualizar la foto en tiempo real)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'auth' && e.newValue) {
        try {
          const auth = JSON.parse(e.newValue);
          if (auth?.user?.profileImage && auth.user.profileImage !== user.profileImage) {
            setUser(prev => ({ ...prev, profileImage: auth.user.profileImage }));
            setDraft(prev => ({ ...prev, profileImage: auth.user.profileImage }));
          }
        } catch (error) {
          console.error('Error parsing auth from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user.profileImage]);

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
    if (name === "username" || name === "email") {
      setDraft((d) => ({ ...d, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Limpiar mensajes anteriores
    setMsg('');
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setMsg('Por favor selecciona un archivo de imagen válido (JPG, PNG, GIF, etc.)');
      return;
    }
    
    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMsg('La imagen no puede ser mayor a 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      setDraft((d) => ({ ...d, profileImage: imageData }));
      setMsg('Imagen cargada correctamente. Haz clic en "Guardar" para aplicar los cambios.');
    };
    reader.onerror = () => {
      setMsg('Error al cargar la imagen. Inténtalo de nuevo.');
    };
    reader.readAsDataURL(file);
  };

  async function saveSection(section) {
    setLoading(true);
    setMsg("");
    try {
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

      // Guardar foto de perfil localmente
      if (draft.profileImage !== user.profileImage) {
        saveProfileImage(currentUsername || draft.username, draft.profileImage);
      }

      if (Object.keys(payload).length === 0 && draft.profileImage === user.profileImage) {
        setMsg("Nada para guardar");
        setEditing(null);
        setLoading(false);
        return;
      }

      let resp = {};
      if (Object.keys(payload).length > 0) {
        resp = await apiUpdateUser(currentUsername || user.username, payload);
      }

      const updated = resp?.usuario || resp || {};
      const newUsername = updated.username ?? payload.username ?? user.username;
      const newEmail = updated.mail ?? payload.mail ?? user.email;

      // Migrar foto de perfil local si cambió el username
      if (newUsername && (currentUsername || user.username) && newUsername !== (currentUsername || user.username)) {
        migrateProfileImageKey(currentUsername || user.username, newUsername);
      }

      const next = {
        ...user,
        username: newUsername,
        email: newEmail,
        profileImage: draft.profileImage,
      };
      setUser(next);
      setDraft(next);
      setCurrentUsername(newUsername);

      // actualiza localStorage.auth.user
      const auth = getAuth();
      if (auth?.user) {
        const merged = { ...auth.user, username: newUsername, mail: newEmail, profileImage: draft.profileImage };
        localStorage.setItem("auth", JSON.stringify({ ...auth, user: merged }));
        
        // Disparar evento personalizado para notificar cambios
        window.dispatchEvent(new CustomEvent('profileImageChanged', { 
          detail: { profileImage: draft.profileImage, username: newUsername } 
        }));
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
              {/* Foto de perfil */}
              <div className="profile-image-section">
                <label>
                  <span>Foto de perfil</span>
                  <div className="profile-image-container">
                    <div className="profile-image-preview">
                      {(editing ? draft : user).profileImage ? (
                        <img 
                          src={(editing ? draft : user).profileImage} 
                          alt="Foto de perfil" 
                          className="profile-image"
                        />
                      ) : (
                        <div className="profile-image-placeholder">
                          <i className="bi bi-person-circle"></i>
                        </div>
                      )}
                    </div>
                    {editing === "cuenta" && (
                      <div className="profile-image-actions">
                        <input
                          type="file"
                          id="profileImage"
                          name="profileImage"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="profileImage" className="btn">
                          <i className="bi bi-camera"></i>
                          {(editing ? draft : user).profileImage ? 'Cambiar foto' : 'Agregar foto'}
                        </label>
                        {(editing ? draft : user).profileImage && (
                          <button
                            type="button"
                            className="btn"
                            onClick={() => setDraft((d) => ({ ...d, profileImage: "" }))}
                          >
                            <i className="bi bi-trash"></i>
                            Eliminar
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </label>
              </div>

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

              {/* Enlace para cambiar contraseña */}
              <div className="password-section">
                <label>
                  <span>Contraseña</span>
                  <div className="password-info">
                    <p>Para cambiar tu contraseña, haz clic en el siguiente enlace:</p>
                    <a 
                      href="/forgot-password" 
                      className="btn primary"
                      style={{ display: 'inline-block', marginTop: '8px' }}
                    >
                      <i className="bi bi-key"></i>
                      Cambiar contraseña
                    </a>
                  </div>
                </label>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
