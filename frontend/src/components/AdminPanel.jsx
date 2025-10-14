import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';
import { useNavigate } from 'react-router-dom';
import {
  Add,
  Edit,
  Delete,
  Save,
  Cancel,
  Image,
  Dashboard,
  Inventory,
  Settings,
  People,
  Search as SearchIcon,
} from '@mui/icons-material';
import { IconButton, Tooltip, Chip } from '@mui/material';
import { apiFetch } from '../services/api';

/** ========= Config API ========= */
const RAW_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
const API_BASE = RAW_BASE.endsWith('/api') ? RAW_BASE : `${RAW_BASE}/api`;

/** Normaliza precios y estructura de productos leídos de localStorage */
const normalizeProducts = (list) =>
  (list || []).map((p) => {
    const raw = String(p.price ?? '')
      .replace(/\s/g, '')
      .replace(/[^0-9,.]/g, '');
    const numeric = raw
      ? parseInt(raw.replace(/\./g, '').replace(/,/g, ''), 10)
      : Number(p.price) || 0;

    return {
      id: p.id ?? Date.now() + Math.random(),
      name: p.name ?? p.title ?? '',
      title: p.title ?? p.name ?? '',
      description: p.description ?? '',
      image: p.image ?? '',
      rubro: p.rubro ?? '',
      price: Number.isFinite(numeric) ? numeric : 0,
    };
  });

/** Formatea ARS al mostrar */
const formatARS = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(
    typeof n === 'number' ? n : Number(n) || 0
  ) + '/año';

const AdminPanel = () => {
  /** ======= Productos (CRUD API) ======= */
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    titulo: '',
    descripcion: '',
    cobertura: '',
    tipo: '',
    precio: '',
    isActive: true,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState('');

  /** ======= Usuarios (API) ======= */
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'products' | 'users'
  const [users, setUsers] = useState([]);
  const [userQuery, setUserQuery] = useState('');
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');

  const navigate = useNavigate();

  // Protege la ruta
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/login');
  }, [navigate]);

  // Carga productos desde API
  useEffect(() => {
    if (activeTab === 'products') {
      loadProducts();
    }
  }, [activeTab]);

  // Cargar usuarios al entrar en pestaña "users"
  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab]);

  /** ======= Helpers API ======= */
  const authHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token'); // si guardás el JWT con la key 'token'
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  };

  /** ======= API Productos ======= */

