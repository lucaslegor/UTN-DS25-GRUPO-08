export function renderSolicitudEquipoTemplate(nombreCliente: string, idSolicitud: string, estado: string) {
  const mensajes: Record<string, string> = {
    CREADA: 'Se registró una nueva solicitud que requiere revisión.',
    PENDIENTE_POLIZA: 'Una solicitud fue marcada como pendiente de carga de póliza. Coordiná con el área correspondiente.',
    POLIZA_CARGADA: 'Una póliza fue cargada. Verificá que los datos sean correctos y notificá al cliente si corresponde.',
    APROBADA: 'Una solicitud fue aprobada correctamente.',
    RECHAZADA: 'Una solicitud fue rechazada. Confirmá si se notificó correctamente al cliente.',
    CANCELADA: 'Una solicitud fue cancelada. Revisá si corresponde registrar observaciones internas.',
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
        MAPS SEGUROS — EQUIPO INTERNO
      </div>

      <div style="padding:32px 24px;">
        <h2 style="color:#3d6de2; text-align:center;">${estado === 'CREADA' ? 'Nueva solicitud recibida' : 'Cambio de estado de solicitud'}</h2>

        <p style="color:#333; font-size:16px; line-height:1.6; text-align:center;">
          El cliente <strong>${nombreCliente}</strong> tiene una solicitud <strong>#${idSolicitud}</strong> con estado 
          <strong style="color:${colorEstado};">${estado.replace('_', ' ')}</strong>.
        </p>

        <p style="color:#333; font-size:16px; text-align:center;">
          ${mensajes[estado] || ''}
        </p>

        <div style="text-align:center; margin:30px 0;">
          <a href="https://utn-ds-25-grupo-08.vercel.app/"
            style="background-color:#3d6de2; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:bold;">
            Revisar solicitud
          </a>
        </div>

        <p style="color:#666; font-size:14px; text-align:center;">
          Sistema automático de <strong>Maps Seguros</strong>
        </p>
      </div>
    </div>
  </div>
  `;
}
