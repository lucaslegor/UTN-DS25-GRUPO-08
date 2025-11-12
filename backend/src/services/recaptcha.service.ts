import axios from 'axios';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

if (!RECAPTCHA_SECRET_KEY) {
  console.warn('RECAPTCHA_SECRET_KEY no está definida en las variables de entorno');
}

export interface RecaptchaVerificationResult {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const skipRecaptchaInDev = process.env.SKIP_RECAPTCHA_IN_DEV === 'true';

  if (isDevelopment && skipRecaptchaInDev && token === 'dev-bypass-token') {
    console.warn('⚠️  reCAPTCHA verification bypassed in development mode');
    return true;
  }

  if (!RECAPTCHA_SECRET_KEY) {
    console.error('RECAPTCHA_SECRET_KEY no está configurada');
    return false;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await axios.post<RecaptchaVerificationResult>(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    const { data } = response;

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

