import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/aboutUs.css';
import TeamMember from '../components/TeamMember';

const AboutUs = () => {
  return (
    <div>
      <main className="about-us-content">
        <section>
          <h2>Sobre Nosotros</h2>
          <p>
            En Maps, nos dedicamos a ofrecer las mejores soluciones de mapas y servicios relacionados para nuestros clientes.
            Nuestra misión es hacer que la navegación y la exploración sean más fáciles y accesibles para todos.
            Con años de experiencia en la industria, nuestro equipo se esfuerza por brindar productos innovadores
            y un servicio al cliente excepcional.
          </p>
          <p>
            Creemos firmemente en la calidad, la precisión y la facilidad de uso. Ya sea que estés buscando un seguro de viaje,
            paquetes turísticos o simplemente mapas detallados, en Maps encontrarás lo que necesitas.
            ¡Explora el mundo con nosotros!
          </p>
        </section>

        <section className="team-section">
          <h3>Nuestro Equipo</h3>
          <div className="team-members">
            {/* aca irian los team members, por ahora lo dejo sin hacer, sin simulacion x ahora*/}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs; 