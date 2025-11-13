// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../services/api";
import * as yup from "yup";
import "../styles/login.css";

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
    <div className="auth-split-container">
      {/* Panel izquierdo - Branding */}
      <div className="auth-branding-panel">
        <div className="auth-branding-content">
          <div className="auth-logo-container">
            <img src="/MaxiColor.png" alt="MAPS ASESORES" className="auth-logo" />
          </div>
          <h1 className="auth-brand-title">MAPS ASESORES</h1>
          <p className="auth-brand-subtitle">Tu bienestar es nuestro compromiso</p>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="auth-form-panel">
        <div className="auth-form-card">
          <h2 className="auth-page-title">¿Olvidaste tu contraseña?</h2>
          <p className="auth-page-description">
            Ingresá tu email y te enviaremos un enlace para restablecerla.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={mail}
                onChange={(e) => onFieldChange(e.target.value)}
                placeholder="tu@email.com"
                required
                aria-invalid={!!fieldErrors.mail}
                className={`auth-input ${fieldErrors.mail ? 'is-error' : (mail ? 'is-valid' : '')}`}
              />
              {fieldErrors.mail && <small className="auth-error-message">{fieldErrors.mail}</small>}
            </div>

            {msg && (
              <div className="auth-success-message">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                  <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10L9 12L13 8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {msg}
              </div>
            )}

            {err && (
              <div className="auth-error-message auth-error-general">
                {err}
              </div>
            )}

            <button 
              className="auth-submit-button" 
              type="submit" 
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>

            <div className="auth-switch-account">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="auth-link-button"
              >
                ← Volver a iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
