import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { 
  Assignment,
  ArrowBack,
  CheckCircle,
  Pending,
  Cancel,
  Person,
  Description
} from '@mui/icons-material';
import { useSolicitudes } from '../context/SolicitudesContext';
import { useNavigate } from 'react-router-dom';
import { getAuth } from '../services/api';
import Swal from 'sweetalert2';
import * as yup from 'yup';

// Esquema de validación con Yup
const validationSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  apellido: yup
    .string()
    .required('El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras'),
  email: yup
    .string()
    .required('El email es requerido')
    .email('Debe ser un email válido'),
  telefono: yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^[0-9+\-\s()]+$/, 'El teléfono solo puede contener números y caracteres válidos')
    .min(8, 'El teléfono debe tener al menos 8 caracteres'),
  dni: yup
    .string()
    .required('El número de documento es requerido')
    .matches(/^[0-9]+$/, 'El DNI solo puede contener números')
    .min(7, 'El DNI debe tener al menos 7 dígitos')
    .max(8, 'El DNI no puede exceder 8 dígitos'),
  fechaNacimiento: yup
    .string()
    .required('La fecha de nacimiento es requerida')
    .test('age', 'Debe ser mayor de 18 años', function(value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),
  direccion: yup
    .string()
    .required('La dirección es requerida')
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(100, 'La dirección no puede exceder 100 caracteres'),
  ciudad: yup
    .string()
    .required('La ciudad es requerida')
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'La ciudad no puede exceder 50 caracteres'),
  codigoPostal: yup
    .string()
    .matches(/^[0-9]*$/, 'El código postal solo puede contener números')
    .max(10, 'El código postal no puede exceder 10 caracteres'),
  tipoDocumento: yup
    .string()
    .required('El tipo de documento es requerido'),
  genero: yup
    .string(),
  estadoCivil: yup
    .string(),
  ocupacion: yup
    .string()
    .max(100, 'La ocupación no puede exceder 100 caracteres'),
  ingresosMensuales: yup
    .string()
    .matches(/^[0-9]*$/, 'Los ingresos mensuales solo pueden contener números')
    .max(15, 'Los ingresos mensuales no pueden exceder 15 dígitos')
});

