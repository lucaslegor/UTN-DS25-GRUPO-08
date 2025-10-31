import React from 'react';

const TeamMember = ({ name, role, description, image }) => (
  <div className="member-card">
    <div className="member-card__inner">
      <div className="member-avatar">
        <img src={image} alt={name} />
      </div>
      <div className="member-info">
        <h4 className="member-name">{name}</h4>
        <p className="member-role">{role}</p>
        <p className="member-desc">{description}</p>
      </div>
    </div>
  </div>
);

export default TeamMember;
