// Google OAuth service para el frontend (Google Identity Services)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '97231523973-8e1t3mtomvcg8qvns035tdfdcalem9vt.apps.googleusercontent.com';

// Función para cargar Google Identity Services
export const loadGoogleAPI = () => {
  return new Promise((resolve, reject) => {
    // Verificar si ya está cargado
    if (window.google && window.google.accounts) {
      resolve(window.google);
      return;
    }

    // Esperar a que el script se cargue
    const checkGoogle = () => {
      if (window.google && window.google.accounts) {
        console.log('Google Identity Services cargado correctamente');
        resolve(window.google);
      } else {
        setTimeout(checkGoogle, 100);
      }
    };

    checkGoogle();
  });
};

// Función para hacer login con Google usando Google Identity Services
export const loginWithGoogle = async () => {
  try {
    console.log('Iniciando login con Google...');
    await loadGoogleAPI();
    
    if (!window.google || !window.google.accounts) {
      throw new Error('Google Identity Services no está disponible');
    }
    
    return new Promise((resolve, reject) => {
      // Crear overlay de fondo
      const overlay = document.createElement('div');
      overlay.id = 'google-login-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      // Crear modal personalizado
      const modal = document.createElement('div');
      modal.id = 'google-login-modal';
      modal.style.cssText = `
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        padding: 30px;
        min-width: 350px;
        max-width: 400px;
        text-align: center;
        position: relative;
        animation: slideIn 0.3s ease-out;
      `;

      // Agregar estilos de animación
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `;
      document.head.appendChild(style);

      // Crear contenido del modal
      modal.innerHTML = `
        <h3 style="margin: 0 0 20px 0; color: #333; font-size: 18px;">Iniciar sesión con Google</h3>
        <div id="google-signin-button"></div>
        <button id="close-google-modal" style="
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">×</button>
      `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      // Configurar el callback de Google
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          console.log('Token obtenido de Google');
          // Limpiar el modal
          document.body.removeChild(overlay);
          document.head.removeChild(style);
          resolve(response.credential);
        },
        auto_select: false,
        cancel_on_tap_outside: false
      });

      // Renderizar el botón de Google
      setTimeout(() => {
        const buttonContainer = document.getElementById('google-signin-button');
        if (buttonContainer) {
          window.google.accounts.id.renderButton(buttonContainer, {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            width: '300'
          });
        }
      }, 100);

      // Manejar cierre del modal
      const closeModal = () => {
        document.body.removeChild(overlay);
        document.head.removeChild(style);
        reject(new Error('Login con Google cancelado'));
      };

      // Event listeners para cerrar
      document.getElementById('close-google-modal').onclick = closeModal;
      overlay.onclick = (e) => {
        if (e.target === overlay) closeModal();
      };

      // Cerrar con Escape
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);

      // Limpiar después de 2 minutos
      setTimeout(() => {
        if (document.getElementById('google-login-overlay')) {
          closeModal();
        }
      }, 120000);
    });
  } catch (error) {
    console.error('Error en login con Google:', error);
    throw new Error('Error al iniciar sesión con Google: ' + error.message);
  }
};

// Función para hacer logout de Google
export const logoutFromGoogle = async () => {
  try {
    await loadGoogleAPI();
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  } catch (error) {
    console.error('Error en logout de Google:', error);
  }
};