const SolicitudesPage = () => {
  const { 
    solicitudItem, 
    removeFromSolicitud, 
    clearSolicitud, 
    createSolicitud,
    getSolicitudes,
    getCurrentItem
  } = useSolicitudes();
  
  const navigate = useNavigate();
  const [misSolicitudes, setMisSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});

  // Verificar si el usuario es administrador
  const isAdmin = () => {
    const auth = getAuth();
    return auth?.user?.rol === 'ADMINISTRADOR';
  };
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    dni: '',
    fechaNacimiento: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    tipoDocumento: 'DNI',
    genero: '',
    estadoCivil: '',
    ocupacion: '',
    ingresosMensuales: ''
  });

  useEffect(() => {
    loadSolicitudes();
  }, []);

  const loadSolicitudes = async () => {
    try {
      const solicitudes = await getSolicitudes();
      setMisSolicitudes(solicitudes);
    } catch (error) {
      console.error('Error loading solicitudes:', error);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validación en tiempo real
    try {
      await validationSchema.validateAt(name, { ...formData, [name]: value });
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error.message
      }));
    }
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      // Validar formulario antes de avanzar al paso de confirmación
      try {
        await validationSchema.validate(formData, { abortEarly: false });
        setErrors({});
        setActiveStep(prev => prev + 1);
      } catch (error) {
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
        
        Swal.fire({
          title: 'Formulario incompleto',
          text: 'Por favor corrige los errores antes de continuar',
          icon: 'warning'
        });
      }
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleRemoveItem = () => {
    removeFromSolicitud();
  };

  const handleClearSolicitud = () => {
    Swal.fire({
      title: "<strong>¿Estás seguro?</strong>",
      icon: "question",
      html: `Se eliminará el producto de tu solicitud`,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `Sí`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        clearSolicitud();
      } 
    });
  };

  const handleSubmitSolicitud = async () => {
    if (!solicitudItem) {
      Swal.fire({
        title: 'Solicitud vacía',
        text: 'Agrega un producto a tu solicitud',
        icon: 'warning'
      });
      return;
    }

    // Validar formulario con Yup
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach(err => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor corrige los errores antes de enviar la solicitud',
        icon: 'warning'
      });
      return;
    }

    setLoading(true);
    try {
      await createSolicitud(formData);
      await loadSolicitudes();
      Swal.fire({
        title: '¡Solicitud enviada!',
        text: 'Tu solicitud ha sido enviada correctamente',
        icon: 'success'
      });
      clearSolicitud();
      setActiveStep(0);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        dni: '',
        fechaNacimiento: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        tipoDocumento: 'DNI',
        genero: '',
        estadoCivil: '',
        ocupacion: '',
        ingresosMensuales: ''
      });
      setErrors({});
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudo enviar la solicitud',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'CREADA': return 'default';
      case 'PENDIENTE_POLIZA': return 'warning';
      case 'POLIZA_CARGADA': return 'info';
      case 'APROBADA': return 'success';
      case 'RECHAZADA': return 'error';
      case 'CANCELADA': return 'default';
      default: return 'default';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'CREADA': return <Assignment />;
      case 'PENDIENTE_POLIZA': return <Pending />;
      case 'POLIZA_CARGADA': return <Assignment />;
      case 'APROBADA': return <CheckCircle />;
      case 'RECHAZADA': return <Cancel />;
      case 'CANCELADA': return <Cancel />;
      default: return <Assignment />;
    }
  };

  // Mostrar mensaje para administradores
  if (isAdmin()) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Assignment sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Panel de Administrador
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Los administradores no pueden crear solicitudes. 
            Utiliza el Panel de Administración para gestionar productos y solicitudes de usuarios.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/adminpanel')}
            sx={{ mr: 2 }}
          >
            Ir al Panel Admin
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate('/')}
          >
            Ver Productos
          </Button>
        </Box>
      </Container>
    );
  }

  if (!solicitudItem && misSolicitudes.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Assignment sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            No tienes solicitudes
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Agrega un producto a tu solicitud para comenzar
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/')}
          >
            Ver Productos
          </Button>
        </Box>
      </Container>
    );
  }

  const steps = ['Producto Seleccionado', 'Datos Personales', 'Confirmación'];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Producto Seleccionado
            </Typography>
            
            {solicitudItem && (
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{solicitudItem.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {solicitudItem.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tipo: {solicitudItem.tipo} | Cobertura: {solicitudItem.cobertura}
                      </Typography>
                    </Box>
                    <Button 
                      color="error" 
                      onClick={handleRemoveItem}
                    >
                      Quitar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Paper>
        );
      
      case 1:
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Datos Personales
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  error={!!errors.apellido}
                  helperText={errors.apellido}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  error={!!errors.telefono}
                  helperText={errors.telefono}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth error={!!errors.tipoDocumento}>
                  <InputLabel>Tipo de Documento</InputLabel>
                  <Select
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="DNI">DNI</MenuItem>
                    <MenuItem value="PASAPORTE">Pasaporte</MenuItem>
                    <MenuItem value="CEDULA">Cédula</MenuItem>
                  </Select>
                  {errors.tipoDocumento && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.tipoDocumento}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Número de Documento"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  error={!!errors.dni}
                  helperText={errors.dni}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.fechaNacimiento}
                  helperText={errors.fechaNacimiento}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Género</InputLabel>
                  <Select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="MASCULINO">Masculino</MenuItem>
                    <MenuItem value="FEMENINO">Femenino</MenuItem>
                    <MenuItem value="OTRO">Otro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  error={!!errors.direccion}
                  helperText={errors.direccion}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  error={!!errors.ciudad}
                  helperText={errors.ciudad}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Código Postal"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                  error={!!errors.codigoPostal}
                  helperText={errors.codigoPostal}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Estado Civil</InputLabel>
                  <Select
                    name="estadoCivil"
                    value={formData.estadoCivil}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="SOLTERO">Soltero/a</MenuItem>
                    <MenuItem value="CASADO">Casado/a</MenuItem>
                    <MenuItem value="DIVORCIADO">Divorciado/a</MenuItem>
                    <MenuItem value="VIUDO">Viudo/a</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Ocupación"
                  name="ocupacion"
                  value={formData.ocupacion}
                  onChange={handleInputChange}
                  error={!!errors.ocupacion}
                  helperText={errors.ocupacion}
                />
              </Grid>
            </Grid>
          </Paper>
        );
      
      case 2:
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Confirmación
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Producto:</Typography>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{solicitudItem?.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {solicitudItem?.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tipo: {solicitudItem?.tipo} | Cobertura: {solicitudItem?.cobertura}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Datos Personales:</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2"><strong>Nombre:</strong> {formData.nombre} {formData.apellido}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2"><strong>Email:</strong> {formData.email}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2"><strong>Teléfono:</strong> {formData.telefono}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2"><strong>Documento:</strong> {formData.tipoDocumento} {formData.dni}</Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant="body2"><strong>Dirección:</strong> {formData.direccion}, {formData.ciudad}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary">
          {solicitudItem ? 'Completar Formulario de Solicitud' : 'Mis Solicitudes'}
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Volver
        </Button>
      </Box>

      {solicitudItem && (
        <>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Anterior
            </Button>
            
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmitSolicitud}
                  disabled={loading}
                  startIcon={<Description />}
                >
                  {loading ? 'Enviando...' : 'Completar Formulario de Solicitud'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Siguiente
                </Button>
              )}
            </Box>
          </Box>
        </>
      )}

      {/* Historial de solicitudes */}
      {misSolicitudes.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Historial de Solicitudes
          </Typography>
          
          <Grid container spacing={2}>
            {misSolicitudes.map((solicitud) => (
              <Grid size={{ xs: 12, md: 6 }} key={solicitud.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Solicitud #{solicitud.id}
                      </Typography>
                      <Chip 
                        icon={getEstadoIcon(solicitud.estado)}
                        label={solicitud.estado.replace('_', ' ')}
                        color={getEstadoColor(solicitud.estado)}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Fecha: {new Date(solicitud.createdAt).toLocaleDateString()}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Productos: {solicitud.items?.length || 0}
                    </Typography>
                    
                    {solicitud.items?.map((item, index) => (
                      <Typography key={index} variant="body2" sx={{ ml: 1 }}>
                        • {item.titulo} (x{item.cantidad})
                      </Typography>
                    ))}
                    
                    {solicitud.datosPersonales && (
                      <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                          📋 Datos Personales Enviados:
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="body2">
                              <strong>Nombre:</strong> {solicitud.datosPersonales.nombre}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="body2">
                              <strong>Apellido:</strong> {solicitud.datosPersonales.apellido}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="body2">
                              <strong>Email:</strong> {solicitud.datosPersonales.email}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="body2">
                              <strong>Teléfono:</strong> {solicitud.datosPersonales.telefono}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="body2">
                              <strong>DNI:</strong> {solicitud.datosPersonales.dni}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="body2">
                              <strong>Fecha Nacimiento:</strong> {solicitud.datosPersonales.fechaNacimiento}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="body2">
                              <strong>Dirección:</strong> {solicitud.datosPersonales.direccion}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="body2">
                              <strong>Ciudad:</strong> {solicitud.datosPersonales.ciudad}
                            </Typography>
                          </Grid>
                          {solicitud.datosPersonales.codigoPostal && (
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <Typography variant="body2">
                                <strong>Código Postal:</strong> {solicitud.datosPersonales.codigoPostal}
                              </Typography>
                            </Grid>
                          )}
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="body2">
                              <strong>Tipo Documento:</strong> {solicitud.datosPersonales.tipoDocumento}
                            </Typography>
                          </Grid>
                          {solicitud.datosPersonales.genero && (
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <Typography variant="body2">
                                <strong>Género:</strong> {solicitud.datosPersonales.genero}
                              </Typography>
                            </Grid>
                          )}
                          {solicitud.datosPersonales.estadoCivil && (
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <Typography variant="body2">
                                <strong>Estado Civil:</strong> {solicitud.datosPersonales.estadoCivil}
                              </Typography>
                            </Grid>
                          )}
                          {solicitud.datosPersonales.ocupacion && (
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <Typography variant="body2">
                                <strong>Ocupación:</strong> {solicitud.datosPersonales.ocupacion}
                              </Typography>
                            </Grid>
                          )}
                          {solicitud.datosPersonales.ingresosMensuales && (
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <Typography variant="body2">
                                <strong>Ingresos Mensuales:</strong> {solicitud.datosPersonales.ingresosMensuales}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    )}
                    
                    {solicitud.estado === 'POLIZA_CARGADA' && solicitud.poliza ? (
                      <Alert 
                        severity="info" 
                        sx={{ 
                          mt: 2,
                          backgroundColor: '#e3f2fd',
                          border: '2px solid #2196f3',
                          '& .MuiAlert-icon': {
                            fontSize: '32px'
                          }
                        }}
                      >
                        <Typography variant="h6" gutterBottom sx={{ 
                          color: '#1976d2',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                          🎉 ¡Póliza Cargada Exitosamente!
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#1565c0',
                          lineHeight: 1.6,
                          mb: 2
                        }}>
                          <strong>¡Felicitaciones!</strong> Tu póliza ha sido procesada y cargada exitosamente en nuestro sistema.
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#1565c0',
                          lineHeight: 1.6,
                          mb: 2
                        }}>
                          Esperamos que tu experiencia en nuestra página haya sido excelente y que hayas encontrado exactamente lo que necesitabas.
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#1565c0',
                          lineHeight: 1.6,
                          mb: 2
                        }}>
                          <strong>¡Gracias por confiar en nosotros!</strong> Estamos aquí para brindarte la mejor protección y tranquilidad.
                        </Typography>
                        <Box sx={{
                          mt: 2,
                          p: 2,
                          backgroundColor: '#f3e5f5',
                          borderRadius: 1,
                          border: '1px solid #9c27b0'
                        }}>
                          <Typography variant="body2" sx={{ 
                            color: '#7b1fa2',
                            fontWeight: 'bold',
                            textAlign: 'center'
                          }}>
                            📄 Póliza #{solicitud.poliza.id} - Lista para descargar
                          </Typography>
                        </Box>
                      </Alert>
                    ) : solicitud.notaRechazo && solicitud.estado !== 'POLIZA_CARGADA' && (
                      <Alert 
                        severity={solicitud.estado === 'APROBADA' ? 'success' : 'error'} 
                        sx={{ mt: 2 }}
                      >
                        <Typography variant="subtitle2" gutterBottom>
                          <strong>
                            {solicitud.estado === 'APROBADA' ? '📋 Información Importante:' : '❌ Motivo de Rechazo:'}
                          </strong>
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                          {solicitud.notaRechazo}
                        </Typography>
                      </Alert>
                    )}
                  </CardContent>
                  
                  {solicitud.poliza && (
                    <CardActions>
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => window.open(solicitud.poliza.archivoUrl, '_blank')}
                      >
                        Ver Póliza
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default SolicitudesPage;
