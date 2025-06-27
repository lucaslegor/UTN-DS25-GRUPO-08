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
            <TeamMember
              name="Juan Pérez"
              role="CEO y Fundador"
              description="Con más de 15 años de experiencia en venta de seguros."
              image="https://images.unsplash.com/photo-1695230981824-8edd894a6c2c?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            /> 
            <TeamMember
              name="María García"
              role="Directora"
              description="Experta en seguros y pólizas."
              image="https://plus.unsplash.com/premium_photo-1661394915648-8ce7bb49e4e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <TeamMember
              name="Carlos López"
              role="Jefe de Venta"
              description="Líder en la sección de ventas."
              image="https://images.unsplash.com/photo-1659355894000-b8617fc7cf8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            /> 
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs; 