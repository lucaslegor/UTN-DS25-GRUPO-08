import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import '../styles/AdminPanel.css';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
 const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    image: null,
    price: '',
    whatsappNumber: '2214971951'
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
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

      setProduct({ name: '', description: '', image: null, price: '', whatsappNumber: '2214971951' });
      setPreviewUrl(null);
      setEditingId(null);
    } catch (error) {
      setMessage('Error al procesar el producto');
      console.error('Error:', error);
    }
  };

  const handleEdit = (productToEdit) => {
    setProduct(productToEdit);
    setPreviewUrl(productToEdit.image);
    setEditingId(productToEdit.id);
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
      <main className="admin-main">
        <h1>Panel de Administración</h1>

        <div className="admin-container">
          <h2>{editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="name">Nombre del Producto:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                placeholder="Precio del producto"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Imagen del Producto:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required={!editingId}
              />
              {previewUrl && (
                <div className="image-preview">
                  <img src={previewUrl} alt="Preview" />
                </div>
              )}
            </div>

            <button type="submit" className="submit-button">
              {editingId ? 'Actualizar Producto' : 'Agregar Producto'}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setProduct({
                    name: '',
                    description: '',
                    image: null,
                    price: '',
                    whatsappNumber: '2214971951'
                  });
                  setPreviewUrl(null);
                  setEditingId(null);
                }}
              >
                Cancelar Edición
              </button>
            )}

            {message && (
              <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}
          </form>
        </div>

        <div className="admin-container products-table-container">
          <h2>Productos Existentes</h2>
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
                      <img src={p.image} alt={p.name} className="table-image" />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.description}</td>
                    <td>{p.price}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(p)}>
                        Editar
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(p.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
