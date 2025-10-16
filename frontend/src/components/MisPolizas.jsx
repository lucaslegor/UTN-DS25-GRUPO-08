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

const MisPolizas = () => {
  const [polizas, setPolizas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPoliza, setSelectedPoliza] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data - en producción esto vendría de una API
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockPolizas = [
        {
          id: 1,
          idPedido: 1001,
          archivoUrl: "https://ejemplo.com/poliza1.pdf",
          estado: "CARGADA",
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-20"),
          pedido: {
            idPedido: 1001,
            items: [
              {
                productId: 1,
                titulo: "Seguro de Auto Premium",
                precio: 25000,
                cantidad: 1
              }
            ],
            subtotal: 25000,
            total: 25000,
            estado: "PAGO_APROBADO",
            createdAt: new Date("2024-01-10")
          }
        },
        {
          id: 2,
          idPedido: 1002,
          archivoUrl: "https://ejemplo.com/poliza2.pdf",
          estado: "PENDIENTE",
          createdAt: new Date("2024-02-01"),
          updatedAt: new Date("2024-02-01"),
          pedido: {
            idPedido: 1002,
            items: [
              {
                productId: 2,
                titulo: "Seguro de Hogar Básico",
                precio: 15000,
                cantidad: 1
              }
            ],
            subtotal: 15000,
            total: 15000,
            estado: "PENDIENTE_POLIZA",
            createdAt: new Date("2024-02-01")
          }
        },
        {
          id: 3,
          idPedido: 1003,
          archivoUrl: "https://ejemplo.com/poliza3.pdf",
          estado: "CARGADA",
          createdAt: new Date("2023-12-20"),
          updatedAt: new Date("2023-12-25"),
          pedido: {
            idPedido: 1003,
            items: [
              {
                productId: 3,
                titulo: "Seguro de Vida",
                precio: 35000,
                cantidad: 1
              }
            ],
            subtotal: 35000,
            total: 35000,
            estado: "PAGO_APROBADO",
            createdAt: new Date("2023-12-20")
          }
        }
      ];
      setPolizas(mockPolizas);
      setLoading(false);
    }, 1000);
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
    // En producción, esto descargaría el archivo real
    window.open(poliza.archivoUrl, '_blank');
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
          <Grid item xs={12} sm={6} md={6} lg={4} key={poliza.id}>
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
                    Pedido #{poliza.idPedido}
                  </Typography>
                  
                  {poliza.pedido.items.map((item, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                      <ShoppingCartIcon sx={{ fontSize: { xs: 14, sm: 16 }, mr: { xs: 0.5, sm: 1 }, color: 'primary.main' }} />
                      <Typography variant="body2" noWrap sx={{ flex: 1 }}>
                        {item.titulo}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Precio */}
                <Box display="flex" alignItems="center" mb={{ xs: 1.5, sm: 2 }}>
                  <Typography variant="h6" color="success.main" fontWeight="bold">
                    {formatPrice(poliza.pedido.total)}
                  </Typography>
                </Box>

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
                        secondary={`#${selectedPoliza.pedido.idPedido}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MoneyIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Total"
                        secondary={formatPrice(selectedPoliza.pedido.total)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Estado del pedido"
                        secondary={selectedPoliza.pedido.estado}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />

              <Typography variant="h6" gutterBottom>
                Productos incluidos
              </Typography>
              <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
                {selectedPoliza.pedido.items.map((item, index) => (
                  <Box key={index} display="flex" justifyContent="space-between" alignItems="center" py={1}>
                    <Typography variant="body1">
                      {item.titulo}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatPrice(item.precio)}
                    </Typography>
                  </Box>
                ))}
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