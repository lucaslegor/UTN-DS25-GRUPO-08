import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Paper,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Esquema de validación con Yup
const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre es muy corto')
    .max(50, 'El nombre es muy largo')
    .required('El nombre es obligatorio'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirmar contraseña es obligatorio')
});

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    // Aquí iría la lógica de registro cuando se implemente el backend
    console.log('Datos del formulario:', values);
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
        <IconButton onClick={() => navigate('/')} color="primary">
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Registro
        </Typography>
        
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box mb={2}>
                <Field
                  name="name"
                  as={TextField}
                  fullWidth
                  label="Nombre completo"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Box>

              <Box mb={2}>
                <Field
                  name="email"
                  as={TextField}
                  fullWidth
                  label="Email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>

              <Box mb={2}>
                <Field
                  name="password"
                  as={TextField}
                  fullWidth
                  type="password"
                  label="Contraseña"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>

              <Box mb={3}>
                <Field
                  name="confirmPassword"
                  as={TextField}
                  fullWidth
                  type="password"
                  label="Confirmar contraseña"
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                Registrarse
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Register; 