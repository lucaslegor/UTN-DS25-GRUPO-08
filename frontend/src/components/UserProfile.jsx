import React, { useState, useEffect } from 'react';
import '../styles/UserProfile.css';
import logo from '../assets/logo.png';

const UserProfile = () => {
  const [user, setUser] = useState({
    nombre: 'Tobias Domato',
    correo: 'domatotobias@gmail.com',
    contrase√±a: '1234567',
    telefono: '2216382495',
    direccion: 'Diagonal 79 852',
  });

  const [errores, setErrores] = useState({});
  const [editable, setEditable] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [mensajeGuardado, setMensajeGuardado] = useState(false);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatarURL');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        localStorage.setItem('avatarURL', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validarCampos = () => {
    const newErrors = {};
    if (!user.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user.correo)) newErrors.correo = 'Correo inv√°lido';
    if (user.contrase√±a.length < 6) newErrors.contrase√±a = 'M√≠nimo 6 caracteres';
    if (!/^\d{10,15}$/.test(user.telefono)) newErrors.telefono = 'Tel√©fono inv√°lido';
    if (!user.direccion) newErrors.direccion = 'Direcci√≥n obligatoria';
    return newErrors;
  };

  const handleEditClick = () => {
    if (editable) {
      const val = validarCampos();
      if (Object.keys(val).length === 0) {
        setEditable(false);
        setMensajeGuardado(true);
        setTimeout(() => {
          setMensajeGuardado(false);
        }, 3000);
      } else {
        setErrores(val);
        return;
      }
    } else {
      setErrores({});
      setEditable(true);
    }
  };

  const renderInput = (label, name, type = 'text') => (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={user[name]}
        onChange={handleChange}
        disabled={!editable}
      />
      <div className={`error-wrapper ${errores[name] ? 'visible' : ''}`}>
        {errores[name] && <span className="error">Ì∫´ {errores[name]}</span>}
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="left-panel">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="right-panel">
        <h2>Perfil de usuarioÌ±§</h2>
        <div
          className="avatar-wrapper"
          onClick={() => document.getElementById('avatarInput').click()}
        >
          <div
            className="avatar"
            style={{ backgroundImage: avatar ? `url(${avatar})` : 'none' }}
          ></div>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </div>

        {renderInput('Nombre completo:', 'nombre')}
        {renderInput('Correo Electr√≥nico:', 'correo', 'email')}
        {renderInput('Contrase√±a:', 'contrase√±a', 'password')}
        {renderInput('Tel√©fono:', 'telefono')}
        {renderInput('Direcci√≥n:', 'direccion')}

        <button
          onClick={handleEditClick}
          className={editable ? 'btn-guardar' : 'btn-editar'}
        >
          {editable ? 'Ì≤æ Guardar' : '‚úèÔ∏è Editar'}
        </button>

        {mensajeGuardado && (
          <div className="toast-success">‚úÖ ¬°Datos guardados correctamente!</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
