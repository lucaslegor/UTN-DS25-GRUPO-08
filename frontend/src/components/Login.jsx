import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Button } from "@mui/material";
import { loginApi, loginWithGoogleApi } from "../services/api";
import { loginWithGoogle } from "../services/googleAuth";
import * as yup from "yup";

const Login = () => {
  const loginSchema = yup.object({
    identifier: yup
      .string()
      .required('IngresÃ¡ tu usuario o email')
      .test('email-or-username', 'Debe ser email vÃ¡lido o usuario (mÃ­nimo 3)', (value) => {
        if (!value) return false;
        if (value.includes('@')) return yup.string().email().isValidSync(value);
        return value.trim().length >= 3;
      }),
    password: yup
      .string()
      .required('IngresÃ¡ tu contraseÃ±a')
      .min(8, 'MÃ­nimo 8 caracteres')
      .matches(/^(?=.*[A-Z])(?=.*[0-9])/, 'Debe contener al menos una mayÃºscula y un nÃºmero'),
  });

  async function validateField(schema, field, value, context = {}) {
    try {
      await schema.validateAt(field, { ...context, [field]: value });
      return '';
    } catch (e) {
      return e.message || 'Valor invÃ¡lido';
    }
  }
  // Un solo campo para usuario o email
  const [identifier, setIdentifier] = useState(""); // username o email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  async function onFieldChange(name, value) {
    if (name === 'identifier') setIdentifier(value);
    if (name === 'password') setPassword(value);
    const errMsg = await validateField(loginSchema, name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: errMsg }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // ValidaciÃ³n completa antes de enviar
    try {
      await loginSchema.validate({ identifier, password }, { abortEarly: false });
      setFieldErrors({ identifier: "", password: "" });
    } catch (e) {
      const fe = { identifier: "", password: "" };
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

      // Detecta si el usuario escribiÃ³ un email o un username
      const payload = identifier.includes("@")
        ? { mail: identifier.trim().toLowerCase(), password }
        : { username: identifier.trim(), password };

      // Llama a la API de login (tu helper)
      const res = await loginApi(payload);

      navigate("/");
    } catch (err) {
      setError(err.message || "Usuario o contraseÃ±a incorrectos");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setError("");
      
      const token = await loginWithGoogle();
      const res = await loginWithGoogleApi(token);
      
      navigate("/");
    } catch (err) {
      setError(err.message || "Error al iniciar sesiÃ³n con Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="principal-container-login">
      <div className="content-wrapper-login">
        {/* Panel izquierdo (form) */}
        <div className="form-inicio-login">
          <button
            className="home-chip"
            onClick={() => navigate("/")}
            aria-label="Volver al inicio"
            type="button"
          >
            <ArrowLeft size={18} />
            <span>Ir al inicio</span>
          </button>

          <h3>Hola, bienvenido!</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-grupo-login">
              <label htmlFor="identifier">Usuario o Email:</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={identifier}
                onChange={(e) => onFieldChange('identifier', e.target.value)}
                placeholder="tu-usuario o tu@email.com"
                required
                aria-invalid={!!fieldErrors.identifier}
                className={`input-login ${fieldErrors.identifier ? 'is-error' : (identifier ? 'is-valid' : '')}`}
              />
              {fieldErrors.identifier && <small className="error-message">{fieldErrors.identifier}</small>}
            </div>

            <div className="form-grupo-login">
              <label htmlFor="password">Contraseña:</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => onFieldChange('password', e.target.value)}
                  placeholder="Introduce tu contraseña"
                  required
                  aria-invalid={!!fieldErrors.password}
                  className={`input-login password-input ${fieldErrors.password ? 'is-error' : (password ? 'is-valid' : '')}`}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.password && <small className="error-message">{fieldErrors.password}</small>}
            </div>

            {error && <p className="error-message">{error}</p>}

            <button className="submit-button-login" type="submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            <div className="divider">
              <span>o</span>
            </div>

            <button 
              className="google-login-button" 
              type="button" 
              onClick={handleGoogleLogin}
              disabled={googleLoading || loading}
            >
              <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Conectando..." : "Continuar con Google"}
            </button>

            <p style={{ marginTop: 12, textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                style={{ background: 'none', border: 'none', color: '#1e43c0', cursor: 'pointer', textDecoration: 'underline' }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </p>
          </form>

          <div className="container-register" style={{ marginTop: 16 }}>
            <span>¿No tenias cuenta?</span>
            <Button variant="outlined" onClick={() => navigate("/register")}>
              Registrarse
            </Button>
          </div>
        </div>

        {/* Panel derecho (branding) */}
        <div className="container-login">
          <img src="/logomaxi.png" alt="Maps Asesores" width={350} />
          <h2>Â¡Bienvenido a Maps, tu bienestar es nuestro compromiso!</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
