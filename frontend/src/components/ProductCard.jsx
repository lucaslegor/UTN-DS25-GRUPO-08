import React from 'react';
import { useSolicitudes } from '../context/SolicitudesContext';
import { Card, Button, CardContent, IconButton, AspectRatio, Typography } from '@mui/joy';
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
    return Boolean(auth?.token);
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
      borderColor: '#e0e7ff',
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
      <AspectRatio minHeight="160px" maxHeight="180px">
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
      </AspectRatio>

      {/* Contenido */}
      <CardContent sx={{ p: 2.5 }}>
        {/* Título y descripción */}
        <div sx={{ mb: 2 }}>
          <Typography 
            level="title-md" 
            sx={{ 
              color: '#1e293b',
              fontWeight: 600,
              mb: 0.5,
              lineHeight: 1.3
            }}
          >
            {title}
          </Typography>
          <Typography 
            level="body-sm" 
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
        </div>

        {/* Tipo y cobertura compactos */}
        <div sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <div sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography 
              level="body-xs" 
              sx={{ 
                color: '#64748b',
                fontWeight: 500,
                minWidth: '35px'
              }}
            >
              Tipo:
            </Typography>
            <Typography 
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
          </div>
          
          <div sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Typography 
              level="body-xs" 
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
          </div>
        </div>

        {/* Botón */}
        <Button
          variant={isAdmin() ? "outlined" : (inSolicitud ? "soft" : "solid")}
          color={isAdmin() ? "neutral" : (inSolicitud ? "success" : "primary")}
          startDecorator={isAdmin() ? <LockIcon /> : (inSolicitud ? <VisibilityIcon /> : <BookmarkAddIcon />)}
          onClick={isAdmin() ? undefined : (inSolicitud ? handleViewSolicitudes : handleAddToSolicitud)}
          disabled={isAdmin()}
          fullWidth
          size="sm"
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
