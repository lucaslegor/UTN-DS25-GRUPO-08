export function renderResetPasswordTemplate(link: string) {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f4f6fb; padding:40px 0; text-align:center;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      
      <!-- Banner superior -->
      <div style="background-color:#3d6de2; color:#ffffff; padding:16px 0; font-size:22px; font-weight:bold;">
        MAPS SEGUROS
      </div>

      <!-- Contenido principal -->
      <div style="padding:32px 24px; text-align:left;">
        <h2 style="color:#3d6de2; text-align:center;">Restablecer contraseÃ±a</h2>
        <p style="color:#333333; font-size:16px; line-height:1.6; text-align:center;">
          Recibimos una solicitud para restablecer tu contraseÃ±a en <strong>Maps Seguros</strong>.
        </p>

        <div style="text-align:center; margin:32px 0;">
          <a href="${link}"
            style="background-color:#3d6de2; color:#ffffff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:bold;">
            Restablecer contraseÃ±a
          </a>
        </div>
        
        <p style="color:#999; font-size:12px; text-align:center; margin-top:20px;">
          Si el botÃ³n no funciona, copiÃ¡ y pegÃ¡ este link en tu navegador:<br>
          <span style="word-break: break-all;">${link}</span>
        </p>

        <p style="color:#666666; font-size:14px; text-align:center;">
          Si no solicitaste este cambio, podÃ©s ignorar este correo.<br>
          El equipo de <strong>Maps Seguros</strong>
        </p>
      </div>
    </div>
  </div>
  `;
}
