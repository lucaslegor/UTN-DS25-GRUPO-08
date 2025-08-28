import React, { useState, useEffect } from 'react';
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
} from '@mui/icons-material';
import { IconButton, Tooltip, Chip } from '@mui/material';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Seguro de Auto',
    title: 'Seguro de Auto',
    description:
      'Protección completa para tu vehículo ante accidentes, robos y daños a terceros.',
    price: 10000, // número
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
    rubro: 'automotor',
  },
  {
    id: 2,
    name: 'Seguro de Hogar',
    title: 'Seguro de Hogar',
    description:
      'Cubre daños por incendio, robo y responsabilidad civil en tu vivienda.',
    price: 8000,
    image:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    rubro: 'hogar',
  },
  {
    id: 3,
    name: 'Seguro de Vida',
    title: 'Seguro de Vida',
    description:
      'Garantiza el bienestar de tus seres queridos ante cualquier eventualidad.',
    price: 12000,
    image:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    rubro: 'vida',
  },
  {
    id: 4,
    name: 'Seguro de Salud',
    title: 'Seguro de Salud',
    description:
      'Acceso a la mejor atención médica y cobertura de gastos hospitalarios.',
    price: 15000,
    image:
      'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80',
    rubro: 'salud',
  },
];

// Normaliza precios y estructura de productos leídos de localStorage
const normalizeProducts = (list) =>
  (list || []).map((p) => {
    // price puede venir como "$12.000/año" o "12000" o 12000
    const raw = String(p.price ?? '')
      .replace(/\s/g, '')
      .replace(/[^0-9,.]/g, ''); // deja dígitos y , .
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

// Formatea ARS al mostrar
const formatARS = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(
    typeof n === 'number' ? n : Number(n) || 0
  ) + '/año';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    image: '', // string (url/base64)
    rubro: '',
    price: '',
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'products'
  const navigate = useNavigate();

  // Protege la ruta
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/login');
  }, [navigate]);

  // Carga / migra productos
  useEffect(() => {
    const saved = localStorage.getItem('products');
    if (saved) {
      const parsed = JSON.parse(saved);
      const normalized = normalizeProducts(parsed);
      setProducts(normalized);
      localStorage.setItem('products', JSON.stringify(normalized));
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem('products', JSON.stringify(DEFAULT_PRODUCTS));
    }
  }, []);

  // Inputs genéricos (incluye select rubro)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Imagen: guardamos como DataURL para persistir en localStorage
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
      name: '',
      description: '',
      image: '',
      rubro: '',
      price: '',
    });
    setPreviewUrl(null);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    try{
      // limpiamos y convertimos el precio a número
      const numericPrice = parseInt(
        String(product.price).replace(/\D/g, '') || '0',
        10
      );

      const updated = {
        id: editingId ?? Date.now(),
        name: product.name.trim(),
        title: product.name.trim(),
        description: product.description.trim(),
        rubro: product.rubro || '',
        price: Number.isFinite(numericPrice) ? numericPrice : 0,
        image: product.image || previewUrl || '',
      };

      let next;
      if (editingId) {
        next = products.map((p) => (p.id === editingId ? updated : p));
        setMessage('Producto actualizado exitosamente');
      } else {
        next = [...products, updated];
        setMessage('Producto agregado exitosamente');
      }

      setProducts(next);
      localStorage.setItem('products', JSON.stringify(next));
      resetForm();
      setActiveTab('products');
    } catch (err) {
      console.error(err);
      setMessage('Error al procesar el producto');
    }
  };

  const handleEdit = (p) => {
    setProduct({
      name: p.name || p.title || '',
      description: p.description || '',
      price: p.price ?? '',
      image: p.image || '',
      rubro: p.rubro || '',
    });
    setPreviewUrl(p.image || null);
    setEditingId(p.id);
    setActiveTab('form');
  };

  const handleDelete = (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    localStorage.setItem('products', JSON.stringify(next));
    setMessage('Producto eliminado exitosamente');
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
        </div>

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
                <label htmlFor="name">
                  <span className="label-icon">📝</span>
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Seguro de Auto Premium"
                  required
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="price">
                    <span className="label-icon">💰</span>
                    Precio (ARS)
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    placeholder="Ej: 15000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rubro">
                    <span className="label-icon">💼</span>
                    Rubro
                  </label>
                  <select
                    id="rubro"
                    name="rubro"
                    value={product.rubro}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="salud">Salud</option>
                    <option value="automotor">Automotor</option>
                    <option value="hogar">Hogar</option>
                    <option value="vida">Vida</option>
                    <option value="mascota">Mascota</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  <span className="label-icon">📄</span>
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  placeholder="Describe las características y beneficios del seguro..."
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
                <button type="submit" className="submit-button">
                  <Save className="button-icon" />
                  {editingId ? 'Actualizar Producto' : 'Agregar Producto'}
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

            <div className="table-responsive">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="table-image-container">
                          <img
                            src={p.image}
                            alt={p.name || p.title}
                            className="table-image"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="product-name">
                          <strong>{p.name || p.title}</strong>
                          <Chip label="Activo" color="success" size="small" />
                        </div>
                      </td>
                      <td>
                        <div className="product-description">
                          {p.description?.length > 100
                            ? `${p.description.substring(0, 100)}...`
                            : p.description}
                        </div>
                      </td>
                      <td>
                        <div className="product-price">
                          <span className="price-amount">
                            {formatARS(p.price)}
                          </span>
                        </div>
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
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', opacity: .7 }}>
                        No hay productos cargados.
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
