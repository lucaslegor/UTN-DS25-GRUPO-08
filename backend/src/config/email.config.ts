// backend/src/config/email.config.ts
export const EMAIL_CONFIG = {
  getUrls() {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return {
      base: baseUrl,
      login: `${baseUrl}/login`,
      dashboard: `${baseUrl}/dashboard`,
      solicitudes: `${baseUrl}/solicitudes`,
      polizas: `${baseUrl}/polizas`,
    };
  }
};