import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Button } from "@mui/material";
import { registerApi} from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
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
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              alignSelf: "flex-start",
              marginTop: "30px",
              marginBottom: 0,
              color: "#1e43c0",
              padding: 0,
              display: "flex",
              alignItems: "center",
              fontSize: 18,
            }}
            aria-label="Volver"
          >
            <ArrowLeft size={32} />
            <span style={{ marginLeft: 8 }}>Volver al inicio</span>
          </button>

          <h3 style={{ marginTop: 0 }}>¡Registrate!</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-grupo-login">
              <label htmlFor="user">Usuario:</label>
              <input
                className="input-login"
                type="text"
                id="user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Introduce tu usuario"
                required
              />
            </div>

            <div className="form-grupo-login">
              <label htmlFor="email">Email:</label>
              <input
                className="input-login"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Introduce tu email"
                required
              />
            </div>

            <div className="form-grupo-login">
              <label htmlFor="password">Contraseña:</label>
              <input
                className="input-login"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                required
              />
            </div>

            <div className="form-grupo-login">
              <label htmlFor="confirmPassword">Confirmar contraseña:</label>
              <input
                className="input-login"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repetí tu contraseña"
                required
              />
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
          <img src="/MaxiColor.png" alt="Maps Asesores" width={350} />
          <h2>¡Bienvenido a Maps, tu bienestar es nuestro compromiso!</h2>
        </div>
      </div>
    </div>
  );
};

export default Register;
