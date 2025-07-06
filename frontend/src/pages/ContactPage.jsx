import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Paper } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../styles/contact.css';

const initialForm = {
  first: '',
  last: '',
  email: '',
  phone: '',
  message: ''
};

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
    setForm(initialForm);
  };

  return (
    <div className="contact-root">
      <div className="contact-container">
        {/* Columna izquierda */}
        <div className="contact-info">
          <Typography className="contact-title" variant="h3" component="h1" gutterBottom>
            Contáctanos
          </Typography>
          <Typography className="contact-description" variant="body1" gutterBottom>
            No dudes en usar el formulario o enviarnos un correo electrónico. Las llamadas telefónicas tradicionales también funcionan.
          </Typography>
          <div className="contact-detail">
            <PhoneIcon sx={{ color: '#1e43c0' }} />
            <span>+54 11 1234–5678</span>
          </div>
          <div className="contact-detail">
            <EmailIcon sx={{ color: '#1e43c0' }} />
            <span>mapsaseguradora@gmail.com</span>
          </div>
          <div className="contact-detail">
            <LocationOnIcon sx={{ color: '#1e43c0' }} />
            <span>
              Calle 59,<br />Nro: 415, La Plata
            </span>
          </div>
        </div>
        {/* Columna derecha: Formulario */}
        <Paper elevation={3} sx={{ flex: 1, minWidth: 320, p: { xs: 2, sm: 4 } }} className="contact-form">
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  name="first"
                  value={form.first}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido"
                  name="last"
                  value={form.last}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  size="medium"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Teléfono (opcional)"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="medium"
                  type="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mensaje"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  size="medium"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <button className='submit-button-contact' type="submit">Enviar</button>
                 
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default ContactPage;