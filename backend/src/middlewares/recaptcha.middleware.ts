import { Request, Response, NextFunction } from 'express';
import { verifyRecaptcha } from '../services/recaptcha.service';

export async function validateRecaptcha(req: Request, res: Response, next: NextFunction) {
  const recaptchaToken = req.body.recaptchaToken;
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const skipRecaptchaInDev = process.env.SKIP_RECAPTCHA_IN_DEV === 'true';

  if (isDevelopment && skipRecaptchaInDev) {
    console.warn('⚠️  reCAPTCHA validation skipped in development mode');
    return next();
  }

  if (!recaptchaToken) {
    return res.status(400).json({
      message: 'reCAPTCHA token es requerido',
    });
  }

  const isValid = await verifyRecaptcha(recaptchaToken);

  if (!isValid) {
    return res.status(400).json({
      message: 'reCAPTCHA verification failed. Por favor, intenta nuevamente.',
    });
  }

  next();
}

