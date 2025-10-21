import React from 'react';
import { Badge, IconButton } from '@mui/material';
import { Assignment } from '@mui/icons-material';
import { useSolicitudes } from '../context/SolicitudesContext';

const SolicitudesIcon = () => {
  const { solicitudItem } = useSolicitudes();
  const hasItem = solicitudItem ? 1 : 0;

  return (
    <Badge badgeContent={hasItem} color="primary">
      <IconButton
        sx={{
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.12)',
          },
          padding: '4px',
        }}
        aria-label="Solicitudes"
      >
        <Assignment />
      </IconButton>
    </Badge>
  );
};

export default SolicitudesIcon;
