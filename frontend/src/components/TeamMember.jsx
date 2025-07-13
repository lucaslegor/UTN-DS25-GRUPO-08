import React from 'react';

const TeamMember = ({ name, role, description, image }) => (
  <div className="member-card">
    <img
      src={image}
      alt={name}
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '0.7rem',
        boxShadow: '0 2px 8px rgba(30,67,192,0.10)'
      }}
    />
    <h4>{name}</h4>
    <p style={{ fontWeight: 600, color: '#1e43c0', marginBottom: 4 }}>{role}</p>
    <p>{description}</p>
  </div>
);

export default TeamMember; 