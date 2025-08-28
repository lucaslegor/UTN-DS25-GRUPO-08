import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/productDetail.css";

// Demo data (podés mover a un data.js)
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

export default function ProductDetailPage() {
  const { id } = useParams();
  const numericId = Number(id);

  const { addToCart, updateQuantity, isInCart, getItemQuantity, formatPrice } =
    useCart();

  // estado del producto actual
  const [product, setProduct] = React.useState(() => {
    const initial =
      defaultProducts.find((p) => p.id === numericId) || defaultProducts[0];
    return initial || null;
  });

  const [qty, setQty] = React.useState(1);
  const [mainImg, setMainImg] = React.useState("");


  // actualizar producto si cambia el id en la URL
  React.useEffect(() => {
    const found = defaultProducts.find((p) => p.id === numericId) || null;
    setProduct(found);
  }, [numericId]);

  // setear imagen principal cuando cambia el producto
React.useEffect(() => {
  if (!product) return;
  setMainImg(product.image || "");
}, [product]);

  if (!product)
    return <div className="pd-not-found">Producto no encontrado</div>;


  // relacionados (simple: otros productos)
  const related = defaultProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // info carrito
  const inCart = isInCart(product.id);
  const currentQty = getItemQuantity(product.id);

  const handleAddToCart = () => {
    if (inCart) {
      updateQuantity(product.id, currentQty + qty);
    } else {
      addToCart(product); // agrega 1
      if (qty > 1) updateQuantity(product.id, 1 + (qty - 1));
    }
  };

  return (
    <div className="pd-container">
      <h1 className="pd-title">{product.title}</h1>

      <div className="pd-main">
        {/* Galería */}
       <div className="pd-images">
          <img className="pd-main-img" src={mainImg} alt={product.title} />
        </div>

        {/* Buy box */}
        <div className="pd-buy">
          <div className="pd-price-wrap">
            <div className="pd-price">
              <span>Precio</span>
              {formatPrice(product.price)}{" "}
            </div>
          </div>

          <div className="pd-stock">Stock disponible</div>
          <div className="pd-desc">
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

      {/* Descripción */}

      {/* Vendedor */}
      <div className="pd-seller">
        Vendido por <strong>MAPS Asesores</strong>
      </div>

      {/* Relacionados */}
      <div className="pd-related">
        <h2 className="pd-section-title">Productos relacionados</h2>
        <div className="pd-related-grid">
          {related.map((item) => (
            <div key={`rel-${item.id}`} className="pd-related-card">
              {/* Navega al producto al hacer click en imagen/título */}
              <Link to={`/productcard/${item.id}`} className="pd-related-link">
                <img
                  className="pd-related-img"
                  src={item.image}
                  alt={item.title}
                />
                <div className="pd-related-content">
                  <h3 className="pd-related-title">{item.title}</h3>
                  <div className="pd-related-price">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </Link>

              {/* Solo este botón agrega al carrito */}
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
