import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Button } from "@mui/material";
import { registerApi} from "../services/api";
import * as yup from "yup";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ username: "", mail: "", password: "", confirmPassword: "" });
  const registerSchema = yup.object({
    username: yup.string().required('Ingresá un usuario').min(3, 'Mínimo 3 caracteres'),
    mail: yup.string().required('Ingresá un email').email('Email inválido'),
    password: yup.string().required('Ingresá una contraseña').min(8, 'Mínimo 8 caracteres'),
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

    // Validación completa
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
      await registerApi({ username, mail: email, password });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="principal-container-login">
      <div className="content-wrapper-login">
        <div className="form-inicio-login">

          <h3 style={{ marginTop: 0 }}>¡Registrate!</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-grupo-login">
              <label htmlFor="user">Usuario:</label>
              <input
                type="text"
                id="user"
                value={username}
                onChange={(e) => onFieldChange('username', e.target.value)}
                placeholder="Introduce tu usuario"
                required
                aria-invalid={!!fieldErrors.username}
                className={`input-login ${fieldErrors.username ? 'is-error' : (username ? 'is-valid' : '')}`}
              />
              {fieldErrors.username && <small className="error-message">{fieldErrors.username}</small>}
            </div>

            <div className="form-grupo-login">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => onFieldChange('mail', e.target.value)}
                placeholder="Introduce tu email"
                required
                aria-invalid={!!fieldErrors.mail}
                className={`input-login ${fieldErrors.mail ? 'is-error' : (email ? 'is-valid' : '')}`}
              />
              {fieldErrors.mail && <small className="error-message">{fieldErrors.mail}</small>}
            </div>

            <div className="form-grupo-login">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => onFieldChange('password', e.target.value)}
                placeholder="Introduce tu contraseña"
                required
                aria-invalid={!!fieldErrors.password}
                className={`input-login ${fieldErrors.password ? 'is-error' : (password ? 'is-valid' : '')}`}
              />
              {fieldErrors.password && <small className="error-message">{fieldErrors.password}</small>}
            </div>

            <div className="form-grupo-login">
              <label htmlFor="confirmPassword">Confirmar contraseña:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
                placeholder="Repetí tu contraseña"
                required
                aria-invalid={!!fieldErrors.confirmPassword}
                className={`input-login ${fieldErrors.confirmPassword ? 'is-error' : (confirmPassword ? 'is-valid' : '')}`}
              />
              {fieldErrors.confirmPassword && <small className="error-message">{fieldErrors.confirmPassword}</small>}
            </div>

            {error && <p className="error-message">{error}</p>}
            <button
              className="submit-button-login"
              type="submit"
              disabled={loading}
              aria-busy={loading}
              style={{ marginBottom: 24, opacity: loading ? 0.8 : 1 }}
            >
              {loading ? "Creando cuenta..." : "Registrarse"}
            </button>
          </form>

          <Button
            variant="outlined"
            onClick={() => navigate("/login")}
            disabled={loading} 
            sx={{ display: "block", mx: "auto", mb: 3 }}
          >
            Iniciar sesión
          </Button>
        </div>

        <div className="container-login">
          <img src="/logomaxi.png" alt="Maps Asesores" width={350} />
          <h2>¡Bienvenido a Maps, tu bienestar es nuestro compromiso!</h2>
        </div>
      </div>
    </div>
  );
};

export default Register;
