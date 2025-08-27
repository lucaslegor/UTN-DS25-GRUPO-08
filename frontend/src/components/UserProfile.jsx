import React, { useState } from "react";
import "../styles/userProfile.css"; // crea/ajusta este CSS (abajo)

const SECTIONS = [
  { id: "datos", label: "Datos personales", icon: "bi-person-circle" },
  { id: "contacto", label: "Contacto", icon: "bi-envelope" },
  { id: "direccion", label: "Dirección", icon: "bi-geo-alt" },
  { id: "seguridad", label: "Seguridad", icon: "bi-shield-lock" },
  { id: "preferencias", label: "Preferencias", icon: "bi-sliders" },
];

export default function UserProfile({ onSave }) {
  const [active, setActive] = useState("datos");

  // Estado real del usuario (lo que ya está guardado)
  const [user, setUser] = useState({
    nombre: "Justina",
    apellido: "García",
    dni: "40123456",
    nacimiento: "1999-08-10",
    email: "justina@example.com",
    telefono: "+54 9 221 555-1234",
    direccion: "Calle Siempre Viva 742",
    ciudad: "La Plata",
    provincia: "Buenos Aires",
    cp: "1900",
    seguridad: {
      ultimoCambioPass: "hace 3 meses",
      dosFA: false,
      dispositivosActivos: 2,
    },
    preferencias: {
      noticias: true,
      sms: false,
      tema: "claro",
    },
  });

  // Estado de edición: qué sección estoy editando y un borrador
  const [editing, setEditing] = useState(null); // 'datos' | 'contacto' | ...
  const [draft, setDraft] = useState(user);

  const startEdit = (section) => {
    setEditing(section);
    setDraft(user); // clonar estado actual
  };

  const cancelEdit = () => {
    setEditing(null);
    setDraft(user);
  };

  const saveSection = (section) => {
    let updated = { ...user };

    switch (section) {
      case "datos":
        updated = {
          ...user,
          nombre: draft.nombre,
          apellido: draft.apellido,
          dni: draft.dni,
          nacimiento: draft.nacimiento,
        };
        break;

      case "contacto":
        updated = {
          ...user,
          email: draft.email,
          telefono: draft.telefono,
        };
        break;

      case "direccion":
        updated = {
          ...user,
          direccion: draft.direccion,
          ciudad: draft.ciudad,
          provincia: draft.provincia,
          cp: draft.cp,
        };
        break;

      case "seguridad":
        updated = {
          ...user,
          seguridad: {
            ...user.seguridad,
            dosFA: draft.seguridad.dosFA,
            // Para contraseña, sólo simulamos el cambio:
            ultimoCambioPass:
              draft.seguridad?.nuevoPassword?.length ? "recién" : user.seguridad.ultimoCambioPass,
          },
        };
        break;

      case "preferencias":
        updated = {
          ...user,
          preferencias: {
            ...user.preferencias,
            noticias: draft.preferencias.noticias,
            sms: draft.preferencias.sms,
            tema: draft.preferencias.tema,
          },
        };
        break;

      default:
        break;
    }

    setUser(updated);
    setEditing(null);
    setDraft(updated);
    // Hook para guardar en backend si querés:
    onSave && onSave(updated); // opcional
  };

  const onInput = (e) => {
    const { name, value } = e.target;
    setDraft((d) => ({ ...d, [name]: value }));
  };

  return (
    <section className="profile-layout">
      <aside className="profile-aside">
        <nav>
          <ul className="menu">
            {SECTIONS.map(({ id, label, icon }) => (
              <li key={id}>
                <button
                  className={`menu-btn ${active === id ? "active" : ""}`}
                  onClick={() => setActive(id)}
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
        {active === "datos" && (
          <div className="panel">
            <div className="panel-header">
              <h2>Datos personales</h2>
              {editing === "datos" ? (
                <div className="actions">
                  <button className="btn" onClick={cancelEdit}>Cancelar</button>
                  <button className="btn primary" onClick={() => saveSection("datos")}>Guardar</button>
                </div>
              ) : (
                <button className="btn" onClick={() => startEdit("datos")}>Editar</button>
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
                  value={(editing ? draft : user).nombre}
                  onChange={onInput}
                  disabled={editing !== "datos"}
                  required
                />
              </label>

              <label>
                <span>Apellido</span>
                <input
                  type="text"
                  name="apellido"
                  value={(editing ? draft : user).apellido}
                  onChange={onInput}
                  disabled={editing !== "datos"}
                  required
                />
              </label>

              <label>
                <span>DNI</span>
                <input
                  type="text"
                  name="dni"
                  pattern="[0-9]{7,8}"
                  title="Sólo números, 7 u 8 dígitos"
                  value={(editing ? draft : user).dni}
                  onChange={onInput}
                  disabled={editing !== "datos"}
                  required
                />
              </label>

              <label>
                <span>Fecha de nacimiento</span>
                <input
                  type="date"
                  name="nacimiento"
                  value={(editing ? draft : user).nacimiento}
                  onChange={onInput}
                  disabled={editing !== "datos"}
                  required
                />
              </label>
            </form>
          </div>
        )}

        {active === "contacto" && (
          <div className="panel">
            <div className="panel-header">
              <h2>Contacto</h2>
              {editing === "contacto" ? (
                <div className="actions">
                  <button className="btn" onClick={cancelEdit}>Cancelar</button>
                  <button className="btn primary" onClick={() => saveSection("contacto")}>Guardar</button>
                </div>
              ) : (
                <button className="btn" onClick={() => startEdit("contacto")}>Editar</button>
              )}
            </div>

            <form
              className="form grid2"
              onSubmit={(e) => {
                e.preventDefault();
                saveSection("contacto");
              }}
            >
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={(editing ? draft : user).email}
                  onChange={onInput}
                  disabled={editing !== "contacto"}
                  required
                />
              </label>

              <label>
                <span>Teléfono</span>
                <input
                  type="tel"
                  name="telefono"
                  value={(editing ? draft : user).telefono}
                  onChange={onInput}
                  disabled={editing !== "contacto"}
                />
              </label>
            </form>
          </div>
        )}

        {active === "direccion" && (
          <div className="panel">
            <div className="panel-header">
              <h2>Dirección</h2>
              {editing === "direccion" ? (
                <div className="actions">
                  <button className="btn" onClick={cancelEdit}>Cancelar</button>
                  <button className="btn primary" onClick={() => saveSection("direccion")}>Guardar</button>
                </div>
              ) : (
                <button className="btn" onClick={() => startEdit("direccion")}>Editar</button>
              )}
            </div>

            <form
              className="form grid2"
              onSubmit={(e) => {
                e.preventDefault();
                saveSection("direccion");
              }}
            >
              <label>
                <span>Calle</span>
                <input
                  type="text"
                  name="direccion"
                  value={(editing ? draft : user).direccion}
                  onChange={onInput}
                  disabled={editing !== "direccion"}
                  required
                />
              </label>

              <label>
                <span>Ciudad</span>
                <input
                  type="text"
                  name="ciudad"
                  value={(editing ? draft : user).ciudad}
                  onChange={onInput}
                  disabled={editing !== "direccion"}
                  required
                />
              </label>

              <label>
                <span>Provincia</span>
                <input
                  type="text"
                  name="provincia"
                  value={(editing ? draft : user).provincia}
                  onChange={onInput}
                  disabled={editing !== "direccion"}
                  required
                />
              </label>

              <label>
                <span>Código Postal</span>
                <input
                  type="text"
                  name="cp"
                  value={(editing ? draft : user).cp}
                  onChange={onInput}
                  disabled={editing !== "direccion"}
                />
              </label>
            </form>
          </div>
        )}

        {active === "seguridad" && (
          <div className="panel">
            <div className="panel-header">
              <h2>Seguridad</h2>
              {editing === "seguridad" ? (
                <div className="actions">
                  <button className="btn" onClick={cancelEdit}>Cancelar</button>
                  <button className="btn primary" onClick={() => saveSection("seguridad")}>Guardar</button>
                </div>
              ) : (
                <button className="btn" onClick={() => startEdit("seguridad")}>Editar</button>
              )}
            </div>

            <div className="grid2">
              <p><span>Último cambio de contraseña:</span> {user.seguridad.ultimoCambioPass}</p>
              <p><span>Dispositivos activos:</span> {user.seguridad.dispositivosActivos}</p>
            </div>

            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                saveSection("seguridad");
              }}
            >
              <label className="switch-row">
                <input
                  type="checkbox"
                  checked={(editing ? draft : user).seguridad.dosFA}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      seguridad: { ...d.seguridad, dosFA: e.target.checked },
                    }))
                  }
                  disabled={editing !== "seguridad"}
                />
                <span>Habilitar 2FA</span>
              </label>

              <div className="grid2">
                <label>
                  <span>Nueva contraseña</span>
                  <input
                    type="password"
                    name="nuevoPassword"
                    value={(editing ? draft : user).seguridad.nuevoPassword || ""}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        seguridad: { ...d.seguridad, nuevoPassword: e.target.value },
                      }))
                    }
                    disabled={editing !== "seguridad"}
                  />
                </label>
                <label>
                  <span>Repetir contraseña</span>
                  <input
                    type="password"
                    name="repeatNuevoPassword"
                    value={(editing ? draft : user).seguridad.repeatNuevoPassword || ""}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        seguridad: { ...d.seguridad, repeatNuevoPassword: e.target.value },
                      }))
                    }
                    disabled={editing !== "seguridad"}
                  />
                </label>
              </div>
            </form>
          </div>
        )}

        {active === "preferencias" && (
          <div className="panel">
            <div className="panel-header">
              <h2>Preferencias</h2>
              {editing === "preferencias" ? (
                <div className="actions">
                  <button className="btn" onClick={cancelEdit}>Cancelar</button>
                  <button className="btn primary" onClick={() => saveSection("preferencias")}>Guardar</button>
                </div>
              ) : (
                <button className="btn" onClick={() => startEdit("preferencias")}>Editar</button>
              )}
            </div>

            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                saveSection("preferencias");
              }}
            >
              <label className="switch-row">
                <input
                  type="checkbox"
                  checked={(editing ? draft : user).preferencias.noticias}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      preferencias: { ...d.preferencias, noticias: e.target.checked },
                    }))
                  }
                  disabled={editing !== "preferencias"}
                />
                <span>Recibir boletín por email</span>
              </label>

              <label className="switch-row">
                <input
                  type="checkbox"
                  checked={(editing ? draft : user).preferencias.sms}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      preferencias: { ...d.preferencias, sms: e.target.checked },
                    }))
                  }
                  disabled={editing !== "preferencias"}
                />
                <span>Recibir SMS</span>
              </label>

              <label className="select-row">
                <span>Tema</span>
                <select
                  value={(editing ? draft : user).preferencias.tema}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      preferencias: { ...d.preferencias, tema: e.target.value },
                    }))
                  }
                  disabled={editing !== "preferencias"}
                >
                  <option value="claro">Claro</option>
                  <option value="oscuro">Oscuro</option>
                  <option value="sistema">Sistema</option>
                </select>
              </label>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
