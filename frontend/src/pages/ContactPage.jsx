import React, { useRef } from "react";
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
import Swal from 'sweetalert2';

export const Contact = () => {
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());

    try {
      // 👉 Llamada al backend (ajustá la URL según tu entorno)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/email/contacto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: data.user_name,
          email: data.user_email,
          mensaje: data.message,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado!',
          text: 'Tu mensaje ha sido enviado con éxito.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        form.current.reset();
      } else {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar mensaje',
          text: errorData?.message || 'No se pudo enviar el mensaje. Inténtalo más tarde.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'Hubo un problema al conectar con el servidor. Verifica tu conexión.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
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
