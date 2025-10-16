import React, { useState, useEffect } from "react";
import { resetPasswordApi } from "../services/api";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("token") || "";
    setToken(t);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setMsg("");

    if (!token) {
      setErr("Falta el token de reseteo");
      return;
    }
    if (newPassword.length < 8) {
      setErr("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (newPassword !== repeat) {
      setErr("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordApi({ token, newPassword });
      setMsg("¡Contraseña actualizada! Ya podés iniciar sesión.");
    } catch (e) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ maxWidth: 420, margin: "80px auto", fontFamily: "Poppins, sans-serif" }}>
      <h2>Restablecer contraseña</h2>
      <form onSubmit={onSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 12, marginBottom: 12, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <input
          type="password"
          placeholder="Repetir contraseña"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          required
          style={{ width: "100%", padding: 12, marginBottom: 12, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button disabled={loading} style={{ width: "100%", padding: 12, borderRadius: 8, background: "#3d6de2", color: "#fff", border: 0 }}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
      {msg && <p style={{ color: "#1e43c0", marginTop: 12 }}>{msg}</p>}
      {err && <p style={{ color: "crimson", marginTop: 12 }}>{err}</p>}
    </section>
  );
}
