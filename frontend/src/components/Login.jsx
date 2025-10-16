import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Button } from "@mui/material";
import { loginApi } from "../services/api";

const Login = () => {
  // Un solo campo para usuario o email
  const [identifier, setIdentifier] = useState(""); // username o email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
                className="input-login"
                type="text"
                id="identifier"
                name="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="tu-usuario o tu@email.com"
                required
              />
            </div>

            <div className="form-grupo-login">
              <label htmlFor="password">Contraseña:</label>
              <input
                className="input-login"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button className="submit-button-login" type="submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
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
          <img src="/public/Maxicolor.png" alt="Maps Asesores" width={350} />
          <h2>¡Bienvenido a Maps, tu bienestar es nuestro compromiso!</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
