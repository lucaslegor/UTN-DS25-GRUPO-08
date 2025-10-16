import React from "react";
import { apiFetch } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import ProductCard from "../components/ProductCard";

// 👉 Seed solo para la primera carga si no hay nada en localStorage
export const defaultProducts = [
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

const Home = () => {
  const [search, setSearch] = React.useState("");
  const [products, setProducts] = React.useState([]);

  // Normaliza lo que haya en localStorage (por si algunos precios quedaron como string)
  const normalize = (list) =>
    (list || []).map((p) => ({
      ...p,
      // aseguro number
      price:
        typeof p.price === "number"
          ? p.price
          : parseInt(String(p.price).replace(/\D/g, "") || "0", 10),
      // aseguro title (AdminPanel guarda name y title iguales)
      title: p.title || p.name || "",
    }));

  React.useEffect(() => {
    let mounted = true;
    // Preferimos API; si falla, fallback a localStorage/seed
    apiFetch('/api/productos')
      .then((data) => {
        const list = Array.isArray(data?.products) ? data.products : (data?.productos || []);
        const onlyActive = list.filter((p) => p.isActive !== false);
        const uiProducts = onlyActive.map((p) => ({
          id: p.id,
          title: p.titulo,
          description: p.descripcion,
          price: p.precio,
          image: p.imagenUrl || '/seguro.png',
        }));
        if (mounted) {
          setProducts(uiProducts);
          try { localStorage.setItem('products', JSON.stringify(uiProducts)); } catch {}
        }
      })
      .catch(() => {
        const stored = localStorage.getItem("products");
        if (stored) {
          const parsed = normalize(JSON.parse(stored));
          setProducts(parsed);
          localStorage.setItem("products", JSON.stringify(parsed));
        } else {
          setProducts(defaultProducts);
          localStorage.setItem("products", JSON.stringify(defaultProducts));
        }
      });
    return () => { mounted = false; };
  }, []);

  const visible = (search.trim()
    ? products.filter(
        (p) =>
          p.title?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase())
      )
    : products) ;

  return (
    <>
      <section className="filters" style={{ textAlign: "center" }}>
        <h1 className="home-header-title">Nuestros Seguros</h1>
        {/* Si querés buscar desde Home directamente, agrega un input aquí */}
        {/* <input value={search} onChange={(e) => setSearch(e.target.value)} /> */}
      </section>

      <main>
        <div className="catalog">
          {visible.length > 0 ? (
            visible.map((product) => (
              <Link
                key={product.id}
                to={`/productcard/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCard {...product} />
              </Link>
            ))
          ) : (
            <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
              No se encontraron productos que coincidan con la búsqueda.
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
