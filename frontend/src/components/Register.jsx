import React, { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { registerApi} from "../services/api";
import ReCaptcha from "./ReCaptcha";
import * as yup from "yup";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ username: "", mail: "", password: "", confirmPassword: "" });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const recaptchaRef = useRef(null);
  const registerSchema = yup.object({
    username: yup.string().required('Ingresá un usuario').min(3, 'Mínimo 3 caracteres'),
    mail: yup.string().required('Ingresá un email').email('Email inválido'),
    password: yup
      .string()
      .required('Ingresá una contraseña')
      .min(8, 'Mínimo 8 caracteres')
      .matches(/^(?=.*[A-Z])(?=.*[0-9])/, 'Debe contener al menos una mayúscula y un número'),
    confirmPassword: yup
      .string()
      .required('Repetí la contraseña')
      .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  });

  async function validateField(schema, field, value, context = {}) {
    try {
      await schema.validateAt(field, { ...context, [field]: value });
      return '';
    } catch (e) {
      return e.message || 'Valor inválido';
    }
  }
  const navigate = useNavigate();

  async function onFieldChange(name, value) {
    if (name === 'username') setUsername(value);
    if (name === 'mail') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    const errMsg = await validateField(registerSchema, name, value, { password });
    setFieldErrors((prev) => ({ ...prev, [name]: errMsg }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setRecaptchaError("");

    if (!recaptchaToken) {
      setRecaptchaError("Por favor, completa el reCAPTCHA");
      return;
    }

    try {
      await registerSchema.validate({ username, mail: email, password, confirmPassword }, { abortEarly: false });
      setFieldErrors({ username: "", mail: "", password: "", confirmPassword: "" });
    } catch (e) {
      const fe = { username: "", mail: "", password: "", confirmPassword: "" };
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
      await registerApi({ username, mail: email, password, recaptchaToken });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error al registrarse");
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      {/* Panel izquierdo - Branding (solo desktop) */}
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
        {/* Logo móvil (solo visible en mobile/tablet) */}
        <div className="auth-mobile-logo">
          <img src="/MaxiColor.png" alt="MAPS ASESORES" className="auth-mobile-logo-img" />
        </div>

        <div className="auth-form-card">
          {/* Tabs */}
          <div className="auth-tabs">
            <button 
              className="auth-tab"
              onClick={() => navigate('/login')}
            >
              Inicia sesión
            </button>
            <button 
              className="auth-tab active"
              onClick={() => navigate('/register')}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => onFieldChange('username', e.target.value)}
                placeholder="Introduce tu usuario"
                required
                aria-invalid={!!fieldErrors.username}
                className={`auth-input ${fieldErrors.username ? 'is-error' : (username ? 'is-valid' : '')}`}
              />
              {fieldErrors.username && <small className="auth-error-message">{fieldErrors.username}</small>}
            </div>

            <div className="auth-form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => onFieldChange('mail', e.target.value)}
                placeholder="Introduce tu email"
                required
                aria-invalid={!!fieldErrors.mail}
                className={`auth-input ${fieldErrors.mail ? 'is-error' : (email ? 'is-valid' : '')}`}
              />
              {fieldErrors.mail && <small className="auth-error-message">{fieldErrors.mail}</small>}
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="auth-password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => onFieldChange('password', e.target.value)}
                  placeholder="Introduce tu contraseña"
                  required
                  aria-invalid={!!fieldErrors.password}
                  className={`auth-input auth-password-input ${fieldErrors.password ? 'is-error' : (password ? 'is-valid' : '')}`}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  <span>{showPassword ? "Ocultar" : "Mostrar"}</span>
                </button>
              </div>
              {fieldErrors.password && <small className="auth-error-message">{fieldErrors.password}</small>}
            </div>

            <div className="auth-form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <div className="auth-password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
                  placeholder="Repetí tu contraseña"
                  required
                  aria-invalid={!!fieldErrors.confirmPassword}
                  className={`auth-input auth-password-input ${fieldErrors.confirmPassword ? 'is-error' : (confirmPassword ? 'is-valid' : '')}`}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Ocultar confirmación de contraseña" : "Mostrar confirmación de contraseña"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  <span>{showConfirmPassword ? "Ocultar" : "Mostrar"}</span>
                </button>
              </div>
              {fieldErrors.confirmPassword && <small className="auth-error-message">{fieldErrors.confirmPassword}</small>}
            </div>

            <div className="auth-form-group">
              <ReCaptcha
                ref={recaptchaRef}
                onVerify={(token) => {
                  setRecaptchaToken(token);
                  setRecaptchaError("");
                }}
                onExpire={() => {
                  setRecaptchaToken("");
                  setRecaptchaError("reCAPTCHA expiró. Por favor, verifica nuevamente.");
                }}
                onError={() => {
                  setRecaptchaToken("");
                  setRecaptchaError("Error al cargar reCAPTCHA. Por favor, recarga la página.");
                }}
              />
              {recaptchaError && <small className="auth-error-message">{recaptchaError}</small>}
            </div>

            {error && <div className="auth-error-message auth-error-general">{error}</div>}

            <button
              className="auth-submit-button"
              type="submit"
              disabled={loading || !recaptchaToken}
              aria-busy={loading}
              title={!recaptchaToken ? "Por favor, completa el reCAPTCHA primero" : ""}
            >
              {loading ? "Creando cuenta..." : "Registrarse"}
            </button>

            <div className="auth-switch-account">
              <span>¿Ya tienes cuenta? </span>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="auth-link-button"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;