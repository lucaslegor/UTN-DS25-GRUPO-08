import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Description as DescriptionIcon,
  ShoppingCart as ShoppingCartIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { listPolizasApi, getAuth } from '../services/api';
import { useNavigate } from 'react-router-dom';

const MisPolizas = () => {
  const navigate = useNavigate();
  const [polizas, setPolizas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPoliza, setSelectedPoliza] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Verificar si el usuario es administrador
  const isAdmin = () => {
    const auth = getAuth();
    return auth?.user?.rol === 'ADMINISTRADOR';
  };

  // Mostrar mensaje para administradores
  if (isAdmin()) {
    return (
      <Box textAlign="center" py={8}>
        <DescriptionIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Panel de Administrador
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Los administradores no pueden ver pólizas personales. 
          Utiliza el Panel de Administración para gestionar pólizas de usuarios.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/adminpanel')}
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
      </Box>
    );
  }

  // Carga desde API
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    listPolizasApi()
      .then((data) => {
        const arr = Array.isArray(data?.polizas) ? data.polizas : [];
        const normalized = arr.map((p) => {
          return {
            ...p,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          };
        });
        if (mounted) setPolizas(normalized);
      })
      .catch((e) => {
        console.error('Error al cargar pólizas:', e);
        if (mounted) setError(e.message || 'Error al cargar');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "CARGADA":
        return "success";
      case "PENDIENTE":
        return "warning";
      case "PENDIENTE_POLIZA":
        return "warning";
      case "POLIZA_CARGADA":
        return "success";
      case "PAGO_PENDIENTE":
        return "info";
      case "PAGO_APROBADO":
        return "success";
      case "PAGO_RECHAZADO":
        return "error";
      case "CANCELADO":
        return "default";
      default:
        return "default";
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "CARGADA":
      case "POLIZA_CARGADA":
      case "PAGO_APROBADO":
        return <CheckCircleIcon />;
      case "PENDIENTE":
      case "PENDIENTE_POLIZA":
      case "PAGO_PENDIENTE":
        return <PendingIcon />;
      case "PAGO_RECHAZADO":
        return <PendingIcon />;
      case "CANCELADO":
        return <DescriptionIcon />;
      default:
        return <DescriptionIcon />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleViewPoliza = (poliza) => {
    setSelectedPoliza(poliza);
    setDialogOpen(true);
  };

  const handleDownloadPoliza = (poliza) => {
    // Evitar caché del navegador cuando se reemplaza la póliza
    const baseUrl = poliza.archivoUrl;
    const version = poliza.updatedAt ? new Date(poliza.updatedAt).getTime() : Date.now();
    const url = baseUrl.includes('?') ? `${baseUrl}&v=${version}` : `${baseUrl}?v=${version}`;
    window.open(url, '_blank');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPoliza(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error al cargar las pólizas: {error}
      </Alert>
    );
  }

  if (polizas.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <DescriptionIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No tienes pólizas aún
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cuando compres un seguro, tu póliza aparecerá aquí
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography 
        variant={{ xs: 'h5', sm: 'h4' }} 
        gutterBottom 
        sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 'bold' }}
      >
        Mis Pólizas
      </Typography>
      
      <Grid container spacing={3}>
        {polizas.map((poliza) => (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={poliza.id}>
            <Card 
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
                {/* Header con estado */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={{ xs: 1.5, sm: 2 }}>
                  <Typography variant="h6" color="primary" fontWeight="bold" sx={{ flex: 1, mr: { xs: 1, sm: 2 } }}>
                    Póliza #{poliza.id}
                  </Typography>
                  <Chip
                    icon={getEstadoIcon(poliza.estado)}
                    label={poliza.estado}
                    color={getEstadoColor(poliza.estado)}
                    size="small"
                    sx={{
                      minWidth: { xs: 100, sm: 120 },
                      height: { xs: 24, sm: 28 },
                      flexShrink: 0,
                      '& .MuiChip-label': {
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        fontWeight: 600,
                        px: { xs: 0.5, sm: 1 }
                      },
                      '& .MuiChip-icon': {
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }
                    }}
                  />
                </Box>

                <Divider sx={{ mb: { xs: 1.5, sm: 2 } }} />

                {/* Información del pedido */}
                <Box mb={{ xs: 1.5, sm: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Pedido #{poliza.idPedido || poliza.idSolicitud || 'N/A'}
                  </Typography>
                  
                  {poliza.pedido?.items && Array.isArray(poliza.pedido.items) ? (
                    poliza.pedido.items.map((item, index) => (
                      <Box key={index} display="flex" alignItems="center" mb={1}>
                        <ShoppingCartIcon sx={{ fontSize: { xs: 14, sm: 16 }, mr: { xs: 0.5, sm: 1 }, color: 'primary.main' }} />
                        <Typography variant="body2" noWrap sx={{ flex: 1 }}>
                          {item.titulo || item.title || 'Producto sin nombre'}
                        </Typography>
                      </Box>
                    ))
                  ) : poliza.solicitud?.items && Array.isArray(poliza.solicitud.items) ? (
                    poliza.solicitud.items.map((item, index) => (
                      <Box key={index} display="flex" alignItems="center" mb={1}>
                        <ShoppingCartIcon sx={{ fontSize: { xs: 14, sm: 16 }, mr: { xs: 0.5, sm: 1 }, color: 'primary.main' }} />
                        <Typography variant="body2" noWrap sx={{ flex: 1 }}>
                          {item.titulo || item.title || 'Producto sin nombre'}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Sin productos asociados
                    </Typography>
                  )}
                </Box>

                {/* Precio - Solo mostrar si existe */}
                {poliza.pedido?.total && (
                  <Box display="flex" alignItems="center" mb={{ xs: 1.5, sm: 2 }}>
                    <Typography variant="h6" color="success.main" fontWeight="bold">
                      {formatPrice(poliza.pedido.total)}
                    </Typography>
                  </Box>
                )}

                {/* Fechas */}
                <Box display="flex" alignItems="center" mb={{ xs: 1.5, sm: 2 }}>
                  <CalendarIcon sx={{ fontSize: { xs: 14, sm: 16 }, mr: { xs: 0.5, sm: 1 }, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    Creada: {formatDate(poliza.createdAt)}
                  </Typography>
                </Box>

                {/* Acciones */}
                <Box display="flex" gap={1} mt="auto">
                  <Tooltip title="Ver detalles">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleViewPoliza(poliza)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  
                  {poliza.estado === "CARGADA" && (
                    <Tooltip title="Descargar póliza">
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleDownloadPoliza(poliza)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog para ver detalles de la póliza */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth={{ xs: 'xs', sm: 'sm', md: 'md' }}
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 1, sm: 2 },
            width: { xs: 'calc(100% - 16px)', sm: 'auto' }
          }
        }}
      >
        <DialogTitle>
          Detalles de la Póliza #{selectedPoliza?.id}
        </DialogTitle>
        <DialogContent>
          {selectedPoliza && (
            <Box>
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    Información de la Póliza
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <DescriptionIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Estado"
                        secondary={
                          <Chip
                            icon={getEstadoIcon(selectedPoliza.estado)}
                            label={selectedPoliza.estado}
                            color={getEstadoColor(selectedPoliza.estado)}
                            size="small"
                          />
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Fecha de creación"
                        secondary={formatDate(selectedPoliza.createdAt)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Última actualización"
                        secondary={formatDate(selectedPoliza.updatedAt)}
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    Información del Pedido
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <ShoppingCartIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Número de pedido"
                        secondary={`#${selectedPoliza.pedido?.idPedido || selectedPoliza.idSolicitud || 'N/A'}`}
                      />
                    </ListItem>
                    {selectedPoliza.pedido?.total && (
                      <ListItem>
                        <ListItemIcon>
                          <MoneyIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total"
                          secondary={formatPrice(selectedPoliza.pedido.total)}
                        />
                      </ListItem>
                    )}
                    {selectedPoliza.pedido?.estado && (
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Estado del pedido"
                          secondary={selectedPoliza.pedido.estado}
                        />
                      </ListItem>
                    )}
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />

              <Typography variant="h6" gutterBottom>
                Productos incluidos
              </Typography>
              <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
                {selectedPoliza.pedido?.items && Array.isArray(selectedPoliza.pedido.items) ? (
                  selectedPoliza.pedido.items.map((item, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" py={1}>
                      <Typography variant="body1">
                        {item.titulo || item.title || 'Producto sin nombre'}
                      </Typography>
                      {item.precio && (
                        <Typography variant="h6" color="primary">
                          {formatPrice(item.precio)}
                        </Typography>
                      )}
                    </Box>
                  ))
                ) : selectedPoliza.solicitud?.items && Array.isArray(selectedPoliza.solicitud.items) ? (
                  selectedPoliza.solicitud.items.map((item, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" py={1}>
                      <Typography variant="body1">
                        {item.titulo || item.title || 'Producto sin nombre'}
                      </Typography>
                      {item.precio && (
                        <Typography variant="h6" color="primary">
                          {formatPrice(item.precio)}
                        </Typography>
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Sin productos asociados
                  </Typography>
                )}
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {selectedPoliza?.estado === "CARGADA" && (
            <Button
              startIcon={<DownloadIcon />}
              variant="contained"
              color="success"
              onClick={() => handleDownloadPoliza(selectedPoliza)}
            >
              Descargar Póliza
            </Button>
          )}
          <Button onClick={handleCloseDialog}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MisPolizas; 