// Google Client ID debe estar configurado en variables de entorno
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!GOOGLE_CLIENT_ID) {
  throw new Error('VITE_GOOGLE_CLIENT_ID no está configurado en las variables de entorno');
}

export const loadGoogleAPI = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.accounts) {
      resolve(window.google);
      return;
    }

    const checkGoogle = () => {
      if (window.google && window.google.accounts) {
        resolve(window.google);
      } else {
        setTimeout(checkGoogle, 100);
      }
    };

    checkGoogle();
  });
};

export const loginWithGoogle = async () => {
  try {
    await loadGoogleAPI();
    
    if (!window.google || !window.google.accounts) {
      throw new Error('Google Identity Services no está disponible');
    }
    
    return new Promise((resolve, reject) => {
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
        .google-login-modal {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          padding: 30px;
          min-width: 350px;
          max-width: 400px;
          text-align: center;
          position: relative;
          animation: slideIn 0.3s ease-out;
        }
        .google-login-modal h3 {
          margin: 0 0 20px 0;
          color: #333;
          font-size: 18px;
        }
        .google-login-close-btn {
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
        }
        .google-login-close-btn:hover {
          color: #333;
        }
      `;
      document.head.appendChild(style);

      // Crear elementos de forma segura (sin innerHTML)
      modal.className = 'google-login-modal';

      const h3 = document.createElement('h3');
      h3.textContent = 'Iniciar sesión con Google';
      modal.appendChild(h3);

      const buttonContainer = document.createElement('div');
      buttonContainer.id = 'google-signin-button';
      modal.appendChild(buttonContainer);

      const closeBtn = document.createElement('button');
      closeBtn.id = 'close-google-modal';
      closeBtn.className = 'google-login-close-btn';
      closeBtn.textContent = '×';
      closeBtn.setAttribute('aria-label', 'Cerrar');
      modal.appendChild(closeBtn);

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          document.body.removeChild(overlay);
          document.head.removeChild(style);
          resolve(response.credential);
        },
        auto_select: false,
        cancel_on_tap_outside: false
      });

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

      const closeModal = () => {
        document.body.removeChild(overlay);
        document.head.removeChild(style);
        reject(new Error('Login con Google cancelado'));
      };

      document.getElementById('close-google-modal').onclick = closeModal;
      overlay.onclick = (e) => {
        if (e.target === overlay) closeModal();
      };

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);

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
