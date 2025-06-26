import React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NavButton = ({ image, icon: Icon, label, onClick }) => {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        position: 'relative',
        width: { xs: '100%', sm: '32%' },
        minWidth: 180,
        height: { xs: 120, sm: 140 },
        borderRadius: 5,
        overflow: 'hidden',
        boxShadow: 6,
        m: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        backgroundColor: '#eee',
        transition: 'transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.04)',
          boxShadow: 12,
        },
        '&:hover .nav-btn-label': {
          textDecoration: 'underline',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 2,
        }}
      >
        {Icon && <Icon sx={{ color: 'white', fontSize: 36 }} />}
        <Typography variant="h6" className="nav-btn-label" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 2px 8px #000' }}>
          {label}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

export default NavButton; 