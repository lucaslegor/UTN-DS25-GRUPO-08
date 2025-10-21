import { PrismaClient } from "../generated/prisma";
import { Solicitud, CrearSolicitudRequest, EstadoSolicitud } from "../types/solicitudes.types";

const prisma = new PrismaClient();

// Mapear fila de BD a objeto Solicitud
function mapRowToSolicitud(row: any): Solicitud {
  console.log('mapRowToSolicitud: Procesando fila:', {
    id: row.id,
    idUsuario: row.idUsuario,
    estado: row.estado,
    hasUsuario: !!row.usuario,
    hasItems: !!row.items,
    itemsCount: row.items?.length || 0
  });
  
  const result = {
    id: row.id,
    idUsuario: row.idUsuario,
    estado: row.estado,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    items: row.items?.map((item: any) => ({
      idProducto: item.idProducto,
      titulo: item.titulo,
      cantidad: item.cantidad,
    })) || [],
    poliza: row.poliza ? {
      id: row.poliza.id,
      archivoUrl: row.poliza.archivoUrl,
      estado: row.poliza.estado,
      createdAt: row.poliza.createdAt,
      updatedAt: row.poliza.updatedAt,
    } : undefined,
    datosPersonales: row.datosPersonales || undefined,
    notaRechazo: row.notaRechazo || undefined,
    usuario: row.usuario ? {
      id: row.usuario.id,
      username: row.usuario.username,
      mail: row.usuario.mail,
    } : undefined,
  };
  
  console.log('mapRowToSolicitud: Resultado mapeado:', {
    id: result.id,
    idUsuario: result.idUsuario,
    estado: result.estado,
    hasUsuario: !!result.usuario,
    itemsCount: result.items.length
  });
  
  return result;
}

export async function obtenerSolicitudesPorUsuario(idUsuario: number): Promise<Solicitud[]> {
  const rows = await prisma.solicitud.findMany({
    where: { idUsuario },
    include: { 
      items: true, 
      poliza: true,
      usuario: {
        select: {
          id: true,
          username: true,
          mail: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(mapRowToSolicitud);
}

export async function obtenerSolicitudPorId(id: number): Promise<Solicitud | null> {
  const row = await prisma.solicitud.findUnique({
    where: { id },
    include: { 
      items: true, 
      poliza: true,
      usuario: {
        select: {
          id: true,
          username: true,
          mail: true,
        },
      },
    },
  });
  return row ? mapRowToSolicitud(row) : null;
}

export async function crearSolicitud(
  idUsuario: number,
  data: CrearSolicitudRequest
): Promise<Solicitud> {
  const ids = data.items.map(i => i.productId);
  const productos = await prisma.producto.findMany({
    where: { id: { in: ids } },
  });
  if (productos.length !== ids.length) {
    const notFound = ids.filter(id => !productos.find(p => p.id === id));
    throw new Error(`Productos inexistentes: ${notFound.join(", ")}`);
  }

  const itemsToCreate = productos.map(p => {
    const cant = data.items.find(i => i.productId === p.id)?.cantidad ?? 1;
    return {
      idProducto: p.id,
      titulo: p.titulo,
      cantidad: cant,
    };
  });

  const created = await prisma.solicitud.create({
    data: {
      idUsuario,
      estado: "CREADA",
      datosPersonales: data.datosPersonales || undefined,
      items: {
        create: itemsToCreate.map(it => ({
          idProducto: it.idProducto,
          titulo: it.titulo,
          cantidad: it.cantidad,
        })),
      },
    },
    include: { 
      items: true, 
      poliza: true,
      usuario: {
        select: {
          id: true,
          username: true,
          mail: true,
        },
      },
    },
  });

  return mapRowToSolicitud(created);
}

type ActualizarSolicitudRequest = {
  estado?: EstadoSolicitud;
  items?: { productId: number; cantidad?: number }[];
};

export async function actualizarSolicitud(
  id: number,
  body: ActualizarSolicitudRequest
): Promise<Solicitud | null> {
  if (body.items && body.items.length > 0) {
    const productos = await prisma.producto.findMany({
      where: { id: { in: body.items.map(i => i.productId) } },
    });
    if (productos.length !== body.items.length) {
      const notFound = body.items
        .map(i => i.productId)
        .filter(pid => !productos.find(p => p.id === pid));
      throw new Error(`Productos inexistentes: ${notFound.join(", ")}`);
    }

    const itemsToCreate = productos.map(p => {
      const cant = body.items?.find(i => i.productId === p.id)?.cantidad ?? 1;
      return {
        idProducto: p.id,
        titulo: p.titulo,
        cantidad: cant,
      };
    });

    try {
      const updated = await prisma.$transaction(async (tx) => {
        await tx.solicitud.update({ where: { id }, data: {} });

        await tx.solicitudItem.deleteMany({ where: { idSolicitud: id } });
        await tx.solicitudItem.createMany({
          data: itemsToCreate.map(it => ({
            idSolicitud: id,
            idProducto: it.idProducto,
            titulo: it.titulo,
            cantidad: it.cantidad,
          })),
        });

        return await tx.solicitud.update({
          where: { id },
          data: {
            ...(body.estado ? { estado: body.estado } : {}),
            ...(body.notaRechazo ? { notaRechazo: body.notaRechazo } : {}),
          },
          include: { 
            items: true, 
            poliza: true,
            usuario: {
              select: {
                id: true,
                username: true,
                mail: true,
              },
            },
          },
        });
      });

      return mapRowToSolicitud(updated);
    } catch (e: any) {
      if (e.code === "P2025") return null;
      throw e;
    }
  }

  try {
    const updated = await prisma.solicitud.update({
      where: { id },
      data: {
        ...(body.estado ? { estado: body.estado } : {}),
        ...(body.notaRechazo ? { notaRechazo: body.notaRechazo } : {}),
      },
      include: { 
        items: true, 
        poliza: true,
        usuario: {
          select: {
            id: true,
            username: true,
            mail: true,
          },
        },
      },
    });
    return mapRowToSolicitud(updated);
  } catch (e: any) {
    if (e.code === "P2025") return null;
    throw e;
  }
}

export async function eliminarSolicitud(id: number): Promise<boolean> {
  try {
    await prisma.solicitud.delete({ where: { id } });
    return true;
  } catch (e: any) {
    if (e.code === "P2025") return false;
    throw e;
  }
}

export async function getAllSolicitudes(): Promise<Solicitud[]> {
  console.log('getAllSolicitudes: Iniciando consulta...');
  try {
    // Primero, consulta simple sin includes para ver cuántas hay
    const count = await prisma.solicitud.count();
    console.log('getAllSolicitudes: Total de solicitudes en BD:', count);
    
    const rows = await prisma.solicitud.findMany({
      include: {
        items: true,
        poliza: true,
        usuario: {
          select: {
            id: true,
            username: true,
            mail: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log('getAllSolicitudes: Filas encontradas con includes:', rows.length);
    
    // Log de cada fila individual
    rows.forEach((row, index) => {
      console.log(`getAllSolicitudes: Fila ${index + 1}:`, {
        id: row.id,
        idUsuario: row.idUsuario,
        estado: row.estado,
        hasUsuario: !!row.usuario,
        hasItems: !!row.items,
        itemsCount: row.items?.length || 0,
        createdAt: row.createdAt
      });
    });
    
    const result = rows.map(mapRowToSolicitud);
    console.log('getAllSolicitudes: Resultado mapeado:', result.length);
    
    return result;
  } catch (error) {
    console.error('getAllSolicitudes: Error en consulta:', error);
    throw error;
  }
}
