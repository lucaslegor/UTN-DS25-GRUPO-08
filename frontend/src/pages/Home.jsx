import React from "react";
import { apiFetch } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import { Box, Typography, CircularProgress, Card, CardContent } from '@mui/material';


const Home = () => {
  const [search, setSearch] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [tipoFilter, setTipoFilter] = React.useState("todos");
  const [sortOrder, setSortOrder] = React.useState("alfabetico");

  const normalize = (list) =>
    (list || []).map((p) => ({
      ...p,
      title: p.title || p.name || "",
      tipo: p.tipo || "auto",
      cobertura: p.cobertura || "Cobertura básica",
    }));

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiFetch('/productos')
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
          setProducts([]);
          localStorage.setItem("products", JSON.stringify([]));
        }
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const getUniqueTypes = () => {
    const types = [...new Set(products.map(p => p.tipo).filter(Boolean))];
    return types.sort();
  };

  const getFilteredAndSortedProducts = () => {
    let filtered = products;

    if (search.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (tipoFilter !== "todos") {
      filtered = filtered.filter(p => p.tipo === tipoFilter);
    }

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

  if (loading) {
    return (
      <Box sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}>
        <CircularProgress size={56} />
        <Typography variant="subtitle1" color="text.secondary">
          Cargando empaquetados
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <section className="filters" style={{ textAlign: "center" }}>
        <h1 className="home-header-title">Nuestros Seguros</h1>
      </section>

      <main>
        {/* Filtros compactos en la parte superior derecha */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: { xs: 'center', md: 'flex-end' },
          alignItems: 'center',
          gap: 2,
          mb: 2,
          pr: { xs: 0, md: 2 },
          mt: { xs: 2, md: 0 }
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
                <div className="catalog-card">
                  <div className="catalog-card__inner">
                    <Card sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}>
                      <div className="catalog-card__header">
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#2a55c7',
                            fontWeight: 800,
                            letterSpacing: '.2px',
                            mb: 0.2,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' },
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#2f2f2f',
                            lineHeight: 1.5,
                            fontSize: '1.08rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {product.description}
                        </Typography>
                      </div>
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          minHeight: '120px',
                          maxHeight: '200px',
                          overflow: 'hidden',
                          aspectRatio: '16/9'
                        }}
                        className="catalog-card__media"
                      >
                        <img
                          src={product.image}
                          loading="lazy"
                          alt={product.title || 'Imagen'}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                      <div className="catalog-card__divider" />
                      <CardContent>
                        <div className="catalog-card__meta">
                          <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#666', fontSize: '0.9rem' }}>Tipo:</Typography>
                          <Typography sx={{ fontSize: '1.05rem', fontWeight: '700', color:'#1976d2', mb: 1 }}>
                            {product.tipo?.toUpperCase()}
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#666', fontSize: '0.9rem' }}>Cobertura:</Typography>
                          <Typography sx={{ fontSize: '0.95rem', color:'#2e7d32' }}>
                            {product.cobertura}
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
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
