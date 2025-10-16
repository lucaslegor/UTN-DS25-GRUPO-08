import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../services/api";

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

  useEffect(() => {
    const t = sp.get("token") || "";
    setToken(t);
  }, [sp]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!token) {
      setErr("Falta el token de reseteo (revisá el enlace del email).");
      return;
    }
    if (newPassword.length < 8) {
      setErr("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (newPassword !== repeat) {
      setErr("Las contraseñas no coinciden.");
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
    loading || !token || newPassword.length < 8 || newPassword !== repeat;

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
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            style={{
              width: "100%",
              padding: "12px 42px 12px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />
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
            onChange={(e) => setRepeat(e.target.value)}
            required
            minLength={8}
            style={{
              width: "100%",
              padding: "12px 42px 12px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />
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
