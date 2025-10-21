import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSolicitudes } from "../context/SolicitudesContext";
import { getAuth } from "../services/api";
import "../styles/productDetail.css";

// Seed solo por si el storage está vacío (sin precios - sistema de solicitudes)
const defaultProducts = [
  {
    id: 1,
    title: "Seguro de Auto",
    description:
      "Protección completa para tu vehículo ante accidentes, robos y daños a terceros.",
    tipo: "AUTO",
    cobertura: "Cobertura total hasta $5.000.000",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Seguro de Hogar",
    description:
      "Cubre daños por incendio, robo y responsabilidad civil en tu vivienda.",
    tipo: "HOGAR",
    cobertura: "Cobertura hasta $2.000.000",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Seguro de Vida",
    description:
      "Garantiza el bienestar de tus seres queridos ante cualquier eventualidad.",
    tipo: "VIDA",
    cobertura: "Beneficio de $3.000.000",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Seguro de Salud",
    description:
      "Acceso a la mejor atención médica y cobertura de gastos hospitalarios.",
    tipo: "SALUD",
    cobertura: "Cobertura 100% en internaciones y cirugías",
    image:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80",
  },
];

// Normaliza lo que venga del storage (sin precios - sistema de solicitudes)
const normalize = (list) =>
  (list || []).map((p) => ({
    ...p,
    id: typeof p.id === "number" ? p.id : Number(p.id),
    title: p.title || p.name || "",
    description: p.description || "Descripción no disponible.",
    image: p.image || "",
    tipo: p.tipo || "AUTO",
    cobertura: p.cobertura || "Cobertura básica",
  }));

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);
  const { addToSolicitud, isInSolicitud } = useSolicitudes();
  
  // Verificar si el usuario es administrador
  const isAdmin = () => {
    const auth = getAuth();
    return auth?.user?.rol === 'ADMINISTRADOR';
  };

  const [allProducts, setAllProducts] = React.useState([]);
  const [product, setProduct] = React.useState(null);
  const [mainImg, setMainImg] = React.useState("");

  // Carga de productos desde localStorage (con seed si está vacío)
  React.useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      const parsed = normalize(JSON.parse(stored));
      setAllProducts(parsed);
      if (parsed.length === 0) {
        // Si por alguna razón está vacío, seed
        setAllProducts(defaultProducts);
        localStorage.setItem("products", JSON.stringify(defaultProducts));
      }
    } else {
      setAllProducts(defaultProducts);
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
  }, []);

  // Cuando cambia la lista o el id de la URL, selecciona el producto adecuado
  React.useEffect(() => {
    if (!allProducts.length) return;
    const found = allProducts.find((p) => Number(p.id) === numericId) || null;
    setProduct(found);
  }, [allProducts, numericId]);

  // Actualiza imagen principal al cambiar el producto
  React.useEffect(() => {
    if (!product) return;
    setMainImg(product.image || "");
  }, [product]);

  if (!product) {
    return (
      <div className="pd-not-found">
        Enlatado no encontrado · <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  // Relacionados: otros productos distintos al actual (toma hasta 4)
  const related = allProducts
    .filter((p) => Number(p.id) !== Number(product.id))
    .slice(0, 4);

  // Info solicitud
  const inSolicitud = isInSolicitud(product.id);

  const handleAddToSolicitud = () => {
    if (!inSolicitud) {
      addToSolicitud(product);
    }
  };

  const handleViewSolicitudes = () => {
    navigate('/solicitudes');
  };

  const displayTitle = product.title || product.name || "Producto";

  return (
    <div className="pd-container">
      <h1 className="pd-title">{displayTitle}</h1>

      <div className="pd-main">
        {/* Imagen principal */}
        <div className="pd-images">
          {mainImg ? (
            <img className="pd-main-img" src={mainImg} alt={displayTitle} />
          ) : (
            <div className="pd-main-img" style={{ 
              backgroundColor: '#f5f5f5', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#999',
              fontSize: '16px'
            }}>
              Sin imagen
            </div>
          )}
        </div>

        {/* Buy box */}
        <div className="pd-buy">
          <div className="pd-price-wrap">
            <div className="pd-price">
              <strong>Tipo:</strong> {product.tipo?.toUpperCase() || 'N/A'}
            </div>
            <div className="pd-price" style={{ marginTop: '8px' }}>
              <strong>Cobertura:</strong> {product.cobertura || 'No especificada'}
            </div>
          </div>

          <div className="pd-stock">Stock disponible</div>

          <div className="pd-desc" style={{ marginTop: "20px" }}>
            <h2 className="pd-section-title">Descripción del producto</h2>
            <ul className="pd-feature-list">
              <li className="pd-feature-item">{product.description}</li>
            </ul>
          </div>

          {inSolicitud && (
            <div className="pd-cart-status">
              ✓ Producto agregado a tu solicitud
            </div>
          )}

          <div className="pd-btns">
            {isAdmin() ? (
              <button 
                className="pd-btn-primary" 
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
                title="Los administradores no pueden hacer solicitudes"
              >
                🔒 Solo para usuarios
              </button>
            ) : (
              <button 
                className={`pd-btn-primary ${inSolicitud ? 'pd-btn-success' : ''}`} 
                onClick={inSolicitud ? handleViewSolicitudes : handleAddToSolicitud}
              >
                {inSolicitud ? "👁️ Ver mis solicitudes" : "📋 Agregar a solicitud"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Vendedor */}
      <div className="pd-seller">
        Auspicia <strong>Federacion Patronal Seguros</strong>
      </div>

      {/* Relacionados */}
      <div className="pd-related">
        <h2 className="pd-section-title">Recomendados de Nuestro Catalogo</h2>
        <div className="pd-related-grid">
          {related.map((item) => (
            <div key={`rel-${item.id}`} className="pd-related-card">
              <Link to={`/productcard/${item.id}`} className="pd-related-link">
                {item.image ? (
                  <img
                    className="pd-related-img"
                    src={item.image}
                    alt={item.title || item.name}
                  />
                ) : (
                  <div className="pd-related-img" style={{ 
                    backgroundColor: '#f5f5f5', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '12px'
                  }}>
                    Sin imagen
                  </div>
                )}
                <div className="pd-related-content">
                  <h3 className="pd-related-title">
                    {item.title || item.name}
                  </h3>
                  <div className="pd-related-price">
                    {item.tipo} - {item.cobertura}
                  </div>
                </div>
              </Link>
              <button
                className="pd-related-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!isInSolicitud(item.id) && !isAdmin()) {
                    addToSolicitud(item);
                  }
                }}
                disabled={isInSolicitud(item.id) || isAdmin()}
                title={isAdmin() ? "Los administradores no pueden hacer solicitudes" : ""}
              >
                {isAdmin() ? "🔒" : (isInSolicitud(item.id) ? "✓ Agregado" : "📋 Agregar")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