async function loadProducts() {
  setProductsLoading(true);
  setProductsError("");

  try {
    // 1) Llamá al backend con apiFetch (ya agrega Authorization si hay token)
    const data = await apiFetch("/api/productos");

    // 2) Soportá distintos formatos: [{...}] o { products: [...] }
    const list = Array.isArray(data) ? data : (data.products || []);

    setProducts(list ?? []);
  } catch (err) {
    console.error(err);

    // 3) Mensaje visible y fallback local para que el panel sea usable
    setProductsError("No se pudieron cargar los productos del servidor. Mostrando datos locales si existen.");

    try {
      const saved = localStorage.getItem("products");
      setProducts(saved ? JSON.parse(saved) : []);
    } catch {
      setProducts([]);
    }
  } finally {
    setProductsLoading(false);
  }
}


  async function createProduct(productData) {
    try {
      const resp = await fetch(`${API_BASE}/productos`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(productData)
      });
      if (!resp.ok) throw new Error('Error creando producto');
      const data = await resp.json();
      return data.product;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function updateProduct(id, productData) {
    try {
      const resp = await fetch(`${API_BASE}/productos/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(productData)
      });
      if (!resp.ok) throw new Error('Error actualizando producto');
      const data = await resp.json();
      return data.product;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function deleteProduct(id) {
    try {
      const resp = await fetch(`${API_BASE}/productos/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (!resp.ok) throw new Error('Error eliminando producto');
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const normalizeUsers = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.usuarios)) return data.usuarios;
  if (data.usuario) return [data.usuario];
  return [];
};

async function loadUsers() {
  setUsersLoading(true);
  setUsersError("");

  try {
    const q = userQuery.trim();
    if (q) {
      const byUsername = await apiFetch(`/api/usuarios/${encodeURIComponent(q)}`)
        .then(normalizeUsers)
        .catch(async (err) => {
          if (String(err.message).includes("404")) return null;
          throw err; 
        });

      if (byUsername && byUsername.length) {
        setUsers(byUsername.filter(Boolean));
        return;
      }

      const all = normalizeUsers(await apiFetch("/api/usuarios"));
      const lower = q.toLowerCase();
      const filtered = all.filter(
        (u) =>
          u?.username?.toLowerCase().includes(lower) ||
          u?.mail?.toLowerCase().includes(lower)
      );
      setUsers(filtered);
      return;
    }

    const all = normalizeUsers(await apiFetch("/api/usuarios"));
    setUsers(all.filter(Boolean));
  } catch (err) {
    console.error(err);
    setUsersError("No se pudieron cargar los usuarios");
    setUsers([]);
  } finally {
    setUsersLoading(false);
  }
}

  /** ======= Handlers Productos ======= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = String(reader.result);
      setPreviewUrl(dataUrl);
      setProduct((prev) => ({ ...prev, image: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setProduct({
      titulo: '',
      descripcion: '',
      cobertura: '',
      tipo: '',
      precio: '',
      isActive: true,
    });
    setPreviewUrl(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setProductsLoading(true);
    
    try {
      const numericPrice = parseInt(
        String(product.precio).replace(/\D/g, '') || '0',
        10
      );

      const productData = {
        titulo: product.titulo.trim(),
        descripcion: product.descripcion.trim(),
        cobertura: product.cobertura.trim(),
        tipo: product.tipo,
        precio: Number.isFinite(numericPrice) ? numericPrice : 0,
        isActive: product.isActive,
      };

      let updatedProduct;
      if (editingId) {
        updatedProduct = await updateProduct(editingId, productData);
        setMessage('Producto actualizado exitosamente');
      } else {
        updatedProduct = await createProduct(productData);
        setMessage('Producto agregado exitosamente');
      }

      // Recargar la lista de productos
      await loadProducts();
      resetForm();
      setActiveTab('products');
    } catch (err) {
      console.error(err);
      setMessage('Error al procesar el producto: ' + err.message);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleEdit = (p) => {
    setProduct({
      titulo: p.titulo || '',
      descripcion: p.descripcion || '',
      cobertura: p.cobertura || '',
      tipo: p.tipo || '',
      precio: p.precio ?? '',
      isActive: p.isActive ?? true,
    });
    setPreviewUrl(null);
    setEditingId(p.id);
    setActiveTab('form');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      await deleteProduct(id);
      setMessage('Producto eliminado exitosamente');
      // Recargar la lista de productos
      await loadProducts();
    } catch (err) {
      console.error(err);
      setMessage('Error al eliminar el producto: ' + err.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-text">
            <Dashboard className="header-icon" />
            <h1>Panel de Administración</h1>
          </div>
        </div>
      </div>

      <main className="admin-main">
        <div className="admin-stats">
          <div className="stat-card">
            <Inventory className="stat-icon" />
            <div className="stat-content">
              <h3>{products.length}</h3>
              <p>Productos Totales</p>
            </div>
          </div>
          <div className="stat-card">
            <Settings className="stat-icon" />
            <div className="stat-content">
              <h3>{editingId ? 'Editando' : 'Listo'}</h3>
              <p>Estado del Sistema</p>
            </div>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            <Add className="tab-icon" />
            {editingId ? 'Editar Producto' : 'Agregar Producto'}
          </button>

          <button
            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Inventory className="tab-icon" />
            Ver Productos ({products.length})
          </button>

          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <People className="tab-icon" />
            Ver Usuarios
          </button>
        </div>

        {/* ======= Form Producto ======= */}
        {activeTab === 'form' && (
          <div className="admin-container form-container">
            <div className="form-header">
              <h2>
                {editingId ? (
                  <Edit className="form-header-icon" />
                ) : (
                  <Add className="form-header-icon" />
                )}
                {editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h2>
              {editingId && (
                <Chip
                  label="Modo Edición"
                  color="warning"
                  variant="outlined"
                  icon={<Edit />}
                />
              )}
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="titulo">
                  <span className="label-icon">📝</span>
                  Título del Producto
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={product.titulo}
                  onChange={handleInputChange}
                  placeholder="Ej: Seguro de Auto Premium"
                  required
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="precio">
                    <span className="label-icon">💰</span>
                    Precio (ARS)
                  </label>
                  <input
                    type="text"
                    id="precio"
                    name="precio"
                    value={product.precio}
                    onChange={handleInputChange}
                    placeholder="Ej: 15000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tipo">
                    <span className="label-icon">💼</span>
                    Tipo de Seguro
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={product.tipo}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="auto">Auto</option>
                    <option value="hogar">Hogar</option>
                    <option value="vida">Vida</option>
                    <option value="salud">Salud</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">
                  <span className="label-icon">📄</span>
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={product.descripcion}
                  onChange={handleInputChange}
                  placeholder="Describe las características y beneficios del seguro..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cobertura">
                  <span className="label-icon">🛡️</span>
                  Cobertura
                </label>
                <input
                  type="text"
                  id="cobertura"
                  name="cobertura"
                  value={product.cobertura}
                  onChange={handleInputChange}
                  placeholder="Ej: Cobertura total hasta $5.000.000"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">
                  <Image className="label-icon" />
                  Imagen del Producto
                </label>
                <div className="file-input-container">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    required={!editingId && !product.image}
                  />
                  <div className="file-input-overlay">
                    <Image className="file-icon" />
                    <span>Seleccionar imagen</span>
                  </div>
                </div>

                {(previewUrl || product.image) && (
                  <div className="image-preview">
                    <img src={previewUrl || product.image} alt="Preview" />
                    <Chip label="Vista previa" color="info" size="small" />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={productsLoading}
                >
                  <Save className="button-icon" />
                  {productsLoading 
                    ? 'Procesando...' 
                    : editingId ? 'Actualizar Producto' : 'Agregar Producto'
                  }
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={resetForm}
                  >
                    <Cancel className="button-icon" />
                    Cancelar Edición
                  </button>
                )}
              </div>

              {message && (
                <div
                  className={`message ${
                    message.includes('Error') ? 'error' : 'success'
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        )}

        {/* ======= Tabla Productos ======= */}
        {activeTab === 'products' && (
          <div className="admin-container products-container">
            <div className="products-header">
              <h2>
                <Inventory className="form-header-icon" />
                Productos Existentes
              </h2>
              <Chip
                label={`${products.length} productos`}
                color="primary"
                variant="outlined"
              />
            </div>

            {productsLoading && <div className="message">Cargando productos…</div>}
            {productsError && <div className="message error">{productsError}</div>}

            <div className="table-responsive">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="product-id">
                          <strong>#{p.id}</strong>
                        </div>
                      </td>
                      <td>
                        <div className="product-name">
                          <strong>{p.titulo}</strong>
                          <div className="product-description">
                            {p.descripcion?.length > 50
                              ? `${p.descripcion.substring(0, 50)}...`
                              : p.descripcion}
                          </div>
                        </div>
                      </td>
                      <td>
                        <Chip 
                          label={p.tipo?.toUpperCase() || 'N/A'} 
                          color="primary" 
                          size="small" 
                        />
                      </td>
                      <td>
                        <div className="product-price">
                          <span className="price-amount">
                            {formatARS(p.precio)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <Chip 
                          label={p.isActive ? 'Activo' : 'Inactivo'} 
                          color={p.isActive ? 'success' : 'error'} 
                          size="small" 
                        />
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Tooltip title="Editar producto">
                            <IconButton
                              className="edit-button"
                              onClick={() => handleEdit(p)}
                              size="small"
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar producto">
                            <IconButton
                              className="delete-button"
                              onClick={() => handleDelete(p.id)}
                              size="small"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!productsLoading && products.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', opacity: 0.7 }}>
                        {productsError ? 'Error cargando productos' : 'No hay productos cargados.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======= Usuarios (API) ======= */}
        {activeTab === 'users' && (
          <div className="admin-container users-container">
            <div className="products-header">
              <h2>
                <People className="form-header-icon" />
                Usuarios
              </h2>
            </div>

            <div className="users-toolbar">
              <div className="users-search-wrap">
                <SearchIcon className="users-search-icon" fontSize="small" />
                <input
                  className="users-search"
                  type="search"
                  placeholder="Buscar por username exacto…"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') loadUsers();
                  }}
                />
              </div>
              <button className="submit-button" onClick={loadUsers}>
                Buscar
              </button>
            </div>

            {usersLoading && <div className="message">Cargando usuarios…</div>}
            {usersError && <div className="message error">{usersError}</div>}

            <div className="table-responsive">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Creado</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.idUsuario || u.id || u.username}>
                      <td>{u.idUsuario ?? u.id ?? '—'}</td>
                      <td>{u.username ?? '—'}</td>
                      <td>{u.mail ?? '—'}</td>
                      <td>{u.rol ?? '—'}</td>
                      <td>
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleString('es-AR')
                          : '—'}
                      </td>
                    </tr>
                  ))}
                  {!usersLoading && users.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', opacity: 0.7 }}>
                        {userQuery ? 'Sin coincidencias' : 'No hay usuarios'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;