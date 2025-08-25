import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import ProductCard from "../components/ProductCard";
import NavButton from "../components/NavButton";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Autocomplete } from "@mui/material";

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
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      const parsed = JSON.parse(storedProducts).map((p) => ({
        ...p,
        price: Number(p.price), // forzamos a número
      }));
      setProducts(parsed);
      localStorage.setItem("products", JSON.stringify(parsed)); // lo volvemos a guardar corregido
    } else {
      const correctedDefaults = defaultProducts.map((p) => ({
        ...p,
        price: Number(p.price),
      }));
      setProducts(correctedDefaults);
      localStorage.setItem("products", JSON.stringify(correctedDefaults));
    }
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
  );

  const opciones = ["Salud", "Hogar"];
  return (
    <>
      <section
        className="filters"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "8em",
        }}
      >
       <h1 className="home-header-title">
        Nuestros Seguros
       </h1>
      </section>

      <main>
        <div className="catalog">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
