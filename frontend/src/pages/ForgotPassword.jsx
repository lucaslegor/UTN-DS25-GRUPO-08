// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../services/api";
import * as yup from "yup";

const APP_URL = (import.meta.env.VITE_APP_URL || window.location.origin).replace(/\/$/, "");

export default function ForgotPassword() {
  const [mail, setMail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ mail: "" });
  const navigate = useNavigate();

  const forgotSchema = yup.object({
    mail: yup.string().required('Ingresá tu email').email('Email inválido'),
  });

  async function validateField(schema, field, value) {
    try {
      await schema.validateAt(field, { [field]: value });
      return '';
    } catch (e) {
      return e.message || 'Valor inválido';
    }
  }

  async function onFieldChange(value) {
    setMail(value);
    const m = await validateField(forgotSchema, 'mail', value);
    setFieldErrors({ mail: m });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");
    try {
      await forgotSchema.validate({ mail }, { abortEarly: false });
      setFieldErrors({ mail: "" });
    } catch (e) {
      const fe = { mail: "" };
      if (e?.inner?.length) {
        e.inner.forEach((it) => { if (it.path && !fe[it.path]) fe[it.path] = it.message; });
      } else if (e?.path) {
        fe[e.path] = e.message;
      }
      setFieldErrors(fe);
      return;
    }

    try {
      setLoading(true);
      // sólo le pedimos al backend que envíe el mail
      await forgotPasswordApi(mail);
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
                onChange={(e) => onFieldChange(e.target.value)}
                placeholder="tu@email.com"
                required
              />
              {fieldErrors.mail && <small className="error-message">{fieldErrors.mail}</small>}
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
