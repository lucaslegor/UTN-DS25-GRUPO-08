import React from 'react';
import '../styles/aboutUs.css';
import OtherGallery from '../components/OtherGallery';

export const WhoAreWe = () => {
  return (
    <section className="nosotros-section">
      <div className="nosotros-container">
        <h2 className="nosotros-title">¿Quiénes somos?</h2>

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

      <div>
        <OtherGallery/>
      </div>
    </section>
  );
};

export default WhoAreWe;
