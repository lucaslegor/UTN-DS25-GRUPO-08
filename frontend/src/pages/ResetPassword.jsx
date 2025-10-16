import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../services/api";
import * as yup from "yup";

export default function ResetPassword() {
  const [sp] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ token: "", newPassword: "", repeat: "" });

  const resetSchema = yup.object({
    token: yup.string().required('Falta el token de reseteo'),
    newPassword: yup.string().required('Ingresá una contraseña').min(8, 'Mínimo 8 caracteres'),
    repeat: yup
      .string()
      .required('Repetí la contraseña')
      .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden'),
  });

  async function validateField(schema, field, value, context = {}) {
    try {
      await schema.validateAt(field, { ...context, [field]: value });
      return '';
    } catch (e) {
      return e.message || 'Valor inválido';
    }
  }

  useEffect(() => {
    const t = sp.get("token") || "";
    setToken(t);
  }, [sp]);

  async function onFieldChange(name, value) {
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'repeat') setRepeat(value);
    if (name === 'token') setToken(value);
    const errMsg = await validateField(resetSchema, name, value, { newPassword });
    setFieldErrors((prev) => ({ ...prev, [name]: errMsg }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    try {
      await resetSchema.validate({ token, newPassword, repeat }, { abortEarly: false });
      setFieldErrors({ token: "", newPassword: "", repeat: "" });
    } catch (e) {
      const fe = { token: "", newPassword: "", repeat: "" };
      if (e?.inner?.length) {
        e.inner.forEach((it) => { if (it.path && !fe[it.path]) fe[it.path] = it.message; });
      } else if (e?.path) {
        fe[e.path] = e.message;
      }
      setFieldErrors(fe);
      return;
    }

    setLoading(true);
    try {
      await resetPasswordApi({ token, newPassword }); // <- nombres exactos para el backend
      setMsg("¡Contraseña actualizada! Te redirigimos al inicio de sesión...");
      // Redirige al login después de 2.5s
      setTimeout(() => navigate("/login"), 2500);
    } catch (e) {
      setErr(e?.message || "Error al actualizar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  const disabled =
    loading || !!fieldErrors.token || !!fieldErrors.newPassword || !!fieldErrors.repeat || !token;

  return (
    <section
      style={{
        maxWidth: 420,
        margin: "80px auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 12 }}>Restablecer contraseña</h2>

      {!token && (
        <p style={{ color: "crimson", marginBottom: 12 }}>
          No se encontró el token en el enlace. Volvé a solicitar el email de
          recuperación e ingresá desde el link que te enviamos.
        </p>
      )}

      <form onSubmit={onSubmit} noValidate>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <input
            type={showPwd1 ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => onFieldChange('newPassword', e.target.value)}
            required
            minLength={8}
            style={{
              width: "100%",
              padding: "12px 42px 12px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />
          {fieldErrors.newPassword && <small style={{ color: 'crimson' }}>{fieldErrors.newPassword}</small>}
          <button
            type="button"
            onClick={() => setShowPwd1((v) => !v)}
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              padding: "6px 8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#3d6de2",
              fontWeight: 600,
            }}
            aria-label={showPwd1 ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPwd1 ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <div style={{ position: "relative", marginBottom: 12 }}>
          <input
            type={showPwd2 ? "text" : "password"}
            placeholder="Repetir contraseña"
            value={repeat}
            onChange={(e) => onFieldChange('repeat', e.target.value)}
            required
            minLength={8}
            style={{
              width: "100%",
              padding: "12px 42px 12px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />
          {fieldErrors.repeat && <small style={{ color: 'crimson' }}>{fieldErrors.repeat}</small>}
          <button
            type="button"
            onClick={() => setShowPwd2((v) => !v)}
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              padding: "6px 8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#3d6de2",
              fontWeight: 600,
            }}
            aria-label={showPwd2 ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPwd2 ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <small style={{ display: "block", marginBottom: 12, opacity: 0.8 }}>
          Mínimo 8 caracteres. Usá letras y números para mayor seguridad.
        </small>

        <button
          type="submit"
          disabled={disabled}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            background: disabled ? "#9db5ff" : "#3d6de2",
            color: "#fff",
            border: 0,
            cursor: disabled ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>

      {msg && <p style={{ color: "#1e43c0", marginTop: 12 }}>{msg}</p>}
      {err && <p style={{ color: "crimson", marginTop: 12 }}>{err}</p>}
    </section>
  );
}
