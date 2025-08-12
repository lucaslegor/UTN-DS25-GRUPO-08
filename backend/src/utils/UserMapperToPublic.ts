import { Usuario, UsuarioPublic } from "../types/usuarios.types";

export function toUsuarioPublic(u: Usuario): UsuarioPublic {
  return {
    idUsuario: u.idUsuario,
    username: u.username,
    rol: u.rol,
    createdAt: u.createdAt
  };
}

//La utilizo para no correr riesgo de mostrar datos sensibles entonces transformo todos los usuarios a publicos