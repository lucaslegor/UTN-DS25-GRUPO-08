import React from 'react';
import { Container } from '@mui/material';
import MisPolizas from '../components/MisPolizas';

const MisPolizasPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: '5em' }}>
      <MisPolizas />
    </Container>
  );
};

export default MisPolizasPage; 