// backend/src/templates/contactoMaps.ts
export function renderContactoMapsTemplate(nombre: string, email: string, mensaje: string) {
  return `
    <div style="font-family: Poppins, sans-serif; background-color: #f9fafb; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 24px;">
        <h2 style="color: #1a237e; text-align: center;">📩 Nuevo mensaje de contacto</h2>
        <p style="font-size: 16px; color: #333;">Hola equipo de <strong>Maps Seguros</strong>, recibieron un nuevo mensaje:</p>
        <div style="background-color: #f4f6f8; border-radius: 8px; padding: 16px; margin-top: 16px;">
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background: white; padding: 12px; border-radius: 6px; border: 1px solid #ddd;">${mensaje}</p>
        </div>
        <p style="font-size: 13px; color: #666; margin-top: 20px;">Este correo fue enviado automáticamente desde el sitio web de Maps Seguros.</p>
      </div>
    </div>
  `;
}
