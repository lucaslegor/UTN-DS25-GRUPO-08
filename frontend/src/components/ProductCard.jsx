import React from 'react';
import { useSolicitudes } from '../context/SolicitudesContext';
import { Card, Button, CardContent, IconButton, Typography, Box } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { getAuth } from '../services/api';
import '../styles/productCard.css';

const ProductCard = ({ id, title, description, tipo, cobertura, image }) => {
  const { addToSolicitud, isInSolicitud } = useSolicitudes();
  const navigate = useNavigate();
  const inSolicitud = isInSolicitud(id);

  const isAdmin = () => {
    const auth = getAuth();
    return auth?.user?.rol === 'ADMINISTRADOR';
  };

  const isLogged = () => {
    const auth = getAuth();
    // Verificar si existe usuario (el token ahora está en cookies httpOnly)
    return Boolean(auth?.user);
  };

  const handleAddToSolicitud = () => {
    if (!isLogged()) {
      navigate('/login');
      return;
    }
    if (!inSolicitud && !isAdmin()) {
      addToSolicitud({ id, title, description, tipo, cobertura, image });
    }
  };

  const handleViewSolicitudes = () => {
    navigate('/solicitudes');
  };

  return (
    <Card sx={{ 
      width: 320, 
      backgroundColor: 'white', 
      border: '1px solid #e0e7ff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
      '&:hover': {
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        transform: 'translateY(-2px)'
      }
    }}>
      {/* Imagen */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '160px',
          maxHeight: '180px',
          overflow: 'hidden',
          aspectRatio: '16/9'
        }}
      >
        <img
          src={image}
          loading="lazy"
          alt={title || 'Imagen'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>

      {/* Contenido */}
      <CardContent sx={{ p: 2.5 }}>
        {/* Título y descripción */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6"
            sx={{ 
              color: '#1e293b',
              fontWeight: 600,
              mb: 0.5,
              lineHeight: 1.3,
              fontSize: '1.1rem'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2"
            sx={{ 
              color: '#64748b',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Tipo y cobertura compactos */}
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography 
              variant="caption"
              sx={{ 
                color: '#64748b',
                fontWeight: 500,
                minWidth: '35px'
              }}
            >
              Tipo:
            </Typography>
            <Typography 
              variant="caption"
              sx={{ 
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#1976d2',
                backgroundColor: '#e3f2fd',
                px: 1,
                py: 0.25,
                borderRadius: '4px'
              }}
            >
              {tipo?.toUpperCase()}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Typography 
              variant="caption"
              sx={{ 
                color: '#64748b',
                fontWeight: 500,
                minWidth: '35px',
                mt: 0.25
              }}
            >
              Cobertura:
            </Typography>
            <Typography 
              variant="caption"
              sx={{ 
                fontSize: '0.75rem',
                color: '#059669',
                backgroundColor: '#ecfdf5',
                px: 1,
                py: 0.25,
                borderRadius: '4px',
                flex: 1,
                lineHeight: 1.3
              }}
            >
              {cobertura}
            </Typography>
          </Box>
        </Box>

        {/* Botón */}
        <Button
          variant={isAdmin() ? "outlined" : (inSolicitud ? "contained" : "contained")}
          color={isAdmin() ? "inherit" : (inSolicitud ? "success" : "primary")}
          startIcon={isAdmin() ? <LockIcon /> : (inSolicitud ? <VisibilityIcon /> : <BookmarkAddIcon />)}
          onClick={isAdmin() ? undefined : (inSolicitud ? handleViewSolicitudes : handleAddToSolicitud)}
          disabled={isAdmin()}
          fullWidth
          size="small"
          sx={{
            fontWeight: 600,
            borderRadius: '8px',
            py: 1
          }}
          title={isAdmin() ? "Los administradores no pueden hacer solicitudes" : ""}
        >
          {isAdmin() ? 'Solo para usuarios' : (inSolicitud ? 'Ver mis solicitudes' : 'Agregar a solicitud')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
