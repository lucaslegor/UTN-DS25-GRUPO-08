import React from 'react';
import { Facebook, Instagram, Users, MapPin } from 'lucide-react';
import '../styles/footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">

          <div className="brand">
            <span className="brand-name">
              <Users size={24} /> Maps Asesores
            </span>
            <div className="map-container">
              <iframe
                className="map-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d817.899620135342!2d-57.93984233036146!3d-34.91652449861435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e622a64f9ba1%3A0xdcb6fc11eb6b2a0e!2sC.%2059%20415%2C%20B1900BSQ%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1750978490530!5m2!1ses!2sar"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <p className="map-text">Dirección: Calle 59 Nro:415, La Plata</p>
            </div>
          </div>

          <div className="social-icons">
            <h3 className="social-text">Redes Sociales</h3>
            <a href="#" className="social-icon">
              <Instagram size={24} />
              Instagram
            </a>
            <a href="#" className="social-icon">
              <Facebook size={24} />
              Facebook
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Maps Asesores. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
