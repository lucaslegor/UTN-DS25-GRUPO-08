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

  // Verificar si el usuario es administrador
  const isAdmin = () => {
    const auth = getAuth();
    return auth?.user?.rol === 'ADMINISTRADOR';
  };

  const handleAddToSolicitud = () => {
    if (!inSolicitud && !isAdmin()) {
      addToSolicitud({ id, title, description, tipo, cobertura, image });
    }
  };

  const handleViewSolicitudes = () => {
    navigate('/solicitudes');
  };

  return (
    <>
      <Card sx={{ width: 320, backgroundColor: 'transparent', borderColor:'#dbe1f0' }}>
        <div>
          <Typography level="title-lg" sx={{color: '#3877ffff'}}>{title}</Typography>
          <Typography level="body-sm">{description}</Typography>
        </div>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <img
            src={image}
            loading="lazy"
            alt={title || 'Imagen'}
          />
        </AspectRatio>
        <CardContent orientation="vertical">
          <div>
            <Typography level="body-xs" sx={{ fontWeight: 'bold', color: '#666' }}>Tipo:</Typography>
            <Typography sx={{ fontSize: 'md', fontWeight: 'lg', color:'#1976d2', mb: 1 }}>
              {tipo?.toUpperCase()}
            </Typography>
            <Typography level="body-xs" sx={{ fontWeight: 'bold', color: '#666' }}>Cobertura:</Typography>
            <Typography sx={{ fontSize: 'sm', color:'#2e7d32', mb: 2 }}>
              {cobertura}
            </Typography>
          </div>
          <Button
            variant={isAdmin() ? "outlined" : (inSolicitud ? "soft" : "solid")}
            color={isAdmin() ? "neutral" : (inSolicitud ? "success" : "primary")}
            startDecorator={isAdmin() ? <LockIcon /> : (inSolicitud ? <VisibilityIcon /> : <BookmarkAddIcon />)}
            onClick={isAdmin() ? undefined : (inSolicitud ? handleViewSolicitudes : handleAddToSolicitud)}
            disabled={isAdmin()}
            fullWidth
            title={isAdmin() ? "Los administradores no pueden hacer solicitudes" : ""}
          >
            {isAdmin() ? 'Solo para usuarios' : (inSolicitud ? 'Ver mis solicitudes' : 'Agregar a solicitud')}
          </Button>
        </CardContent>
      </Card>


    </>

  );
};

export default ProductCard;
