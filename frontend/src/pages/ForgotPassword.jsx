// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../services/api";

const APP_URL = (import.meta.env.VITE_APP_URL || window.location.origin).replace(/\/$/, "");

export default function ForgotPassword() {
  const [mail, setMail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");
    if (!mail) return;

    try {
      setLoading(true);
      // sólo le pedimos al backend que envíe el mail
      await forgotPasswordApi(mail, APP_URL);
      setMsg("Si el email existe, te enviamos un enlace para restablecer la contraseña.");
    } catch (error) {
      setErr(error?.message || "No pudimos procesar la solicitud");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="principal-container-login">
      <div className="content-wrapper-login">
        <div className="form-inicio-login">
          <button
            onClick={() => navigate("/login")}
            style={{ background: "none", border: "none", color: "#1e43c0", cursor: "pointer" }}
            type="button"
          >
            Volver al login
          </button>

          <h3>¿Olvidaste tu contraseña?</h3>
          <p>Ingresá tu email y te enviaremos un enlace para restablecerla.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-grupo-login">
              <label htmlFor="email">Email:</label>
              <input
                className="input-login"
                type="email"
                id="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>

            <button className="submit-button-login" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>

          {msg && <p style={{ marginTop: 10, color: "#1e43c0" }}>{msg}</p>}
          {err && <p style={{ marginTop: 10, color: "crimson" }}>{err}</p>}
        </div>
      </div>
    </div>
  );
}
