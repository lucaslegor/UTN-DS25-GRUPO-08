import { Resend } from 'resend';
import { renderWelcomeTemplate } from '../templates/welcome';
import { renderResetPasswordTemplate } from '../templates/resetPassword';
import { renderSolicitudClienteTemplate } from '../templates/solicitudCliente';
import { renderSolicitudEquipoTemplate } from '../templates/solicitudEquipo';
import { renderPolizaCargadaTemplate } from '../templates/polizaCargada';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM || 'Maps Seguros <onboarding@resend.dev>';
const EQUIPO_MAIL = 'equipo@mapsseguros.com'; // Cambiá este por el real del equipo

// ========== Base ==========
async function enviarEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  try {
    const data = await resend.emails.send({ from: FROM, to, subject, html });
    console.log('📧 Email enviado:', data);
    return data;
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    throw error;
  }
}

// ========== Bienvenida ==========
export async function enviarBienvenida(nombre: string, email: string) {
  await enviarEmail({
    to: email,
    subject: '¡Bienvenido a Maps Seguros!',
    html: renderWelcomeTemplate(nombre),
  });
}

// ========== Recupero ==========
export async function enviarRecupero(email: string, link: string) {
  await enviarEmail({
    to: email,
    subject: 'Restablecé tu contraseña - Maps Seguros',
    html: renderResetPasswordTemplate(link),
  });
}

// ========== Notificación de solicitud (Cliente + Equipo) ==========
export async function enviarNotificacionSolicitud(
  emailCliente: string,
  nombreCliente: string,
  idSolicitud: string,
  estado: string
) {
  // Cliente
  await enviarEmail({
    to: emailCliente,
    subject: `Actualización de tu solicitud - ${estado}`,
    html: renderSolicitudClienteTemplate(nombreCliente, idSolicitud, estado),
  });

  // Equipo interno
  await enviarEmail({
    to: EQUIPO_MAIL,
    subject: `Solicitud (${estado}) - Cliente ${nombreCliente}`,
    html: renderSolicitudEquipoTemplate(nombreCliente, idSolicitud, estado),
  });
}

// ========== Notificación de póliza cargada ==========
export async function enviarNotificacionPolizaCargada(
  emailCliente: string,
  nombreCliente: string,
  numeroPoliza: string
) {
  await enviarEmail({
    to: emailCliente,
    subject: 'Tu póliza fue cargada - Maps Seguros',
    html: renderPolizaCargadaTemplate(nombreCliente, numeroPoliza),
  });
}
