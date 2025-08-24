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
  ArrowBack
} from '@mui/icons-material';
import { 
  IconButton, 
  Tooltip, 
  Chip,
  Divider 
} from '@mui/material';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    image: null,
    price: ''
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('form'); // 'form' o 'products'
  const navigate = useNavigate();

  // USE EFFECT ADMIN PANEL arreglado por luquita
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const defaultProducts = [
        {
          id: 1,
          name: "Seguro de Auto",
          title: "Seguro de Auto",
          description: "Protección completa para tu vehículo ante accidentes, robos y daños a terceros.",
          price: 10.000,
          image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          name: "Seguro de Hogar",
          title: "Seguro de Hogar",
          description: "Cubre daños por incendio, robo y responsabilidad civil en tu vivienda.",
          price: 8.000,
          image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 3,
          name: "Seguro de Vida",
          title: "Seguro de Vida",
          description: "Garantiza el bienestar de tus seres queridos ante cualquier eventualidad.",
          price: 12.000,
          image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 4,
          name: "Seguro de Salud",
          title: "Seguro de Salud",
          description: "Acceso a la mejor atención médica y cobertura de gastos hospitalarios.",
          price: 15.000,
          image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80"
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const formattedPrice = product.price.includes('$') ? product.price : `$${Number(product.price).toLocaleString('es-AR')}/año`;
      const updatedProduct = {
        ...product,
        title: product.name,
        price: formattedPrice,
        description: product.description || 'Descripción no disponible.',
        image: previewUrl || product.image,
        id: editingId || Date.now()
      };

      let updatedProducts;
      if (editingId) {
        updatedProducts = products.map(p => p.id === editingId ? updatedProduct : p);
        setMessage('Producto actualizado exitosamente');
      } else {
        updatedProducts = [...products, updatedProduct];
        setMessage('Producto agregado exitosamente');
      }

      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      setProduct({ name: '', description: '', image: null, price: '' });
      setPreviewUrl(null);
      setEditingId(null);
    } catch (error) {
      setMessage('Error al procesar el producto');
      console.error('Error:', error);
    }
  };

  const handleEdit = (productToEdit) => {
    setProduct({
      name: productToEdit.name || productToEdit.title || '',
      title: productToEdit.title || productToEdit.name || '',
      description: productToEdit.description || '',
      price: productToEdit.price || '',
      image: productToEdit.image || ''
    });
    setPreviewUrl(productToEdit.image);
    setEditingId(productToEdit.id);
    setActiveTab('form');
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setMessage('Producto eliminado exitosamente');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/login');
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <IconButton 
            onClick={() => navigate('/')}
            className="back-button"
            sx={{ color: '#fff' }}
          >
            <ArrowBack />
          </IconButton>
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
                {editingId ? <Edit className="form-header-icon" /> : <Add className="form-header-icon" />}
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
              <div className="form-grid">
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

                <div className="form-group">
                  <label htmlFor="price">
                    <span className="label-icon">💰</span>
                    Precio
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
                    required={!editingId}
                  />
                  <div className="file-input-overlay">
                    <Image className="file-icon" />
                    <span>Seleccionar imagen</span>
                  </div>
                </div>
                {previewUrl && (
                  <div className="image-preview">
                    <img src={previewUrl} alt="Preview" />
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
                    onClick={() => {
                      setProduct({ name: '', description: '', image: null, price: '' });
                      setPreviewUrl(null);
                      setEditingId(null);
                    }}
                  >
                    <Cancel className="button-icon" />
                    Cancelar Edición
                  </button>
                )}
              </div>

              {message && (
                <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
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
                          <img src={p.image} alt={p.name || p.title} className="table-image" />
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
                          {p.description.length > 100 
                            ? `${p.description.substring(0, 100)}...` 
                            : p.description
                          }
                        </div>
                      </td>
                      <td>
                        <div className="product-price">
                          <span className="price-amount">{p.price}</span>
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
