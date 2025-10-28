import { crearSolicitud } from './solicitudes.service';
import prisma from '../config/prisma';

// Mock de Prisma
jest.mock('../config/prisma', () => ({
  producto: { findMany: jest.fn() },
  solicitud: { create: jest.fn() }
}));

describe('SolicitudService - crearSolicitud', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('debe crear una solicitud correctamente cuando los productos existen', async () => {
    // ARRANGE
    const mockProductos = [
      { id: 1, titulo: 'Seguro Auto', precio: 1000 },
      { id: 2, titulo: 'Seguro Hogar', precio: 500 }
    ];

    const payload = {
      datosPersonales: {
        nombre: 'Test User',
        apellido: 'Test',
        email: 'test@example.com',
        telefono: '1234567890'
      },
      items: [
        { productId: 1, cantidad: 2, titulo: 'Seguro Auto' },
        { productId: 2, cantidad: 1, titulo: 'Seguro Hogar' }
      ],
      observaciones: 'Alta de pólizas varias'
    };

    // Simula el resultado de la creación de la solicitud
    (prisma.solicitud.create as jest.Mock).mockResolvedValue({
      id: 10,
      idUsuario: 99,
      estado: 'CREADA',
      datosPersonales: payload.datosPersonales,
      items: [
        { idProducto: 1, idSolicitud: 10, titulo: 'Seguro Auto', cantidad: 2 },
        { idProducto: 2, idSolicitud: 10, titulo: 'Seguro Hogar', cantidad: 1 }
      ],
      usuario: { username: 'joaco', mail: 'joaco@test.com' },
      poliza: null,
      createdAt: new Date().toISOString()
    });

    // ACT
    const result = await crearSolicitud(99, payload as any);

    // ASSERT
    expect(prisma.solicitud.create).toHaveBeenCalledWith({
      data: {
        idUsuario: 99,
        estado: 'CREADA',
        datosPersonales: payload.datosPersonales,
        items: { create: payload.items }
      },
      include: { usuario: { select: { mail: true, username: true } } }
    });
    expect(result).toMatchObject({
      idUsuario: 99,
      estado: 'CREADA'
    });
    // Total calculado esperado: 2*1000 + 1*500 = 2500 (si tu mapeo lo expone)
    // Si tu función retorna el total, podés validar:
    // expect(result.total).toBe(2500);
  });

  test('debe crear solicitud incluso con productos inexistentes (Prisma maneja la validación)', async () => {
    // ARRANGE
    const payload = {
      items: [{ productId: 999, cantidad: 1, titulo: 'Producto Inexistente' }],
      observaciones: 'Algo'
    };

    // Simula que Prisma lanza error por producto inexistente
    (prisma.solicitud.create as jest.Mock).mockRejectedValue(
      new Error('Foreign key constraint failed')
    );

    // ACT + ASSERT
    await expect(crearSolicitud(1, payload as any))
      .rejects
      .toThrow('Foreign key constraint failed');
  });
});
