import React from 'react';
import { useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import '../styles/WhatsApp.css';

const WhatsAppFloat = () => {
  const location = useLocation();
  
  // Configuración del número de WhatsApp - CAMBIA ESTE NÚMERO
  const WHATSAPP_NUMBER = '5491123456789'; // Reemplaza con tu número (sin + y sin espacios)
  
  // Pantallas donde NO mostrar el botón
  const hiddenPaths = [
    '/login',
    '/register', 
    '/forgot-password',
    '/reset-password',
    '/adminpanel'
  ];
  
  // Verificar si debe mostrar el botón
  const shouldShow = !hiddenPaths.some(path => location.pathname.startsWith(path));
  
  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const message = encodeURIComponent('Hola! Me interesa conocer más sobre sus servicios de seguros.');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
  };
  
  if (!shouldShow) return null;
  
  return (
    <div className="whatsapp-float" onClick={openWhatsApp}>
       <Phone />
      <span className="whatsapp-tooltip">¡Chatea con nosotros!</span>
    </div>
  );
};

export default WhatsAppFloat;
