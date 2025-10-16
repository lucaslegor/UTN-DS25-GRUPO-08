import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Button } from "@mui/material";
import { loginApi } from "../services/api";
import * as yup from "yup";

const Login = () => {
  const loginSchema = yup.object({
    identifier: yup
      .string()
      .required('Ingresá tu usuario o email')
      .test('email-or-username', 'Debe ser email válido o usuario (mínimo 3)', (value) => {
        if (!value) return false;
        if (value.includes('@')) return yup.string().email().isValidSync(value);
        return value.trim().length >= 3;
      }),
    password: yup.string().required('Ingresá tu contraseña').min(8, 'Mínimo 8 caracteres'),
  });

  async function validateField(schema, field, value, context = {}) {
    try {
      await schema.validateAt(field, { ...context, [field]: value });
      return '';
    } catch (e) {
      return e.message || 'Valor inválido';
    }
  }
  // Un solo campo para usuario o email
  const [identifier, setIdentifier] = useState(""); // username o email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
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
    // Validación completa antes de enviar
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

      // Detecta si el usuario escribió un email o un username
      const payload = identifier.includes("@")
        ? { mail: identifier.trim().toLowerCase(), password }
        : { username: identifier.trim(), password };

      // Llama a la API de login (tu helper)
      const res = await loginApi(payload);

      navigate("/");
    } catch (err) {
      setError(err.message || "Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="principal-container-login">
      <div className="content-wrapper-login">
        {/* Panel izquierdo (form) */}
        <div className="form-inicio-login">
          <button
            className="back-btn-login"
            onClick={() => navigate("/")}
            aria-label="Volver atrás"
          >
            <ArrowLeft size={28} />
            <span style={{ marginLeft: 8 }}>Volver al inicio</span>
          </button>

          <h3>¡Hola, bienvenido!</h3>

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
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => onFieldChange('password', e.target.value)}
                placeholder="Introduce tu contraseña"
                required
                aria-invalid={!!fieldErrors.password}
                className={`input-login ${fieldErrors.password ? 'is-error' : (password ? 'is-valid' : '')}`}
              />
              {fieldErrors.password && <small className="error-message">{fieldErrors.password}</small>}
            </div>

            {error && <p className="error-message">{error}</p>}

            <button className="submit-button-login" type="submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
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
            <span>¿No tenés cuenta?</span>
            <Button variant="outlined" onClick={() => navigate("/register")}>
              Registrarse
            </Button>
          </div>
        </div>

        {/* Panel derecho (branding) */}
        <div className="container-login">
          <img src="/logomaxi.png" alt="Maps Asesores" width={350} />
          <h2>¡Bienvenido a Maps, tu bienestar es nuestro compromiso!</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
