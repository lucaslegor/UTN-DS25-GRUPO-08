import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../styles/contact.css";
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

export const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,   // ⚙️ ID del servicio (desde .env)
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  // ⚙️ ID del template (desde .env)
        form.current,                              // ⚙️ referencia al formulario
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY    // ⚙️ clave pública (desde .env)
      )
      .then(
        () => {
          alert("✅ Mensaje enviado con éxito!");
          form.current.reset();
        },
        (error) => {
          console.error("Error enviando el correo:", error);
          alert("❌ Hubo un error al enviar el mensaje. Intentalo nuevamente.");
        }
      );
  };

  return (
    <section
      id="contacto"
      className="contacto"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="container">
        <div className="contact-header">
          <h2 className="title-contact">
            <CircleUserRoundIcon size={24} color="#3d6de2" /> Contacto
          </h2>
        </div>

        <div className="contact-content">
          {/* Columna izquierda */}
          <div className="contact-info">
            <div className="contact-benefits">
              <h3 className="contact-subtitle">
                <CheckCircle color="#3d6de2" size={20} /> Beneficios
              </h3>
              <ul>
                <li>
                  <Star color="#ffba00" size={16} /> Descuentos exclusivos para socios.
                </li>
                <li>
                  <Star color="#ffba00" size={16} /> Asistencia personalizada.
                </li>
                <li>
                  <Star color="#ffba00" size={16} /> Participación en eventos especiales.
                </li>
              </ul>
            </div>

            <div className="contact-quality">
              <h3 className="contact-subtitle">
                <Award color="#3d6de2" size={20} /> Calidad garantizada
              </h3>
              <p>
                Nuestro compromiso con la excelencia nos impulsa a ofrecer
                productos y servicios que superen las expectativas de nuestros
                socios.
              </p>
            </div>

            <div className="contact-schedule">
              <h3 className="contact-subtitle">
                <Clock color="#3d6de2" size={20} /> Horarios de atención
              </h3>
              <p>
                Lunes a Viernes: 9:00 - 18:00 <br />
                Sábados: 9:00 - 13:00
              </p>
            </div>

            <div className="contact-security">
              <h3 className="contact-subtitle">
                <Shield color="#3d6de2" size={20} /> Seguridad y confianza
              </h3>
              <p>
                Protegemos tus datos personales bajo los más altos estándares
                de seguridad. La privacidad de nuestros socios es nuestra prioridad.
              </p>
            </div>

            <div className="contact-community">
              <h3 className="contact-subtitle">
                <Users color="#3d6de2" size={20} /> Comunidad
              </h3>
              <p>
                Formá parte de nuestra comunidad y disfrutá de todas las ventajas
                que ofrece la Asociación Cultural y Deportiva Universal.
              </p>
            </div>
          </div>

          {/* Columna derecha: Formulario */}
          <form ref={form} className="contact-form" onSubmit={handleSubmit}>
            <h2 className="subtitle-form">
              Envia tu mail <SendHorizonal size={24} color="#3d6de2" />
            </h2>

            <div>
              <input
                type="text"
                name="user_name"
                placeholder="Nombre"
                className="contact-input"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                className="contact-input"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                rows={4}
                placeholder="Mensaje"
                className="contact-textarea"
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-button">
              Enviar Mensaje
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};


