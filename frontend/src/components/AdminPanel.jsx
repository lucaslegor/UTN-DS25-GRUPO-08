import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
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
import { apiFetch, listPedidosApi, uploadPolizaFileApi } from '../services/api';
import * as yup from 'yup';

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

/** Esquema de validación con Yup */
const productValidationSchema = yup.object({
  titulo: yup
    .string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d\-.,!?]+$/, 'El título contiene caracteres no válidos'),
  descripcion: yup
    .string()
    .required('La descripción es obligatoria')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  cobertura: yup
    .string()
    .required('La cobertura es obligatoria')
    .min(5, 'La cobertura debe tener al menos 5 caracteres')
    .max(200, 'La cobertura no puede exceder 200 caracteres'),
  tipo: yup
    .string()
    .required('El tipo de seguro es obligatorio')
    .oneOf(['auto', 'hogar', 'vida', 'salud'], 'Debe seleccionar un tipo válido'),
  precio: yup
    .string()
    .required('El precio es obligatorio')
    .test('is-number', 'El precio debe ser un número válido', (value) => {
      if (!value) return false;
      const numericValue = parseInt(String(value).replace(/\D/g, ''));
      return !isNaN(numericValue) && numericValue > 0;
    })
    .test('min-price', 'El precio debe ser mayor a $1000', (value) => {
      if (!value) return false;
      const numericValue = parseInt(String(value).replace(/\D/g, ''));
      return numericValue >= 1000;
    })
    .test('max-price', 'El precio no puede exceder $10,000,000', (value) => {
      if (!value) return false;
      const numericValue = parseInt(String(value).replace(/\D/g, ''));
      return numericValue <= 10000000;
    }),
  image: yup
    .mixed()
    .test('file-required', 'La imagen es obligatoria para nuevos productos', function(value) {
      const { editingId } = this.options.context || {};
      if (!editingId && !value) return false;
      return true;
    })
    .test('file-type', 'Solo se permiten archivos de imagen (JPG, PNG, JPEG)', function(value) {
      if (!value) return true; // Si no hay archivo, no validar tipo
      return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
    })
    .test('file-size', 'El archivo no puede exceder 5MB', function(value) {
      if (!value) return true; // Si no hay archivo, no validar tamaño
      return value.size <= 5 * 1024 * 1024; // 5MB
    })
});

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
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  /** ======= Usuarios (API) ======= */
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'products' | 'users' | 'polizas'
  const [users, setUsers] = useState([]);
  const [userQuery, setUserQuery] = useState('');
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');

  /** ======= Polizas (asignación) ======= */
  const [pedidos, setPedidos] = useState([]);
  const [pedidosLoading, setPedidosLoading] = useState(false);
  const [pedidosError, setPedidosError] = useState('');
  const [assignFile, setAssignFile] = useState(null);
  const [selectedPedidoId, setSelectedPedidoId] = useState('');
  const [pedidoSearchTerm, setPedidoSearchTerm] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isUploadingPoliza, setIsUploadingPoliza] = useState(false);

  const navigate = useNavigate();

  // Protege la ruta: requiere token válido y rol ADMINISTRADOR
  useEffect(() => {
    try {
      const authRaw = localStorage.getItem('auth');
      const auth = authRaw ? JSON.parse(authRaw) : null;
      const hasToken = Boolean(auth?.token);
      const isAdmin = String(auth?.user?.rol || '').toUpperCase() === 'ADMINISTRADOR';
      if (!hasToken || !isAdmin) navigate('/login');
    } catch {
      navigate('/login');
    }
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

  // Cargar pedidos para asignar pólizas
  useEffect(() => {
    if (activeTab === 'polizas') {
      loadPedidos();
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
  setProductsError('');
  try {
    const data = await apiFetch('/api/productos');   // <-- usa apiFetch
    setProducts(data.products || []);
  } catch (err) {
    console.error(err);
    setProductsError('No se pudieron cargar los productos');
    setProducts([]);
  } finally {
    setProductsLoading(false);
  }
}


  async function createProduct(productData) {
    try {
      const data = await apiFetch('/api/productos', {
        method: 'POST',
        body: productData,
      });
      return data.product;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function updateProduct(id, productData) {
    try {
      const data = await apiFetch(`/api/productos/${id}`, {
        method: 'PUT',
        body: productData,
      });
      return data.product;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function deleteProduct(id) {
    try {
      await apiFetch(`/api/productos/${id}`, { method: 'DELETE' });
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /** ======= API Polizas/Pedidos ======= */
  async function loadPedidos() {
    setPedidosLoading(true);
    setPedidosError('');
    try {
      const data = await apiFetch(`/api/pedidos`);
      const arr = Array.isArray(data?.pedidos) ? data.pedidos : [];
      setPedidos(arr);
    } catch (err) {
      console.error(err);
      setPedidosError('No se pudieron cargar los pedidos');
      setPedidos([]);
    } finally {
      setPedidosLoading(false);
    }
  }

  // Función para filtrar pedidos
  const filteredPedidos = pedidos.filter(p => {
    if (!pedidoSearchTerm) return true;
    const searchLower = pedidoSearchTerm.toLowerCase();
    const username = (p.username || `user ${p.idUsuario}`).toLowerCase();
    const pedidoId = String(p.idPedido || p.id);
    return username.includes(searchLower) || pedidoId.includes(searchLower);
  });

  // Función para obtener el texto del pedido seleccionado
  const getSelectedPedidoText = () => {
    if (!selectedPedidoId) return '';
    const pedido = pedidos.find(p => (p.idPedido || p.id) == selectedPedidoId);
    if (!pedido) return '';
    return `#${pedido.idPedido || pedido.id} - ${pedido.username || `user ${pedido.idUsuario}`} - ${formatARS(pedido.total)} ${pedido.poliza ? '(YA TIENE PÓLIZA)' : '(SIN PÓLIZA)'}`;
  };

// Reemplazar COMPLETO el handleAssignPoliza por este:
// Estado/flag global del componente (arriba):
// const [isUploadingPoliza, setIsUploadingPoliza] = useState(false);

async function handleAssignPoliza(e) {
  e.preventDefault();

  if (!selectedPedidoId) return;
  if (isUploadingPoliza) return;                 // evita doble envío
  if (!assignFile) {
    alert('Seleccioná un archivo de póliza');
    return;
  }

  setIsUploadingPoliza(true);
  try {
    const id = Number(selectedPedidoId);
    console.log('Upload póliza →', id);

    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    console.log('token found?', Boolean(auth?.token));

    const fd = new FormData();

    // ⚠️ NOMBRE DEL CAMPO: debe coincidir con upload.single('file') en el backend
    fd.append('file', assignFile);
    // Opcional: metadata adicional si la necesitás en el backend
    // fd.append('meta', JSON.stringify({}));

    // DEBUG: inspeccionar lo que realmente se manda
    for (const entry of fd.entries()) {
      console.log('FormData entry:', entry[0], entry[1]);
    }

    // Elegir endpoint según si el pedido ya tiene póliza o no
    const pedido = pedidos.find(p => (p.idPedido || p.id) == id);
    const hasPoliza = Boolean(pedido?.poliza?.id);
    const url = hasPoliza
      ? `${API_BASE}/polizas/${pedido.poliza.id}` // Reemplazar archivo de una póliza existente (PUT)
      : `${API_BASE}/polizas/${id}`;              // Crear póliza para el pedido (POST)
    const headers = {};
    if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;

    // NOTA: no poner 'Content-Type' manual cuando envías FormData
    const res = await fetch(url, {
      method: hasPoliza ? 'PUT' : 'POST',
      body: fd,
      // credentials: 'include', // comentalo si no usás cookies de sesión
      headers,
    });

    // parsear body (puede venir JSON o texto)
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }

    if (!res.ok) {
      console.error('Polizas PUT error', res.status, res.statusText, data);
      throw new Error(`PUT ${res.status} ${res.statusText} ${JSON.stringify(data)}`);
    }

    console.log('Polizas PUT ok', data);

    // limpieza UI
    setAssignFile(null);
    setSelectedPedidoId('');
    await loadPedidos();
    alert('✅ Póliza reemplazada correctamente');

  } catch (err) {
    console.error(err);
    alert(`❌ ${err?.message || 'Error al subir la póliza'}`);
  } finally {
    setIsUploadingPoliza(false);
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
  setUsersError('');
  try {
    const path = userQuery.trim()
      ? `/api/usuarios/${encodeURIComponent(userQuery.trim())}`
      : `/api/usuarios`;

    const data = await apiFetch(path);    
    const arr = Array.isArray(data?.usuarios)
      ? data.usuarios
      : data?.usuario
        ? [data.usuario]
        : [];
    setUsers(arr);
  } catch (err) {
    console.error(err);
    setUsersError('No se pudieron cargar los usuarios');
    setUsers([]);
  } finally {
    setUsersLoading(false);
  }
}

async function updateUserRole(userId, newRole) {
  try {
    const data = await apiFetch(`/api/usuarios/${userId}`, {
      method: 'PUT',
      body: { rol: newRole },
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

  /** ======= Handlers Productos ======= */
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    
    // Validar el campo en tiempo real después de un pequeño delay
    setTimeout(() => {
      validateField(name, value);
    }, 500);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = String(reader.result);
      setPreviewUrl(dataUrl);
      setImageFile(file);
      
      // Validar la imagen después de cargarla
      setTimeout(() => {
        validateField('image', file);
      }, 100);
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
    setValidationErrors({});
    setImageFile(null);
  };

  // Función para validar un campo específico
  // ...existing code...
  // Función para validar un campo específico
  const validateField = async (fieldName, value) => {
    try {

      // Construir el objeto de valores de forma que si se valida "image"
     // use el `value` pasado (el File) en vez de depender del state que puede ser aún antiguo.
      const vals = { editingId };
      if (fieldName === 'image') {
        vals.image = value;
      } else {
        vals[fieldName] = value;
        vals.image = imageFile;
      }
      await productValidationSchema.validateAt(fieldName, vals, { context: { editingId } });
      
      // Si la validación es exitosa, eliminar el error del campo
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } catch (error) {
      // Si hay error, agregarlo al estado
      setValidationErrors(prev => ({
        ...prev,
        [fieldName]: error.message
      }));
    }
  };
// ...existing code...

  // Función para validar todo el formulario
  const validateForm = async () => {
    setIsValidating(true);
    try {
      await productValidationSchema.validate({
        titulo: product.titulo,
        descripcion: product.descripcion,
        cobertura: product.cobertura,
        tipo: product.tipo,
        precio: product.precio,
        image: imageFile
      }, { context: { editingId } });
      
      setValidationErrors({});
      return true;
    } catch (error) {
      const errors = {};
      error.inner?.forEach(err => {
        errors[err.path] = err.message;
      });
      setValidationErrors(errors);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    // Validar el formulario completo antes de enviar
    const isValid = await validateForm();
    if (!isValid) {
      setMessage('Por favor, corrige los errores en el formulario');
      return;
    }
    
    setProductsLoading(true);
    
    try {
      const numericPrice = parseInt(
        String(product.precio).replace(/\D/g, '') || '0',
        10
      );

      if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
        setMessage('El precio debe ser un número válido mayor a 0');
        return;
      }

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
        // Al editar, si hay imagen nueva, usar multipart
        if (imageFile) {
          const form = new FormData();
          Object.entries(productData).forEach(([k, v]) => form.append(k, String(v)));
          form.append('image', imageFile);
          const auth = JSON.parse(localStorage.getItem('auth') || '{}');
          const res = await fetch(`${API_BASE}/productos/${editingId}`, {
            method: 'PUT',
            headers: auth?.token ? { Authorization: `Bearer ${auth.token}` } : undefined,
            body: form,
            credentials: 'include',
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data?.message || 'Error actualizando producto');
          updatedProduct = data.product;
        } else {
          updatedProduct = await updateProduct(editingId, productData);
        }
        setMessage('Producto actualizado exitosamente');
      } else {
        // multipart si hay imagen
        if (imageFile) {
          const form = new FormData();
          Object.entries(productData).forEach(([k, v]) => form.append(k, String(v)));
          form.append('image', imageFile);
          const auth = JSON.parse(localStorage.getItem('auth') || '{}');
          const res = await fetch(`${API_BASE}/productos`, {
            method: 'POST',
            headers: auth?.token ? { Authorization: `Bearer ${auth.token}` } : undefined,
            body: form,
            credentials: 'include',
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data?.message || 'Error creando producto');
          updatedProduct = data.product;
        } else {
          updatedProduct = await createProduct(productData);
        }
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
    setPreviewUrl(p.image || null);
    setImageFile(null);
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
      const msg = String(err?.message || 'Error al eliminar');
      if (msg.includes('No se puede eliminar')) {
        alert('No se puede eliminar este producto porque está referenciado por pedidos. Podés desactivarlo o editarlo.');
      } else {
        setMessage('Error al eliminar el producto: ' + msg);
      }
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

          <button
            className={`tab-button ${activeTab === 'polizas' ? 'active' : ''}`}
            onClick={() => setActiveTab('polizas')}
          >
            <DescriptionIcon className="tab-icon" />
            Asignar Pólizas
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
                  className={validationErrors.titulo ? 'error' : ''}
                  style={{
                    borderColor: validationErrors.titulo ? '#f44336' : '#ddd',
                    borderWidth: validationErrors.titulo ? '2px' : '1px'
                  }}
                />
                {validationErrors.titulo && (
                  <div className="error-message" style={{
                    color: '#f44336',
                    fontSize: '12px',
                    marginTop: '4px',
                    fontWeight: '500'
                  }}>
                    ⚠️ {validationErrors.titulo}
                  </div>
                )}
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
                    className={validationErrors.precio ? 'error' : ''}
                    style={{
                      borderColor: validationErrors.precio ? '#f44336' : '#ddd',
                      borderWidth: validationErrors.precio ? '2px' : '1px'
                    }}
                  />
                  {validationErrors.precio && (
                    <div className="error-message" style={{
                      color: '#f44336',
                      fontSize: '12px',
                      marginTop: '4px',
                      fontWeight: '500'
                    }}>
                      ⚠️ {validationErrors.precio}
                    </div>
                  )}
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
                    className={validationErrors.tipo ? 'error' : ''}
                    style={{
                      borderColor: validationErrors.tipo ? '#f44336' : '#ddd',
                      borderWidth: validationErrors.tipo ? '2px' : '1px'
                    }}
                  >
                    <option value="">Seleccionar</option>
                    <option value="auto">Auto</option>
                    <option value="hogar">Hogar</option>
                    <option value="vida">Vida</option>
                    <option value="salud">Salud</option>
                  </select>
                  {validationErrors.tipo && (
                    <div className="error-message" style={{
                      color: '#f44336',
                      fontSize: '12px',
                      marginTop: '4px',
                      fontWeight: '500'
                    }}>
                      ⚠️ {validationErrors.tipo}
                    </div>
                  )}
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
                  className={validationErrors.descripcion ? 'error' : ''}
                  style={{
                    borderColor: validationErrors.descripcion ? '#f44336' : '#ddd',
                    borderWidth: validationErrors.descripcion ? '2px' : '1px'
                  }}
                />
                {validationErrors.descripcion && (
                  <div className="error-message" style={{
                    color: '#f44336',
                    fontSize: '12px',
                    marginTop: '4px',
                    fontWeight: '500'
                  }}>
                    ⚠️ {validationErrors.descripcion}
                  </div>
                )}
                <div style={{
                  fontSize: '11px',
                  color: '#666',
                  marginTop: '4px',
                  textAlign: 'right'
                }}>
                  {product.descripcion.length}/500 caracteres
                </div>
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
                  className={validationErrors.cobertura ? 'error' : ''}
                  style={{
                    borderColor: validationErrors.cobertura ? '#f44336' : '#ddd',
                    borderWidth: validationErrors.cobertura ? '2px' : '1px'
                  }}
                />
                {validationErrors.cobertura && (
                  <div className="error-message" style={{
                    color: '#f44336',
                    fontSize: '12px',
                    marginTop: '4px',
                    fontWeight: '500'
                  }}>
                    ⚠️ {validationErrors.cobertura}
                  </div>
                )}
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
                    style={{
                      borderColor: validationErrors.image ? '#f44336' : '#ddd',
                      borderWidth: validationErrors.image ? '2px' : '1px'
                    }}
                  />
                  <div className="file-input-overlay">
                    <Image className="file-icon" />
                    <span>Seleccionar imagen</span>
                  </div>
                </div>
                {previewUrl && (
                  <div className="image-preview">
                    <img src={previewUrl || null} alt="Preview" />
                    <Chip label="Vista previa" color="info" size="small" />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={productsLoading || isValidating}
                  style={{
                    backgroundColor: Object.keys(validationErrors).length > 0 ? '#ccc' : '#1976d2',
                    cursor: Object.keys(validationErrors).length > 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Save className="button-icon" />
                  {productsLoading 
                    ? 'Procesando...' 
                    : isValidating 
                      ? 'Validando...'
                      : Object.keys(validationErrors).length > 0
                        ? 'Corrige los errores'
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
                          variant="filled"
                          clickable
                          onClick={async () => {
                            try {
                              await updateProduct(p.id, { isActive: !p.isActive });
                              await loadProducts();
                            } catch (e) {
                              alert('No se pudo cambiar el estado');
                            }
                          }}
                          sx={{ fontWeight: 600 }}
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
                      <td>
                        <select
                          value={u.rol || 'USUARIO'}
                          onChange={async (e) => {
                            const newRole = e.target.value;
                            if (newRole !== u.rol) {
                              try {
                                await updateUserRole(u.idUsuario || u.id, newRole);
                                await loadUsers();
                                
                                // Mostrar mensaje de éxito
                                const successMessage = document.createElement('div');
                                successMessage.textContent = `✅ Rol de ${u.username} actualizado a ${newRole}`;
                                successMessage.style.cssText = `
                                  position: fixed; top: 20px; right: 20px; z-index: 9999;
                                  background: #4caf50; color: white; padding: 12px 20px;
                                  border-radius: 4px; font-weight: 500;
                                `;
                                document.body.appendChild(successMessage);
                                
                                setTimeout(() => {
                                  if (document.body.contains(successMessage)) {
                                    document.body.removeChild(successMessage);
                                  }
                                }, 3000);
                              } catch (e) {
                                alert('No se pudo cambiar el rol: ' + (e?.message || 'Error desconocido'));
                                // Recargar para restaurar el estado original
                                await loadUsers();
                              }
                            }
                          }}
                          style={{
                            padding: '4px 8px',
                            fontSize: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            backgroundColor: u.rol === 'ADMINISTRADOR' ? '#1976d2' : '#f5f5f5',
                            color: u.rol === 'ADMINISTRADOR' ? 'white' : '#333',
                            fontWeight: '600',
                            cursor: 'pointer',
                            minWidth: '100px'
                          }}
                        >
                          <option value="USUARIO" style={{ backgroundColor: '#f5f5f5', color: '#333' }}>USUARIO</option>
                          <option value="ADMINISTRADOR" style={{ backgroundColor: '#1976d2', color: 'white' }}>ADMINISTRADOR</option>
                        </select>
                      </td>
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

        {/* ======= Asignar Pólizas ======= */}
        {activeTab === 'polizas' && (
          <div className="admin-container form-container">
            <div className="form-header">
              <h2>
                <DescriptionIcon className="form-header-icon" />
                Asignar póliza a pedido
              </h2>
            </div>

            <form onSubmit={handleAssignPoliza} className="admin-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="pedido">
                    <span className="label-icon">🧾</span>
                    Seleccionar Pedido
                  </label>
                  
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={isSelectOpen ? pedidoSearchTerm : getSelectedPedidoText()}
                      onChange={(e) => {
                        setPedidoSearchTerm(e.target.value);
                        setIsSelectOpen(true);
                      }}
                      onFocus={() => {
                        setIsSelectOpen(true);
                        loadPedidos();
                      }}
                      onBlur={() => {
                        // Delay para permitir hacer clic en las opciones
                        setTimeout(() => setIsSelectOpen(false), 200);
                      }}
                      placeholder="Escribe para buscar pedidos..."
                      style={{ 
                        width: '100%',
                        padding: '12px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        cursor: 'text'
                      }}
                      required
                    />
                    
                    {isSelectOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        borderTop: 'none',
                        borderRadius: '0 0 4px 4px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 1000,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        {filteredPedidos.length === 0 ? (
                          <div style={{ padding: '12px', color: '#666', textAlign: 'center' }}>
                            {pedidosLoading ? 'Cargando pedidos...' : 'No se encontraron pedidos'}
                          </div>
                        ) : (
                          filteredPedidos.map((p) => (
                            <div
                              key={p.idPedido || p.id}
                              onClick={() => {
                                setSelectedPedidoId(p.idPedido || p.id);
                                setPedidoSearchTerm('');
                                setIsSelectOpen(false);
                              }}
                              style={{
                                padding: '12px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #f0f0f0',
                                backgroundColor: selectedPedidoId == (p.idPedido || p.id) ? '#f5f5f5' : 'white'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = selectedPedidoId == (p.idPedido || p.id) ? '#f5f5f5' : 'white'}
                            >
                              #{p.idPedido || p.id} - {p.username || `user ${p.idUsuario}`} - {formatARS(p.total)} 
                              {p.poliza ? ' (YA TIENE PÓLIZA)' : ' (SIN PÓLIZA)'}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  
                  {pedidosLoading && <div className="message">Cargando pedidos…</div>}
                  {pedidosError && <div className="message error">{pedidosError}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="polizaFile">
                    <span className="label-icon">📎</span>
                    Archivo de póliza (PDF)
                  </label>
                  <input
                    type="file"
                    id="polizaFile"
                    name="polizaFile"
                    accept="application/pdf,image/*"
                    onChange={(e) => setAssignFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>
              </div>


              <div className="form-actions">
                <button type="submit" className="submit-button" disabled={!selectedPedidoId || !assignFile}>
                  {selectedPedidoId && pedidos.find(p => (p.idPedido || p.id) == selectedPedidoId)?.poliza 
                    ? 'Reemplazar Póliza' 
                    : 'Asignar Póliza'
                  }
                </button>
              </div>
            </form>

            <div className="table-responsive" style={{ marginTop: 16 }}>
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID Pedido</th>
                    <th>Usuario</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Póliza</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((p) => (
                    <tr key={p.idPedido || p.id}>
                      <td>#{p.idPedido || p.id}</td>
                      <td>{p.username || p.idUsuario}</td>
                      <td>{formatARS(p.total)}</td>
                      <td>
                        <Chip label={p.estado} color={p.estado?.includes('PAGO') ? 'success' : 'default'} size="small" />
                      </td>
                      <td>
                        {p.poliza ? (
                          <Chip label={`Póliza #${p.poliza.id}`} color="primary" size="small" />
                        ) : (
                          <Chip label="Sin póliza" color="warning" size="small" />
                        )}
                      </td>
                    </tr>
                  ))}
                  {!pedidosLoading && pedidos.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', opacity: 0.7 }}>
                        No hay pedidos
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