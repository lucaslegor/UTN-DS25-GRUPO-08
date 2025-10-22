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
import { apiFetch, uploadPolizaFileApi, getAuth } from '../services/api';
import * as yup from 'yup';

/** ========= Config API ========= */
const RAW_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
const API_BASE = RAW_BASE.endsWith('/api') ? RAW_BASE : `${RAW_BASE}/api`;

/** Normaliza estructura de productos leídos de localStorage */
const normalizeProducts = (list) =>
  (list || []).map((p) => {
    return {
      id: p.id ?? Date.now() + Math.random(),
      name: p.name ?? p.title ?? '',
      title: p.title ?? p.name ?? '',
      description: p.description ?? '',
      image: p.image ?? '',
      rubro: p.rubro ?? '',
      tipo: p.tipo ?? '',
      cobertura: p.cobertura ?? '',
    };
  });


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
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudesLoading, setSolicitudesLoading] = useState(false);
  const [solicitudesError, setSolicitudesError] = useState('');
  const [assignFile, setAssignFile] = useState(null);
  const [selectedSolicitudId, setSelectedSolicitudId] = useState('');
  const [solicitudSearchTerm, setSolicitudSearchTerm] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  /** ======= Gestión de Solicitudes ======= */
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [rejectionNote, setRejectionNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [replacingPolizaId, setReplacingPolizaId] = useState(null);
  const [replaceFile, setReplaceFile] = useState(null);

  const navigate = useNavigate();

  // Protege la ruta
  useEffect(() => {
    const raw = localStorage.getItem('auth');
    try {
      const auth = raw ? JSON.parse(raw) : null;
      if (!auth?.token) {
        navigate('/login');
        return;
      }
      // Verificar que sea administrador
      if (auth?.user?.rol !== 'ADMINISTRADOR') {
        navigate('/');
        return;
      }
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

  // Cargar solicitudes para asignar pólizas
  useEffect(() => {
    if (activeTab === 'polizas') {
      loadSolicitudes();
    }
  }, [activeTab]);

  /** ======= Helpers API ======= */
  const authHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    const raw = localStorage.getItem('auth');
    try {
      const auth = raw ? JSON.parse(raw) : null;
      if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
    } catch {
      // Si hay error parseando, no agregar token
    }
    return headers;
  };

  /** ======= API Productos ======= */

async function loadProducts() {
  setProductsLoading(true);
  setProductsError('');
  try {
    const data = await apiFetch('/productos');   // <-- usa apiFetch
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
      const data = await apiFetch('/productos', {
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
      const data = await apiFetch(`/productos/${id}`, {
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
      await apiFetch(`/productos/${id}`, { method: 'DELETE' });
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /** ======= API Polizas/Solicitudes ======= */
  async function loadSolicitudes() {
    setSolicitudesLoading(true);
    setSolicitudesError('');
    try {
      console.log('Cargando solicitudes para administrador...');
      const data = await apiFetch(`/solicitudes`);
      console.log('Respuesta de la API:', data);
      const arr = Array.isArray(data?.data) ? data.data : [];
      console.log('Solicitudes cargadas:', arr);
      console.log('Cantidad de solicitudes:', arr.length);
      
      // Log detallado de cada solicitud
      arr.forEach((solicitud, index) => {
        console.log(`Solicitud ${index + 1}:`, {
          id: solicitud.id,
          idUsuario: solicitud.idUsuario,
          estado: solicitud.estado,
          usuario: solicitud.usuario,
          items: solicitud.items,
          createdAt: solicitud.createdAt
        });
      });
      
      setSolicitudes(arr);
    } catch (err) {
      console.error('Error cargando solicitudes:', err);
      setSolicitudesError('No se pudieron cargar las solicitudes');
      setSolicitudes([]);
    } finally {
      setSolicitudesLoading(false);
    }
  }

  // Función para filtrar solicitudes
  const filteredSolicitudes = solicitudes.filter(s => {
    if (!solicitudSearchTerm) return true;
    const searchLower = solicitudSearchTerm.toLowerCase();
    const username = (s.usuario?.username || `user ${s.idUsuario}`).toLowerCase();
    const solicitudId = String(s.id);
    return username.includes(searchLower) || solicitudId.includes(searchLower);
  });

  // Función para obtener el texto de la solicitud seleccionada
  const getSelectedSolicitudText = () => {
    if (!selectedSolicitudId) return '';
    const solicitud = solicitudes.find(s => s.id == selectedSolicitudId);
    if (!solicitud) return '';
    return `#${solicitud.id} - ${solicitud.usuario?.username || `user ${solicitud.idUsuario}`} - ${solicitud.estado} ${solicitud.poliza ? '(YA TIENE PÓLIZA)' : '(SIN PÓLIZA)'}`;
  };

  // Función para ver detalles de la solicitud
  const handleViewDetails = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setDetailsModalOpen(true);
  };

  // Función para ver el contenido de la póliza
  const handleViewPoliza = (polizaUrl) => {
    if (polizaUrl) {
      window.open(polizaUrl, '_blank');
    }
  };

  // Función para reemplazar póliza
  const handleReplacePoliza = async (e) => {
    e.preventDefault();
    if (!replacingPolizaId || !replaceFile) return;

    try {
      // Buscar la solicitud para obtener el ID de la póliza
      const solicitud = solicitudes.find(s => s.id == replacingPolizaId);
      if (!solicitud?.poliza?.id) {
        throw new Error('No se encontró la póliza a reemplazar');
      }

      console.log('Reemplazando póliza ID:', solicitud.poliza.id);
      console.log('Archivo seleccionado:', replaceFile.name);

      // Usar fetch directo para FormData con manejo manual de tokens
      const formData = new FormData();
      formData.append('file', replaceFile);
      
      // Obtener token fresco
      const currentAuth = getAuth();
      if (!currentAuth?.token) {
        throw new Error('No hay token de autenticación');
      }
      
      console.log('Token presente:', !!currentAuth?.token);
      console.log('Usuario rol:', currentAuth?.user?.rol);
      
      const res = await fetch(`${API_BASE}/polizas/${solicitud.poliza.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${currentAuth.token}`,
        },
        body: formData,
        credentials: 'include',
      });

      console.log('Respuesta del servidor:', res.status, res.statusText);

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error del servidor:', errorData);
        throw new Error(errorData?.message || 'Error al reemplazar la póliza');
      }

      const result = await res.json();
      console.log('Póliza reemplazada exitosamente:', result);

      // Actualizar el estado de la solicitud a POLIZA_CARGADA después de reemplazar póliza
      await apiFetch(`/solicitudes/${replacingPolizaId}`, {
        method: 'PUT',
        body: { 
          estado: 'POLIZA_CARGADA'
        }
      });
      
      // Recargar solicitudes
      await loadSolicitudes();
      
      // Actualizar selectedSolicitud si está abierto el modal
      if (selectedSolicitud && selectedSolicitud.id == replacingPolizaId) {
        setSelectedSolicitud(prev => ({
          ...prev,
          estado: 'POLIZA_CARGADA'
        }));
      }
      
      // Limpiar estado
      setReplacingPolizaId(null);
      setReplaceFile(null);
      
      // Mostrar mensaje de éxito
      const successMessage = document.createElement('div');
      successMessage.textContent = '✅ Póliza reemplazada exitosamente';
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

    } catch (err) {
      console.error('Error completo:', err);
      alert('Error al reemplazar la póliza: ' + (err?.message || 'Error desconocido'));
    }
  };

  // Función para aprobar solicitud
  const handleApproveSolicitud = async (solicitudId) => {
    setIsUpdating(true);
    try {
      // Nota automática de aprobación
      const notaAprobacion = `¡Excelente noticia! Tu solicitud de seguro ha sido APROBADA. 

IMPORTANTE: Aunque tu solicitud fue aprobada, tu póliza aún no está activa. Para completar el proceso:

1. Contacta con nuestro equipo comercial para conocer las opciones de pago disponibles
2. Una vez efectuado el pago, tu póliza será procesada
3. Entre 24 y 48 horas hábiles recibirás tu póliza activa por este mismo medio

Si tienes alguna consulta, no dudes en contactarnos.

¡Gracias por confiar en nosotros!`;

      await apiFetch(`/solicitudes/${solicitudId}`, {
        method: 'PUT',
        body: { 
          estado: 'APROBADA',
          notaRechazo: notaAprobacion
        }
      });
      
      // Recargar solicitudes
      await loadSolicitudes();
      
      // Actualizar selectedSolicitud si está abierto el modal
      if (selectedSolicitud && selectedSolicitud.id === solicitudId) {
        setSelectedSolicitud(prev => ({
          ...prev,
          estado: 'APROBADA',
          notaRechazo: notaAprobacion
        }));
      }
      
      // Mostrar mensaje de éxito
      const successMessage = document.createElement('div');
      successMessage.textContent = '✅ Solicitud aprobada exitosamente con nota informativa';
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
      
    } catch (err) {
      console.error(err);
      alert('Error al aprobar la solicitud: ' + (err?.message || 'Error desconocido'));
    } finally {
      setIsUpdating(false);
    }
  };

  // Función para rechazar solicitud
  const handleRejectSolicitud = async (solicitudId) => {
    if (!rejectionNote.trim()) {
      alert('Por favor, ingresa una nota de rechazo');
      return;
    }
    
    setIsUpdating(true);
    try {
      await apiFetch(`/solicitudes/${solicitudId}`, {
        method: 'PUT',
        body: { 
          estado: 'RECHAZADA',
          notaRechazo: rejectionNote.trim()
        }
      });
      
      // Recargar solicitudes
      await loadSolicitudes();
      
      // Actualizar selectedSolicitud si está abierto el modal
      if (selectedSolicitud && selectedSolicitud.id === solicitudId) {
        setSelectedSolicitud(prev => ({
          ...prev,
          estado: 'RECHAZADA',
          notaRechazo: rejectionNote.trim()
        }));
      }
      
      // Cerrar modal y limpiar nota
      setDetailsModalOpen(false);
      setRejectionNote('');
      
      // Mostrar mensaje de éxito
      const successMessage = document.createElement('div');
      successMessage.textContent = '✅ Solicitud rechazada exitosamente';
      successMessage.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        background: #f44336; color: white; padding: 12px 20px;
        border-radius: 4px; font-weight: 500;
      `;
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        if (document.body.contains(successMessage)) {
          document.body.removeChild(successMessage);
        }
      }, 3000);
      
    } catch (err) {
      console.error(err);
      alert('Error al rechazar la solicitud: ' + (err?.message || 'Error desconocido'));
    } finally {
      setIsUpdating(false);
    }
  };

  async function handleAssignPoliza(e) {
    e.preventDefault();
    if (!selectedSolicitudId) return;
    try {
      if (!assignFile) throw new Error('Seleccione un archivo');
      
      // Verificar si la solicitud ya tiene póliza para mostrar mensaje apropiado
      const solicitudSeleccionada = solicitudes.find(s => s.id == selectedSolicitudId);
      
      // Validar que la solicitud esté aprobada (solo para nuevas asignaciones, no para reemplazos)
      if (solicitudSeleccionada?.estado !== 'APROBADA' && !solicitudSeleccionada?.poliza) {
        throw new Error('Solo se pueden asignar pólizas a solicitudes aprobadas');
      }
      
      const esReemplazo = solicitudSeleccionada && solicitudSeleccionada.poliza;
      
      // Mostrar mensaje de carga
      const loadingMessage = document.createElement('div');
      loadingMessage.textContent = esReemplazo ? 'Reemplazando póliza...' : 'Asignando póliza...';
      loadingMessage.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        background: #1976d2; color: white; padding: 12px 20px;
        border-radius: 4px; font-weight: 500;
      `;
      document.body.appendChild(loadingMessage);
      
      await uploadPolizaFileApi(Number(selectedSolicitudId), assignFile);
      
      // Actualizar el estado de la solicitud a POLIZA_CARGADA después de asignar póliza
      await apiFetch(`/solicitudes/${selectedSolicitudId}`, {
        method: 'PUT',
        body: { 
          estado: 'POLIZA_CARGADA'
        }
      });
      
      // Remover mensaje de carga
      document.body.removeChild(loadingMessage);
      
      setAssignFile(null);
      setSelectedSolicitudId('');
      await loadSolicitudes();
      
      // Actualizar selectedSolicitud si está abierto el modal
      if (selectedSolicitud && selectedSolicitud.id == selectedSolicitudId) {
        setSelectedSolicitud(prev => ({
          ...prev,
          estado: 'POLIZA_CARGADA'
        }));
      }
      
      // Mostrar mensaje de éxito apropiado
      const successMessage = document.createElement('div');
      successMessage.textContent = esReemplazo ? '✅ Póliza reemplazada exitosamente' : '✅ Póliza asignada exitosamente';
      successMessage.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        background: #4caf50; color: white; padding: 12px 20px;
        border-radius: 4px; font-weight: 500;
      `;
      document.body.appendChild(successMessage);
      
      // Remover mensaje después de 3 segundos
      setTimeout(() => {
        if (document.body.contains(successMessage)) {
          document.body.removeChild(successMessage);
        }
      }, 3000);
      
    } catch (err) {
      // Remover mensaje de carga si existe
      const loadingMessage = document.querySelector('div[style*="background: #1976d2"]');
      if (loadingMessage) document.body.removeChild(loadingMessage);
      
      // Mostrar mensaje de error
      const errorMessage = document.createElement('div');
      errorMessage.textContent = '❌ Error al asignar póliza: ' + (err?.message || 'Error desconocido');
      errorMessage.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        background: #f44336; color: white; padding: 12px 20px;
        border-radius: 4px; font-weight: 500;
      `;
      document.body.appendChild(errorMessage);
      
      // Remover mensaje después de 5 segundos
      setTimeout(() => {
        if (document.body.contains(errorMessage)) {
          document.body.removeChild(errorMessage);
        }
      }, 5000);
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
      ? `/usuarios/${encodeURIComponent(userQuery.trim())}`
      : `/usuarios`;

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
    const data = await apiFetch(`/usuarios/${userId}`, {
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
      isActive: true,
    });
    setPreviewUrl(null);
    setEditingId(null);
    setValidationErrors({});
    setImageFile(null);
  };

  // Función para validar un campo específico
  const validateField = async (fieldName, value) => {
    try {
      await productValidationSchema.validateAt(fieldName, {
        [fieldName]: value,
        image: imageFile,
        editingId: editingId
      }, { context: { editingId } });
      
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

  // Función para validar todo el formulario
  const validateForm = async () => {
    setIsValidating(true);
    try {
      await productValidationSchema.validate({
        titulo: product.titulo,
        descripcion: product.descripcion,
        cobertura: product.cobertura,
        tipo: product.tipo,
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
      const productData = {
        titulo: product.titulo.trim(),
        descripcion: product.descripcion.trim(),
        cobertura: product.cobertura.trim(),
        tipo: product.tipo,
        isActive: product.isActive,
      };

      let updatedProduct;
      if (editingId) {
        updatedProduct = await updateProduct(editingId, productData);
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
                {validationErrors.image && (
                  <div className="error-message" style={{
                    color: '#f44336',
                    fontSize: '12px',
                    marginTop: '4px',
                    fontWeight: '500'
                  }}>
                    ⚠️ {validationErrors.image}
                  </div>
                )}

                {previewUrl && previewUrl.trim() !== "" && (
                  <div className="image-preview">
                    <img src={previewUrl} alt="Preview" />
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
                Asignar póliza a solicitud
              </h2>
            </div>

            <form onSubmit={handleAssignPoliza} className="admin-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="solicitud">
                    <span className="label-icon">📋</span>
                    Seleccionar Solicitud
                  </label>
                  
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={isSelectOpen ? solicitudSearchTerm : getSelectedSolicitudText()}
                      onChange={(e) => {
                        setSolicitudSearchTerm(e.target.value);
                        setIsSelectOpen(true);
                      }}
                      onFocus={() => {
                        setIsSelectOpen(true);
                        loadSolicitudes();
                      }}
                      onBlur={() => {
                        // Delay para permitir hacer clic en las opciones
                        setTimeout(() => setIsSelectOpen(false), 200);
                      }}
                      placeholder="Escribe para buscar solicitudes..."
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
                        {filteredSolicitudes.length === 0 ? (
                          <div style={{ padding: '12px', color: '#666', textAlign: 'center' }}>
                            {solicitudesLoading ? 'Cargando solicitudes...' : 'No se encontraron solicitudes'}
                          </div>
                        ) : (
                          filteredSolicitudes.map((s) => (
                            <div
                              key={s.id}
                              onClick={() => {
                                setSelectedSolicitudId(s.id);
                                setSolicitudSearchTerm('');
                                setIsSelectOpen(false);
                              }}
                              style={{
                                padding: '12px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #f0f0f0',
                                backgroundColor: selectedSolicitudId == s.id ? '#f5f5f5' : 'white'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = selectedSolicitudId == s.id ? '#f5f5f5' : 'white'}
                            >
                              #{s.id} - {s.usuario?.username || `user ${s.idUsuario}`} - {s.estado} 
                              {s.poliza ? ' (YA TIENE PÓLIZA)' : ' (SIN PÓLIZA)'}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  
                  {solicitudesLoading && <div className="message">Cargando solicitudes…</div>}
                  {solicitudesError && <div className="message error">{solicitudesError}</div>}
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
                <button 
                  type="submit" 
                  className="submit-button" 
                  disabled={!selectedSolicitudId || !assignFile || (selectedSolicitudId && solicitudes.find(s => s.id == selectedSolicitudId)?.estado !== 'APROBADA' && !solicitudes.find(s => s.id == selectedSolicitudId)?.poliza)}
                >
                  {selectedSolicitudId && solicitudes.find(s => s.id == selectedSolicitudId)?.poliza 
                    ? 'Reemplazar Póliza' 
                    : 'Asignar Póliza'
                  }
                </button>
                {selectedSolicitudId && solicitudes.find(s => s.id == selectedSolicitudId)?.estado !== 'APROBADA' && !solicitudes.find(s => s.id == selectedSolicitudId)?.poliza && (
                  <div style={{ marginTop: '8px', color: '#d32f2f', fontSize: '14px' }}>
                    ⚠️ Solo se pueden asignar pólizas a solicitudes aprobadas
                  </div>
                )}
              </div>
            </form>

            <div className="table-responsive" style={{ marginTop: 16 }}>
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID Solicitud</th>
                    <th>Usuario</th>
                    <th>Estado</th>
                    <th>Productos</th>
                    <th>Póliza</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((s) => (
                    <tr key={s.id}>
                      <td>#{s.id}</td>
                      <td>
                        <div>
                          <strong>{s.usuario?.username || `user ${s.idUsuario}`}</strong>
                          {s.usuario?.mail && (
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              {s.usuario.mail}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <Chip 
                          label={s.estado || 'CREADA'} 
                          color={s.estado === 'APROBADA' ? 'success' : s.estado === 'RECHAZADA' ? 'error' : 'default'}
                          size="small"
                        />
                      </td>
                      <td>{s.items?.length || 0} productos</td>
                      <td>
                        {s.poliza ? (
                          <Chip label={`Póliza #${s.poliza.id}`} color="primary" size="small" />
                        ) : s.estado === 'RECHAZADA' ? (
                          <Chip label="No asignable" color="error" size="small" />
                        ) : (
                          <Chip label="Sin póliza" color="warning" size="small" />
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Tooltip title="Ver detalles">
                            <IconButton
                              className="edit-button"
                              onClick={() => handleViewDetails(s)}
                              size="small"
                            >
                              <SearchIcon />
                            </IconButton>
                          </Tooltip>
                          
                          {s.poliza && (
                            <>
                              <Tooltip title="Ver póliza">
                                <IconButton
                                  className="edit-button"
                                  onClick={() => handleViewPoliza(s.poliza.archivoUrl)}
                                  size="small"
                                  style={{ color: '#1976d2' }}
                                >
                                  📄
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Reemplazar póliza">
                                <IconButton
                                  className="edit-button"
                                  onClick={() => setReplacingPolizaId(s.id)}
                                  size="small"
                                  style={{ color: '#ff9800' }}
                                >
                                  🔄
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          
                          {s.estado === 'CREADA' && (
                            <>
                              <Tooltip title="Aprobar solicitud">
                                <IconButton
                                  className="edit-button"
                                  onClick={() => handleApproveSolicitud(s.id)}
                                  size="small"
                                  disabled={isUpdating}
                                  style={{ color: '#4caf50' }}
                                >
                                  ✓
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Rechazar solicitud">
                                <IconButton
                                  className="delete-button"
                                  onClick={() => handleViewDetails(s)}
                                  size="small"
                                  disabled={isUpdating}
                                >
                                  ✗
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!solicitudesLoading && solicitudes.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', opacity: 0.7 }}>
                        No hay solicitudes
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal para reemplazar póliza */}
        {replacingPolizaId && (
          <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="modal-content" style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '500px',
              width: '90%'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>🔄 Reemplazar Póliza</h2>
                <button
                  onClick={() => {
                    setReplacingPolizaId(null);
                    setReplaceFile(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleReplacePoliza}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Seleccionar nuevo archivo de póliza:
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={(e) => setReplaceFile(e.target.files?.[0] || null)}
                    required
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setReplacingPolizaId(null);
                      setReplaceFile(null);
                    }}
                    style={{
                      backgroundColor: '#666',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!replaceFile}
                    style={{
                      backgroundColor: replaceFile ? '#ff9800' : '#ccc',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      cursor: replaceFile ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Reemplazar Póliza
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de detalles de solicitud */}
        {detailsModalOpen && selectedSolicitud && (
          <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="modal-content" style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Detalles de la Solicitud #{selectedSolicitud.id}</h2>
                <button
                  onClick={() => {
                    setDetailsModalOpen(false);
                    setSelectedSolicitud(null);
                    setRejectionNote('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3>Información del Usuario</h3>
                <p><strong>Usuario:</strong> {selectedSolicitud.usuario?.username || `user ${selectedSolicitud.idUsuario}`}</p>
                <p><strong>Email:</strong> {selectedSolicitud.usuario?.mail || 'No disponible'}</p>
                <div><strong>Estado:</strong> 
                  <Chip 
                    label={selectedSolicitud.estado || 'CREADA'} 
                    color={selectedSolicitud.estado === 'APROBADA' ? 'success' : selectedSolicitud.estado === 'RECHAZADA' ? 'error' : 'default'}
                    size="small"
                    style={{ marginLeft: '8px' }}
                  />
                </div>
              </div>

              {selectedSolicitud.datosPersonales && (
                <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                  <h3 style={{ margin: '0 0 16px 0', color: '#1976d2', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>👤</span>
                    Datos Personales del Asegurado
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                      <strong style={{ color: '#495057' }}>Nombre:</strong><br/>
                      <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.nombre}</span>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                      <strong style={{ color: '#495057' }}>Apellido:</strong><br/>
                      <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.apellido}</span>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                      <strong style={{ color: '#495057' }}>Email:</strong><br/>
                      <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.email}</span>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                      <strong style={{ color: '#495057' }}>Teléfono:</strong><br/>
                      <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.telefono}</span>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                      <strong style={{ color: '#495057' }}>DNI:</strong><br/>
                      <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.dni}</span>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                      <strong style={{ color: '#495057' }}>Fecha de Nacimiento:</strong><br/>
                      <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.fechaNacimiento}</span>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6', gridColumn: '1 / -1' }}>
                      <strong style={{ color: '#495057' }}>Dirección:</strong><br/>
                      <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.direccion}</span>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                      <strong style={{ color: '#495057' }}>Ciudad:</strong><br/>
                      <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.ciudad}</span>
                    </div>
                    {selectedSolicitud.datosPersonales.codigoPostal && (
                      <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <strong style={{ color: '#495057' }}>Código Postal:</strong><br/>
                        <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.codigoPostal}</span>
                      </div>
                    )}
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                      <strong style={{ color: '#495057' }}>Tipo de Documento:</strong><br/>
                      <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.tipoDocumento}</span>
                    </div>
                    {selectedSolicitud.datosPersonales.genero && (
                      <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <strong style={{ color: '#495057' }}>Género:</strong><br/>
                        <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.genero}</span>
                      </div>
                    )}
                    {selectedSolicitud.datosPersonales.estadoCivil && (
                      <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <strong style={{ color: '#495057' }}>Estado Civil:</strong><br/>
                        <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.estadoCivil}</span>
                      </div>
                    )}
                    {selectedSolicitud.datosPersonales.ocupacion && (
                      <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <strong style={{ color: '#495057' }}>Ocupación:</strong><br/>
                        <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.ocupacion}</span>
                      </div>
                    )}
                    {selectedSolicitud.datosPersonales.ingresosMensuales && (
                      <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <strong style={{ color: '#495057' }}>Ingresos Mensuales:</strong><br/>
                        <span style={{ color: '#212529' }}>{selectedSolicitud.datosPersonales.ingresosMensuales}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <h3>Productos Solicitados</h3>
                {selectedSolicitud.items?.map((item, index) => (
                  <div key={index} style={{ 
                    border: '1px solid #ddd', 
                    borderRadius: '4px', 
                    padding: '10px', 
                    marginBottom: '10px' 
                  }}>
                    <p><strong>{item.titulo}</strong></p>
                    <p>Cantidad: {item.cantidad}</p>
                  </div>
                ))}
              </div>

              {selectedSolicitud.notaRechazo && selectedSolicitud.estado !== 'POLIZA_CARGADA' && (
                <div style={{ 
                  marginBottom: '20px', 
                  padding: '16px', 
                  backgroundColor: selectedSolicitud.estado === 'APROBADA' ? '#e8f5e8' : '#ffebee', 
                  borderRadius: '8px',
                  border: selectedSolicitud.estado === 'APROBADA' ? '1px solid #4caf50' : '1px solid #f44336'
                }}>
                  <h3 style={{ 
                    color: selectedSolicitud.estado === 'APROBADA' ? '#2e7d32' : '#d32f2f',
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{ marginRight: '8px' }}>
                      {selectedSolicitud.estado === 'APROBADA' ? '✅' : '❌'}
                    </span>
                    {selectedSolicitud.estado === 'APROBADA' ? 'Nota de Aprobación' : 'Nota de Rechazo'}
                  </h3>
                  <div style={{ 
                    whiteSpace: 'pre-line',
                    lineHeight: '1.6',
                    color: selectedSolicitud.estado === 'APROBADA' ? '#1b5e20' : '#c62828'
                  }}>
                    {selectedSolicitud.notaRechazo}
                  </div>
                </div>
              )}

              {selectedSolicitud.poliza && (
                <div style={{ 
                  marginBottom: '20px', 
                  padding: '20px', 
                  backgroundColor: '#e3f2fd', 
                  borderRadius: '12px',
                  border: '2px solid #2196f3',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '48px', 
                    marginBottom: '16px',
                    color: '#1976d2'
                  }}>
                    🎉
                  </div>
                  <h3 style={{ 
                    color: '#1976d2',
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    ¡Póliza Cargada Exitosamente!
                  </h3>
                  <div style={{ 
                    color: '#1565c0',
                    lineHeight: '1.6',
                    fontSize: '16px',
                    maxWidth: '500px',
                    margin: '0 auto'
                  }}>
                    <p style={{ margin: '0 0 12px 0' }}>
                      <strong>¡Felicitaciones!</strong> Tu póliza ha sido procesada y cargada exitosamente en nuestro sistema.
                    </p>
                    <p style={{ margin: '0 0 12px 0' }}>
                      Esperamos que tu experiencia en nuestra página haya sido excelente y que hayas encontrado exactamente lo que necesitabas.
                    </p>
                    <p style={{ margin: '0' }}>
                      <strong>¡Gracias por confiar en nosotros!</strong> Estamos aquí para brindarte la mejor protección y tranquilidad.
                    </p>
                  </div>
                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: '#f3e5f5',
                    borderRadius: '8px',
                    border: '1px solid #9c27b0'
                  }}>
                    <div style={{ color: '#7b1fa2', fontSize: '14px', fontWeight: 'bold' }}>
                      📄 Póliza #{selectedSolicitud.poliza.id} - Lista para descargar
                    </div>
                  </div>
                </div>
              )}

              {selectedSolicitud.estado === 'CREADA' && (
                <div style={{ marginBottom: '20px' }}>
                  <h3>Acciones</h3>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <button
                      onClick={() => handleApproveSolicitud(selectedSolicitud.id)}
                      disabled={isUpdating}
                      style={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: isUpdating ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isUpdating ? 'Procesando...' : '✓ Aprobar Solicitud'}
                    </button>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                      <strong>Nota de Rechazo (opcional):</strong>
                    </label>
                    <textarea
                      value={rejectionNote}
                      onChange={(e) => setRejectionNote(e.target.value)}
                      placeholder="Ingresa el motivo del rechazo..."
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        resize: 'vertical'
                      }}
                    />
                    <button
                      onClick={() => handleRejectSolicitud(selectedSolicitud.id)}
                      disabled={isUpdating}
                      style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: isUpdating ? 'not-allowed' : 'pointer',
                        marginTop: '10px'
                      }}
                    >
                      {isUpdating ? 'Procesando...' : '✗ Rechazar Solicitud'}
                    </button>
                  </div>
                </div>
              )}

              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={() => {
                    setDetailsModalOpen(false);
                    setSelectedSolicitud(null);
                    setRejectionNote('');
                  }}
                  style={{
                    backgroundColor: '#666',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;