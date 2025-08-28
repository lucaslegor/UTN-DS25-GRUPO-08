import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/productDetail.css";

// Seed solo por si el storage está vacío
const defaultProducts = [
  {
    id: 1,
    title: "Seguro de Auto",
    description:
      "Protección completa para tu vehículo ante accidentes, robos y daños a terceros.",
    price: 10000,
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Seguro de Hogar",
    description:
      "Cubre daños por incendio, robo y responsabilidad civil en tu vivienda.",
    price: 8000,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Seguro de Vida",
    description:
      "Garantiza el bienestar de tus seres queridos ante cualquier eventualidad.",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Seguro de Salud",
    description:
      "Acceso a la mejor atención médica y cobertura de gastos hospitalarios.",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80",
  },
];

// Normaliza lo que venga del storage (por si quedaron precios como string o registros antiguos)
const normalize = (list) =>
  (list || []).map((p) => {
    const priceNum =
      typeof p.price === "number"
        ? p.price
        : parseInt(String(p.price).replace(/\D/g, "") || "0", 10);

    return {
      ...p,
      id: typeof p.id === "number" ? p.id : Number(p.id),
      title: p.title || p.name || "",
      description: p.description || "Descripción no disponible.",
      image: p.image || "",
      price: Number.isFinite(priceNum) ? priceNum : 0,
    };
  });

export default function ProductDetailPage() {
  const { id } = useParams();
  const numericId = Number(id);
  const { addToCart, updateQuantity, isInCart, getItemQuantity, formatPrice } =
    useCart();

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
        Producto no encontrado · <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  // Relacionados: otros productos distintos al actual (toma hasta 4)
  const related = allProducts
    .filter((p) => Number(p.id) !== Number(product.id))
    .slice(0, 4);

  // Info carrito
  const inCart = isInCart(product.id);
  const currentQty = getItemQuantity(product.id);

  const handleAddToCart = () => {
    if (inCart) {
      updateQuantity(product.id, currentQty + 1);
    } else {
      addToCart(product);
    }
  };

  const displayTitle = product.title || product.name || "Producto";

  return (
    <div className="pd-container">
      <h1 className="pd-title">{displayTitle}</h1>

      <div className="pd-main">
        {/* Imagen principal */}
        <div className="pd-images">
          <img className="pd-main-img" src={mainImg} alt={displayTitle} />
        </div>

        {/* Buy box */}
        <div className="pd-buy">
          <div className="pd-price-wrap">
            <div className="pd-price">
              <span>Precio </span>
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="pd-stock">Stock disponible</div>

          <div className="pd-desc" style={{ marginTop: "20px" }}>
            <h2 className="pd-section-title">Descripción del producto</h2>
            <ul className="pd-feature-list">
              <li className="pd-feature-item">{product.description}</li>
            </ul>
          </div>

          {inCart && (
            <div className="pd-cart-status">
              ✓ {currentQty} {currentQty === 1 ? "unidad" : "unidades"} en el
              carrito
            </div>
          )}

          <div className="pd-btns">
            <button className="pd-btn-primary" onClick={handleAddToCart}>
              🛒 {inCart ? "Agregar al carrito (+)" : "Agregar al carrito"}
            </button>
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
                <img
                  className="pd-related-img"
                  src={item.image}
                  alt={item.title || item.name}
                />
                <div className="pd-related-content">
                  <h3 className="pd-related-title">
                    {item.title || item.name}
                  </h3>
                  <div className="pd-related-price">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </Link>
              <button
                className="pd-related-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                🛒 Agregar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
