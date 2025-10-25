import { OAuth2Client } from 'google-auth-library';
import prisma from '../config/prisma';
import { signAccessToken, signRefreshToken } from './auth.service';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID || '97231523973-8e1t3mtomvcg8qvns035tdfdcalem9vt.apps.googleusercontent.com',
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture?: string;
  verified_email: boolean;
}

export async function verifyGoogleToken(token: string): Promise<GoogleUserInfo> {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Token inválido');
    }

    console.log('Google token verificado para:', payload.email);

    return {
      id: payload.sub,
      email: payload.email!,
      name: payload.name!,
      picture: payload.picture,
      verified_email: payload.email_verified || false,
    };
  } catch (error) {
    console.error('Error verificando token de Google:', error);
    throw new Error('Token de Google inválido');
  }
}

export async function findOrCreateGoogleUser(googleUser: GoogleUserInfo) {
  // Buscar usuario existente por email
  let user = await prisma.usuario.findUnique({
    where: { mail: googleUser.email.toLowerCase() }
  });

  if (!user) {
    // Crear nuevo usuario si no existe
    user = await prisma.usuario.create({
      data: {
        username: googleUser.email.split('@')[0], // Usar parte del email como username
        mail: googleUser.email.toLowerCase(),
        passwordHash: '', // No necesitamos password para OAuth
        rol: 'USUARIO',
      }
    });
  }

  // Generar tokens
  const payload = {
    id: user.id,
    email: user.mail,
    role: user.rol as 'USUARIO' | 'ADMINISTRADOR',
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const { passwordHash, ...safeUser } = user;
  
  return {
    user: safeUser,
    token: accessToken,
    refreshToken: refreshToken,
  };
}
