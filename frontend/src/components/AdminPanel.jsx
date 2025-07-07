import React, { useState, useEffect } from 'react';
import '../styles/AdminPanel.css';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
        price: "$10.000/año",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 2,
        name: "Seguro de Hogar",
        title: "Seguro de Hogar",
        description: "Cubre daños por incendio, robo y responsabilidad civil en tu vivienda.",
        price: "$8.000/año",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 3,
        name: "Seguro de Vida",
        title: "Seguro de Vida",
        description: "Garantiza el bienestar de tus seres queridos ante cualquier eventualidad.",
        price: "$12.000/año",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 4,
        name: "Seguro de Salud",
        title: "Seguro de Salud",
        description: "Acceso a la mejor atención médica y cobertura de gastos hospitalarios.",
        price: "$15.000/año",
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
                  setProduct({ name: '', description: '', image: null, price: '' });
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
                      <img src={p.image} alt={p.name || p.title} className="table-image" />
                    </td>
                    <td>{p.name || p.title}</td>
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
