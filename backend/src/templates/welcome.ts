import { EMAIL_CONFIG } from '../config/email.config';

export function renderWelcomeTemplate(nombre: string) {
  const urls = EMAIL_CONFIG.getUrls();
  
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f4f6fb; padding:40px 0; text-align:center;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      
      <!-- Banner superior -->
      <div style="background-color:#3d6de2; color:#ffffff; padding:16px 0; font-size:22px; font-weight:bold;">
        MAPS SEGUROS
      </div>

      <!-- Contenido principal -->
      <div style="padding:32px 24px; text-align:left;">
        <h2 style="color:#3d6de2; text-align:center;">¡Bienvenido, ${nombre}!</h2>
        <p style="color:#333333; font-size:16px; line-height:1.6; text-align:center;">
          Tu cuenta fue creada correctamente. Ya podés acceder a tu panel personal y gestionar tus pólizas.
        </p>

        <div style="text-align:center; margin:32px 0;">
          <a href="${urls}"
            style="background-color:#3d6de2; color:#ffffff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:bold;">
            Ir a mi cuenta
          </a>
        </div>

        <p style="color:#666666; font-size:14px; text-align:center;">
          Gracias por confiar en nosotros.<br>El equipo de <strong>Maps Seguros</strong>
        </p>
      </div>
    </div>
  </div>
  `;
}