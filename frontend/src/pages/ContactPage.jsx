import React from 'react'
import '../styles/contact.css';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  SendHorizonal,
  CircleUserRoundIcon,
} from "lucide-react";
import "../styles/contact.css";

export const Contact = () => {
  return (
    <section style={{fontFamily:'Poppins, sans-serif'}} id="contacto" className="contacto">
      <div className="container">
        <div className="contact-header">
          <h2 className="title-contact">
            <CircleUserRoundIcon size={24} color="#3d6de2" /> Contacto
          </h2>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div>
                <h3 className="heading">
                  <Phone className="icon" size={24} color="#3d6de2" /> Teléfono
                </h3>
                <p className="text">+54 11 1234-5678</p>
              </div>
            </div>

            <div className="contact-item">
              <div>
                <h3 className="heading">
                  <Mail className="icon" size={24} color="#3d6de2" /> Email
                </h3>
                <p className="text">info@mapsasesores.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div>
                <h3 className="heading">
                  <MapPin size={24} color="#3d6de2" /> Dirección
                </h3>
                <iframe
                  className="map-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13083.547451431052!2d-57.95527201033044!3d-34.934374287603944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1742495053963!5m2!1ses-419!2sar"
                ></iframe>
                <p className="map-text">
                  Dirección: Calle Ficticia 123, Ciudad
                </p>

              </div>
            </div>

            <div className="contact-item">
              <div>
                <h3 className="heading">
                  <Clock className="icon" size={24} color="#3d6de2" /> Horarios
                </h3>
                <p className="text">Lunes a Viernes: 9:00 - 18:00</p>
                <p className="text">Sábados: 9:00 - 13:00</p>
              </div>
            </div>
          </div>
          <form className="form">
            <h2 className="subtitle-form">
              Envia tu mail {<SendHorizonal size={24} color="#3d6de2" />}
            </h2>
            <div>
              <input type="text" placeholder="Nombre" className="input-field" />
            </div>
            <div>
              <input type="email" placeholder="Email" className="input-field" />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Mensaje"
                className="input-field"
              ></textarea>
            </div>
            <button style={{fontFamily:'Poppins, sans-serif'}} type="submit" className="submit-button">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
