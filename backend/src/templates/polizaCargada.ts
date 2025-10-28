import { EMAIL_CONFIG } from '../config/email.config';

export function renderPolizaCargadaTemplate(nombre: string, numeroPoliza: string) {
  const urls = EMAIL_CONFIG.getUrls();
  
    return `
    <div style="font-family: Arial, sans-serif; background-color:#f4f6fb; padding:40px 0; text-align:center;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        
        <!-- Banner -->
        <div style="background-color:#3d6de2; color:#ffffff; padding:16px 0; font-size:22px; font-weight:bold;">
          MAPS SEGUROS
        </div>
  
        <div style="padding:32px 24px;">
          <h2 style="color:#3d6de2; text-align:center;">Tu póliza fue cargada</h2>
  
          <p style="color:#333; font-size:16px; line-height:1.6; text-align:center;">
            Hola ${nombre},<br>
            Tu póliza <strong>#${numeroPoliza}</strong> fue cargada correctamente y ya está disponible para que la revises.
          </p>
  
          <p style="color:#333; font-size:16px; text-align:center;">
            Podés revisarla o descargar la documentación desde tu cuenta en nuestro portal.
          </p>
  
          <div style="text-align:center; margin:30px 0;">
            <a href="${urls}"
              style="background-color:#3d6de2; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:bold;">
              Ver mi póliza
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
  