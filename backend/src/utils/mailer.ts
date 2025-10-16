import nodemailer from "nodemailer";

const host = process.env.EMAIL_HOST!;
const port = Number(process.env.EMAIL_PORT || 465);
const secure = String(process.env.EMAIL_SECURE || "true") === "true";
const user = process.env.EMAIL_USER!;
const pass = process.env.EMAIL_PASS!;
const from = process.env.EMAIL_FROM || process.env.EMAIL_USER!;


export const transporter = nodemailer.createTransport({
  host,
  port,
  secure, // 465 => true, 587 => false
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
  // Opcional: timeouts y debug para ver por qué falla
  connectionTimeout: 20_000, // 20s
  greetingTimeout: 20_000,
  socketTimeout: 30_000,
  logger: true, // log a consola
  debug: true,  // log de SMTP
});

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const info = await transporter.sendMail({
    from,
    to,
    subject: "Restablecer contraseña",
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif">
        <h2>¿Restablecer tu contraseña?</h2>
        <p>Hacé clic en el siguiente botón. El enlace vence en 15 minutos.</p>
        <p>
          <a href="${resetUrl}"
             style="display:inline-block;background:#3d6de2;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">
            Restablecer contraseña
          </a>
        </p>
        <p>Si no fuiste vos, ignorá este mensaje.</p>
      </div>
    `,
  });

  console.log("Email messageId:", info.messageId);
}
