import { Usuario, UsuarioPublic, Rol } from "../types/usuarios.types";
import { toUsuarioPublic } from "../utils/UserMapperToPublic";

// Base de datos simulada
let usuarios: Usuario[] = [
  {
    idUsuario: 1,
    username: "admin",
    passwordHash: "hash:admin123", // Ejemplo, en real usar bcrypt
    rol: "Administrador",
    createdAt: new Date("2025-01-10T10:00:00Z")
  },
  {
    idUsuario: 2,
    username: "juanperez",
    passwordHash: "hash:juan123",
    rol: "Usuario",
    createdAt: new Date("2025-02-15T14:30:00Z")
  },
  {
    idUsuario: 3,
    username: "maria",
    passwordHash: "hash:maria123",
    rol: "Usuario",
    createdAt: new Date("2025-03-01T09:15:00Z")
  }
];

let nextId = usuarios.length + 1;

export { usuarios, nextId };


export const listarUsuarios = (): UsuarioPublic[] => {
  return usuarios.map(toUsuarioPublic);
}

export const obtenerUsuarioPorId = (id: number): UsuarioPublic | null => {
  const usuario = usuarios.find(u => u.idUsuario === id);
  return usuario ? toUsuarioPublic(usuario) : null;
}

export function crearUsuario(username: string, passwordHash: string, rol: Rol = "Usuario"): UsuarioPublic {
  if (usuarios.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error("El nombre de usuario ya existe");
  }
  const nuevo: Usuario = {
    idUsuario: nextId++,
    username,
    passwordHash,
    rol,
    createdAt: new Date()
  };
  usuarios.push(nuevo);
  return toUsuarioPublic(nuevo);
}

export function actualizarUsuario(
  username: string,
  data: Partial<Omit<Usuario, "idUsuario" | "createdAt">> ): UsuarioPublic | null {
    //Con el Omit OMITO los campos especificados 
    //Con el Partial hago que los campos restantes sean opcionales
  const usuario = usuarios.find(u => u.username === username);
  if (!usuario) return null;

  const actualizado: Usuario = { ...usuario, ...data };

  usuarios = usuarios.map(u =>
    u.username === username ? actualizado : u
  );

  return toUsuarioPublic(actualizado);
}


export function eliminarUsuario(id: number): UsuarioPublic | null {
  const usuario = usuarios.find(u => u.idUsuario === id);
  if (!usuario) return null;
  usuarios = usuarios.filter(u => u.idUsuario !== id);
  return toUsuarioPublic(usuario);
}