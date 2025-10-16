import React, { useState } from "react";
import { forgotPasswordApi } from "../services/api";

export default function ForgotPassword() {
  const [mail, setMail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setMsg(""); setLoading(true);
    try {
      await forgotPasswordApi({ mail });
      setMsg("Si el mail existe, enviamos un enlace para restablecer la contraseña.");
    } catch (e) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ maxWidth: 420, margin: "80px auto", fontFamily: "Poppins, sans-serif" }}>
      <h2>Olvidaste tu contraseña</h2>
      <p>Ingresá tu email y te enviaremos un enlace para restablecerla.</p>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="tuemail@dominio.com"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
          style={{ width: "100%", padding: 12, marginBottom: 12, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button disabled={loading} style={{ width: "100%", padding: 12, borderRadius: 8, background: "#3d6de2", color: "#fff", border: 0 }}>
          {loading ? "Enviando..." : "Enviar enlace"}
        </button>
      </form>
      {msg && <p style={{ color: "#1e43c0", marginTop: 12 }}>{msg}</p>}
      {err && <p style={{ color: "crimson", marginTop: 12 }}>{err}</p>}
    </section>
  );
}
