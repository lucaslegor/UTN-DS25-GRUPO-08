import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/maxiColor.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import {
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Person, Policy, Logout } from "@mui/icons-material";
import SolicitudesIcon from "./SolicitudesIcon";
import { getMeApi, logoutApi } from "../services/api";
import "../styles/navbar.css";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [profileImage, setProfileImage] = useState("");

  // Search state
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  const navigate = useNavigate();
  const location = useLocation();
  const searchWrapRef = useRef(null);

  // === Auth desde localStorage.auth ===
  useEffect(() => {
    const raw = localStorage.getItem("auth");
    try {
      const auth = raw ? JSON.parse(raw) : null;
      const logged = !!auth?.token;
      setIsLogin(logged);
      setIsAdmin(auth?.user?.rol === "ADMINISTRADOR");
      
      // Cargar foto de perfil desde localStorage específico del usuario
      let profileImage = auth?.user?.profileImage || "";
      if (logged && auth?.user?.username && !profileImage) {
        const userProfileImage = localStorage.getItem(`profileImage:${auth.user.username}`);
        if (userProfileImage) {
          profileImage = userProfileImage;
          // Actualizar auth con la foto encontrada
          const updatedAuth = {
            ...auth,
            user: { ...auth.user, profileImage: userProfileImage }
          };
          localStorage.setItem("auth", JSON.stringify(updatedAuth));
        }
      }
      
      setProfileImage(profileImage);
    } catch {
      setIsLogin(false);
      setIsAdmin(false);
      setProfileImage("");
    }
  }, [location.pathname]);

  // === Listener para cambios en la foto de perfil ===
  useEffect(() => {
    const handleProfileImageChange = (e) => {
      if (e.detail?.profileImage !== undefined) {
        setProfileImage(e.detail.profileImage);
      }
    };

    window.addEventListener('profileImageChanged', handleProfileImageChange);
    return () => window.removeEventListener('profileImageChanged', handleProfileImageChange);
  }, []);

  const handleLogout = async () => {
    try { await logoutApi(); } catch {}
    localStorage.removeItem("auth");
    setIsLogin(false);
    setIsAdmin(false);
    setProfileImage("");
    setUserMenuAnchor(null);
    navigate("/");
  };

  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  const handleProfileClick = () => {
    navigate("/userProfile");
    handleUserMenuClose();
  };
  const handlePoliciesClick = () => {
    navigate("/misPolizas");
    handleUserMenuClose();
  };

  // ---------- FILTRO ----------
  // Tomamos productos de localStorage
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("products") || "[]");
    } catch {
      return [];
    }
  })();
  const list = Array.isArray(stored) ? stored : [];

  const filteredProducts = search.trim()
    ? list.filter(
        (p) =>
          p.title?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Cerrar resultados al click fuera
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!searchWrapRef.current) return;
      if (!searchWrapRef.current.contains(e.target)) setShowResults(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const selectProduct = (p) => {
    if (!p) return;
    setShowResults(false);
    setSearch("");
    setHighlight(-1);
    navigate(`/productcard/${p.id}`);
  };


  return (
    <header className="navbar" id="main-navbar">
      <Link className="brand" to="/" style={{ textDecoration: "none" }}>
        <h1 className="title">
          <img src={logo} alt="Maps Asesores" width={70} />
          MAPS ASESORES
        </h1>
      </Link>

      {/* BUSCADOR + RESULTADOS (custom, sin MUI) */}
      <div className="search" ref={searchWrapRef}>
        <div
          className={`sb ${showResults ? "open" : ""}`}
          role="combobox"
          aria-expanded={showResults}
          aria-owns="sb-results"
        >
          <Search className="sb-icon" size={18} />
          <input
            className="sb-input"
            type="search"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
              setHighlight(-1);
            }}
            onFocus={() => setShowResults(true)}
            onKeyDown={(e) => {
              if (!filteredProducts.length) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlight((h) =>
                  Math.min(h + 1, filteredProducts.length - 1)
                );
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlight((h) => Math.max(h - 1, 0));
              } else if (e.key === "Enter") {
                if (highlight >= 0) selectProduct(filteredProducts[highlight]);
              } else if (e.key === "Escape") {
                setShowResults(false);
              }
            }}
            aria-autocomplete="list"
            aria-controls="sb-results"
          />

          {search && (
            <button
              className="sb-clear"
              aria-label="Limpiar búsqueda"
              onClick={() => {
                setSearch("");
                setHighlight(-1);
                setShowResults(false);
              }}
              type="button"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {showResults && (
          <div id="sb-results" className="sb-results" role="listbox">
            {filteredProducts.length === 0 ? (
              <div className="sb-empty">Sin resultados</div>
            ) : (
              filteredProducts.slice(0, 8).map((p, idx) => (
                <button
                  key={`sr-${p.id}`}
                  type="button"
                  className={`sb-item ${highlight === idx ? "active" : ""}`}
                  role="option"
                  aria-selected={highlight === idx}
                  onMouseEnter={() => setHighlight(idx)}
                  onClick={() => selectProduct(p)}
                >
                  <img
                    className="sb-thumb"
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                  />
                  <div className="sb-meta">
                    <span className="sb-title">{p.title}</span>
                    <span className="sb-price">{p.tipo?.toUpperCase() || 'N/A'} - {p.cobertura || 'Sin cobertura'}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* HAMBURGUESA */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          transition: 'all 0.2s ease'
        }}
      >
        {menuOpen ? <X size={24} /> : <MenuIcon fontSize="medium" />}
      </button>

      {/* LINKS */}
      <nav 
        className={`nav-links ${menuOpen ? "open" : ""}`}
        onClick={(e) => {
          // Cerrar menú al hacer clic en el overlay (no en el panel)
          if (e.target === e.currentTarget) {
            setMenuOpen(false);
          }
        }}
      >
        <ul className="link-list" onClick={() => setMenuOpen(false)}>
          <li>
            <Link className="link" to="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link className="link" to="/nosotros">
              Nosotros
            </Link>
          </li>
          <li>
            <Link className="link" to="/contacto">
              Contacto
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link className="link" to="/adminpanel">
                Panel Admin
              </Link>
            </li>
          )}
          {isLogin && !isAdmin && (
            <li>
              <Link className="link" to="/solicitudes">
                <span className="solicitudes-text-desktop">
                  <SolicitudesIcon />
                </span>
                <span className="solicitudes-text-mobile">
                  Mis Solicitudes
                </span>
              </Link>
            </li>
          )}
          {isLogin ? (
            <li>
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{
                  color: "#fff",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
                  padding: "4px",
                }}
                aria-label="Cuenta de usuario"
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Foto de perfil" 
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <AccountCircle sx={{ fontSize: 30 }} />
                )}
              </IconButton>
              <MuiMenu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{ sx: { mt: 1, minWidth: 200, borderRadius: 2 } }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Mi perfil</ListItemText>
                </MenuItem>
                {!isAdmin && (
                  <MenuItem onClick={handlePoliciesClick}>
                    <ListItemIcon>
                      <Policy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Mis pólizas</ListItemText>
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cerrar sesión</ListItemText>
                </MenuItem>
              </MuiMenu>
            </li>
          ) : (
            <li>
              <button
                className="session-btn"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
