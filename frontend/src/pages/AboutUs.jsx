import React from 'react';
import OtherGallery from '../components/OtherGallery';
import TeamMember from '../components/TeamMember';
import '../styles/aboutUs.css';

export const AboutUs = () => {
  return (
    <section className="nosotros-section">

      <div className="nosotros-row">
        <div className="nosotros-texts">
          <h2 className="nosotros-title">¿Quiénes somos?</h2>
          <div className="texts">
            <p className="nosotros-text">
              En <strong>Maps</strong>, nos dedicamos a ofrecer las mejores soluciones de mapas y servicios relacionados para nuestros clientes.
              Nuestra misión es hacer que la navegación y la exploración sean más fáciles y accesibles para todos.
              Con años de experiencia en la industria, nuestro equipo se esfuerza por brindar productos innovadores
              y un servicio al cliente excepcional.
            </p>
            <p className="nosotros-text">
              Creemos firmemente en la calidad, la precisión y la facilidad de uso. Ya sea que estés buscando un seguro de viaje,
              paquetes turísticos o simplemente mapas detallados, en Maps encontrarás lo que necesitás.
              ¡Explorá el mundo con nosotros!
            </p>
          </div>
        </div>

        <div className="nosotros-gallery">
          <OtherGallery />
        </div>
      </div>

      {/* Equipo */}
      <section className="team-section">
        <h3>Nuestro Equipo</h3>
        <div className="team-members">
          <TeamMember
            name="Juan Pérez"
            role="CEO y Fundador"
            description="Con más de 15 años de experiencia en venta de seguros."
            image="https://images.unsplash.com/photo-1695230981824-8edd894a6c2c"
          />
          <TeamMember
            name="María García"
            role="Directora"
            description="Experta en seguros y pólizas."
            image="https://plus.unsplash.com/premium_photo-1661394915648-8ce7bb49e4e8"
          />
          <TeamMember
            name="Carlos López"
            role="Jefe de Venta"
            description="Líder en la sección de ventas."
            image="https://images.unsplash.com/photo-1659355894000-b8617fc7cf8d"
          />
        </div>
      </section>
    </section>
  );
};

export default AboutUs;
