import React from "react";
import OtherGallery from "../components/OtherGallery";
import TeamMember from "../components/TeamMember";
import "../styles/aboutUs.css";

export const AboutUs = () => {
  return (
    <section className="nosotros-section">
      <div className="nosotros-container">
        {/* Intro + galería */}
        <div className="nosotros-row">
          <div className="nosotros-texts">
            <h2 className="nosotros-title">¿Quiénes somos?</h2>
            <div className="texts">
              <p className="nosotros-text">
                <strong>MAPS Asesores</strong> es una empresa argentina
                especializada en brindar soluciones integrales en seguros,
                inversiones y planificación financiera. Su misión es acompañar a
                personas y organizaciones en la protección de su patrimonio y en
                la toma de decisiones estratégicas que les permitan crecer con
                tranquilidad.
              </p>
              <p className="nosotros-text">
                Con un enfoque cercano, profesional y transparente, MAPS se
                distingue por ofrecer un asesoramiento personalizado, adaptado a
                las necesidades de cada cliente. A través de alianzas con
                compañías líderes del sector, pone a disposición una amplia gama
                de productos y servicios que cubren desde seguros de vida, hogar
                y automotores, hasta seguros corporativos y planes de inversión.
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
              name="Maximiliano Perez"
              role="CEO y Fundador"
              description="Con más de 15 años de experiencia en venta de seguros."
              image="/maxi.jpg"
            />
            <TeamMember
              name="Diana Niz"
              role="Directora"
              description="Experta en seguros y pólizas."
              image="/diana.jpg"
            />
            <TeamMember
              name="Cesar Do porto"
              role="Jefe de Venta"
              description="Líder en la sección de ventas."
              image="/cesar.jpg"
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutUs;
