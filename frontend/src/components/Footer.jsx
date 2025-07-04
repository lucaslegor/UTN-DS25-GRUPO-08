import React from 'react';
import { MapPin, Mail, Phone, Clock, UserRound } from 'lucide-react';
import '../styles/footer.css';

export const Footer = () => {
  return (
    <>
      {/* Sección superior de contacto */}
      <div className="footer-contact">
        <div className="footer-container">

          {/* Título centrado */}
          <h2 className="footer-title">
            <UserRound size={24} color="#fff" /> Maps Asesores
          </h2>

          {/* Ítems de contacto */}
          <div className="footer-info">
            <div className="footer-item">
              <Phone size={20} color="#fff" />
              <div>
                <h4>Teléfono</h4>
                <p>+54 11 1234–5678</p>
              </div>
            </div>

            <div className="footer-item">
              <Mail size={20} color="#fff" />
              <div>
                <h4>Email</h4>
                <p>info@mapsasesores.com</p>
              </div>
            </div>

            <div className="footer-item">
              <MapPin size={20} color="#fff" />
              <div>
                <h4>Dirección</h4>
                <p>Calle 59 Nro: 415, La Plata</p>
              </div>
            </div>

            <div className="footer-item">
              <Clock size={20} color="#fff" />
              <div>
                <h4>Horarios</h4>
                <p>Lunes a Viernes: 9:00 – 18:00<br />Sábados: 9:00 – 13:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parte inferior */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Maps Asesores. Todos los derechos reservados.</p>
      </div>
    </>
  );
};

export default Footer;
