import React from "react";
import { apiFetch } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import { Box, Typography } from '@mui/material';
import { Card, CardContent, AspectRatio } from '@mui/joy';

// 👉 Seed solo para la primera carga si no hay nada en localStorage
export const defaultProducts = [
  {
    id: 1,
    title: "Seguro de Auto",
    description:
      "Protección completa para tu vehículo ante accidentes, robos y daños a terceros.",
    tipo: "auto",
    cobertura: "Cobertura total hasta $5.000.000",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Seguro de Hogar",
    description:
      "Cubre daños por incendio, robo y responsabilidad civil en tu vivienda.",
    tipo: "hogar",
    cobertura: "Cobertura hasta $2.000.000",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Seguro de Vida",
    description:
      "Garantiza el bienestar de tus seres queridos ante cualquier eventualidad.",
    tipo: "vida",
    cobertura: "Beneficio de $3.000.000",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Seguro de Salud",
    description:
      "Acceso a la mejor atención médica y cobertura de gastos hospitalarios.",
    tipo: "salud",
    cobertura: "Cobertura 100% en internaciones y cirugías",
    image:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  const [search, setSearch] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [tipoFilter, setTipoFilter] = React.useState("todos");
  const [sortOrder, setSortOrder] = React.useState("alfabetico");

  // Normaliza lo que haya en localStorage
  const normalize = (list) =>
    (list || []).map((p) => ({
      ...p,
      // aseguro title (AdminPanel guarda name y title iguales)
      title: p.title || p.name || "",
      // aseguro tipo y cobertura
      tipo: p.tipo || "auto",
      cobertura: p.cobertura || "Cobertura básica",
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
          tipo: p.tipo,
          cobertura: p.cobertura,
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

  // Función para obtener tipos únicos de productos
  const getUniqueTypes = () => {
    const types = [...new Set(products.map(p => p.tipo).filter(Boolean))];
    return types.sort();
  };

  // Función de filtrado y ordenamiento
  const getFilteredAndSortedProducts = () => {
    let filtered = products;

    // Filtro por búsqueda
    if (search.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtro por tipo
    if (tipoFilter !== "todos") {
      filtered = filtered.filter(p => p.tipo === tipoFilter);
    }

    // Ordenamiento
    if (sortOrder === "alfabetico") {
      filtered = [...filtered].sort((a, b) => 
        (a.title || "").localeCompare(b.title || "")
      );
    } else if (sortOrder === "tipo") {
      filtered = [...filtered].sort((a, b) => 
        (a.tipo || "").localeCompare(b.tipo || "")
      );
    }

    return filtered;
  };

  const visible = getFilteredAndSortedProducts();

  return (
    <>
      <section className="filters" style={{ textAlign: "center" }}>
        <h1 className="home-header-title">Nuestros Seguros</h1>
      </section>

      <main>
        {/* Filtros compactos en la parte superior derecha */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center',
          gap: 2,
          marginBottom: 2,
          paddingRight: 2
        }}>
          {/* Mini título */}
          <Typography variant="caption" sx={{ 
            fontSize: '0.7rem', 
            fontWeight: 'bold', 
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Filtros
          </Typography>
          
          {/* Contador de resultados */}
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            {visible.length} de {products.length}
          </Typography>
          
          {/* Filtro por tipo - diseño compacto */}
          <select
            value={tipoFilter}
            onChange={(e) => setTipoFilter(e.target.value)}
            style={{
              padding: '4px 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '0.8rem',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="todos">Todos</option>
            {getUniqueTypes().map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Filtro por orden - diseño compacto */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: '4px 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '0.8rem',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="alfabetico">A-Z</option>
            <option value="tipo">Tipo</option>
          </select>
        </Box>

        <div className="catalog">
          {visible.length > 0 ? (
            visible.map((product) => (
              <Link
                key={product.id}
                to={`/productcard/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card sx={{ width: 320, backgroundColor: 'transparent', borderColor:'#dbe1f0' }}>
                  <div>
                    <Typography level="title-lg" sx={{color: '#3877ffff'}}>{product.title}</Typography>
                    <Typography level="body-sm">{product.description}</Typography>
                  </div>
                  <AspectRatio minHeight="120px" maxHeight="200px">
                    <img
                      src={product.image}
                      loading="lazy"
                      alt={product.title || 'Imagen'}
                    />
                  </AspectRatio>
                  <CardContent orientation="vertical">
                    <div>
                      <Typography level="body-xs" sx={{ fontWeight: 'bold', color: '#666' }}>Tipo:</Typography>
                      <Typography sx={{ fontSize: 'md', fontWeight: 'lg', color:'#1976d2', mb: 1 }}>
                        {product.tipo?.toUpperCase()}
                      </Typography>
                      <Typography level="body-xs" sx={{ fontWeight: 'bold', color: '#666' }}>Cobertura:</Typography>
                      <Typography sx={{ fontSize: 'sm', color:'#2e7d32' }}>
                        {product.cobertura}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
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
