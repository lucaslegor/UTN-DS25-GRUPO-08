// Configuración global de SweetAlert2
import Swal from 'sweetalert2';

// Configurar mixin global para todos los Swal.fire()
const SwalWithDefaults = Swal.mixin({
  // Configurar altura automática
  heightAuto: false,
  // Backdrop con blur
  backdrop: true,
  // Prevenir que se cierre accidentalmente
  allowOutsideClick: false,
  allowEscapeKey: true,
  // Clases personalizadas para z-index alto
  customClass: {
    container: 'swal2-high-z-index'
  }
});

// Función helper que previene scroll del body
const originalFire = SwalWithDefaults.fire.bind(SwalWithDefaults);
SwalWithDefaults.fire = function(config) {
  // Prevenir scroll del body cuando se abre
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  
  const result = originalFire(config);
  
  // Restaurar scroll cuando se cierra
  if (result && typeof result.then === 'function') {
    result.finally(() => {
      document.body.style.overflow = originalOverflow;
    });
  } else {
    setTimeout(() => {
      document.body.style.overflow = originalOverflow;
    }, 100);
  }
  
  return result;
};

// Exportar Swal configurado
export default SwalWithDefaults;

