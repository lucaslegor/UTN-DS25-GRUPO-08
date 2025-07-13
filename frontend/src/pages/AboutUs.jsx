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
              Nuestra organización esta formada por mas de 80 asesorxs y pensada para que todos seamos parte,
              los nuevos y no tanto, con mas experiencia y los noveles. Aprovechando todas las tecnologías posibles pero sin dejar de lado lo mas importante,
              el grupo humano que la forma. Somos engranajes que hacen que funcione como Organización. Nos interesa la capacitación continua en la actividad,
              reuniones de trabajo aunque también solo para juntarnos y charlar. Todo esto suma, no vas a estar solo en la actividad que tan difícil es al arrancar y para sostenerse.
              Trabajamos con la <strong>Compañía líder</strong> en el mercado asegurador argentino: Federación Patronal Seguros S.A con el sistema mas moderno de gestión de cartera el SELF.
            </p>
            <p className="nosotros-text">
              Somos una organización de asesores de seguros con mas de <strong>20 años de experiencia</strong>, que está comprometida con el éxito de cada uno de nuestros miembros.
              Trabajamos en equipo para alcanzar nuestras metas y, lo más importante, nos enfocamos en la satisfacción de nuestros
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
            name="Juan Rodríguez"
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