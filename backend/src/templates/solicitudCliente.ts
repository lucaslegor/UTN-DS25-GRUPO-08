import { EMAIL_CONFIG } from '../config/email.config';

export function renderSolicitudClienteTemplate(nombre: string, idSolicitud: string, estado: string) {
  const urls = EMAIL_CONFIG.getUrls();
  
  const mensajes: Record<string, string> = {
    CREADA: 'Recibimos tu solicitud correctamente. Nuestro equipo la revisará y te informaremos cualquier novedad.',
    PENDIENTE_POLIZA: 'Tu solicitud fue revisada y está pendiente de carga de la póliza. Te avisaremos cuando esté disponible.',
    POLIZA_CARGADA: 'La póliza ya fue cargada y está lista para que la revises desde tu cuenta.',
    APROBADA: 'Tu solicitud fue aprobada. Gracias por confiar en Maps Seguros.',
    RECHAZADA: 'Tu solicitud fue rechazada. Revisá los datos y volvé a intentarlo.',
    CANCELADA: 'Tu solicitud fue cancelada. Si fue un error, podés generar una nueva solicitud cuando quieras.',
  };

  const colorEstado =
    estado === 'APROBADA' ? '#2e7d32' :
    estado === 'RECHAZADA' ? '#c62828' :
    estado === 'CANCELADA' ? '#9e9e9e' :
    estado === 'POLIZA_CARGADA' ? '#3d6de2' :
    estado === 'PENDIENTE_POLIZA' ? '#f9a825' :
    '#3d6de2';

  return `
  <div style="font-family: Arial, sans-serif; background-color:#f4f6fb; padding:40px 0; text-align:center;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      
      <!-- Banner -->
      <div style="background-color:#3d6de2; color:#ffffff; padding:16px 0; font-size:22px; font-weight:bold;">
        MAPS SEGUROS
      </div>

      <div style="padding:32px 24px;">
        <h2 style="color:#3d6de2; text-align:center;">Actualización de tu solicitud</h2>

        <p style="color:#333; font-size:16px; line-height:1.6; text-align:center;">
          Hola ${nombre},<br>
          tu solicitud <strong>#${idSolicitud}</strong> cambió su estado a 
          <strong style="color:${colorEstado};">${estado.replace('_', ' ')}</strong>.
        </p>

        <p style="color:#333; font-size:16px; text-align:center;">
          ${mensajes[estado] || 'Revisá tu cuenta para más información.'}
        </p>

        <div style="text-align:center; margin:30px 0;">
          <a href="${urls}"
            style="background-color:#3d6de2; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:bold;">
            Ver mi solicitud
          </a>
        </div>

        <p style="color:#666; font-size:14px; text-align:center;">
          El equipo de <strong>Maps Seguros</strong>
        </p>
      </div>
    </div>
  </div>
  `;
}