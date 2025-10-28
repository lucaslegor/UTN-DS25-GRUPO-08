// Configuración de URLs para emails
export const EMAIL_CONFIG = {
  // URLs base para diferentes entornos
  FRONTEND_URLS: {
    development: 'http://localhost:5173',
    production: 'https://utn-ds-25-grupo-08.vercel.app',
    staging: 'https://staging-maps-seguros.vercel.app'
  },
  
  // Determinar entorno automáticamente
  getCurrentUrl(): string {
    const env = process.env.NODE_ENV || 'development';
    return this.FRONTEND_URLS[env as keyof typeof this.FRONTEND_URLS] || this.FRONTEND_URLS.development;
  },
  
  // URLs específicas para cada tipo de email
  getUrls() {
    const baseUrl = this.getCurrentUrl();
    return {
      login: `${baseUrl}/login`,
      dashboard: `${baseUrl}/dashboard`,
      adminSolicitudes: `${baseUrl}/admin/solicitudes`,
      resetPassword: (token: string) => `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`
    };
  }
};
