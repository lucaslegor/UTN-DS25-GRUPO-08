import React from 'react'
import '../styles/contact.css';
import {
  Shield,
  Users,
  Award,
  Clock,
  SendHorizonal,
  CircleUserRoundIcon,
  CheckCircle,
  Star,
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
                  <Shield className="icon" size={24} color="#3d6de2" /> ¿Por qué elegirnos?
                </h3>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <CheckCircle size={16} color="#4CAF50" />
                    <span>Más de 15 años de experiencia</span>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={16} color="#4CAF50" />
                    <span>Asesoramiento personalizado</span>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={16} color="#4CAF50" />
                    <span>Las mejores coberturas del mercado</span>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={16} color="#4CAF50" />
                    <span>Respuesta rápida en siniestros</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div>
                <h3 className="heading">
                  <Users className="icon" size={24} color="#3d6de2" /> Nuestros Clientes
                </h3>
                <div className="stats-container">
                  <div className="stat-item">
                    <div className="stat-number">5000+</div>
                    <div className="stat-label">Clientes satisfechos</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Tasa de renovación</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div>
                <h3 className="heading">
                  <Award className="icon" size={24} color="#3d6de2" /> Compromiso de Calidad
                </h3>
                <div className="quality-statement">
                  <p className="quality-text">
                    En <strong>Maps Asesores</strong> nos comprometemos a brindarte la mejor experiencia en seguros. 
                    Nuestro equipo de expertos está disponible para asesorarte en cada paso del proceso, 
                    desde la elección de la póliza hasta la gestión de siniestros.
                  </p>
                  <div className="rating">
                    <Star size={20} color="#FFD700" fill="#FFD700" />
                    <Star size={20} color="#FFD700" fill="#FFD700" />
                    <Star size={20} color="#FFD700" fill="#FFD700" />
                    <Star size={20} color="#FFD700" fill="#FFD700" />
                    <Star size={20} color="#FFD700" fill="#FFD700" />
                    <span className="rating-text">4.9 - Excelente servicio</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div>
                <h3 className="heading">
                  <Clock className="icon" size={24} color="#3d6de2" /> Respuesta Garantizada
                </h3>
                <div className="response-info">
                  <div className="response-item">
                    <CheckCircle size={16} color="#4CAF50" />
                    <span>Asesoramiento especializado</span>
                  </div>
                  <div className="response-item">
                    <CheckCircle size={16} color="#4CAF50" />
                    <span>80 asesores a tu disposición</span>
                  </div>
                  <div className="response-item">
                    <CheckCircle size={16} color="#4CAF50" />
                    <span>Múltiples opciones de cobertura</span>
                  </div>
                </div>
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
