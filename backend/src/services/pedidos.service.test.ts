import { crearPedido } from './pedidos.service';
import prisma from '../config/prisma';

// Mock de Prisma 
jest.mock('../config/prisma', () => ({
  producto: { findMany: jest.fn() },
  pedido: { create: jest.fn() }
}));

describe('PedidoService - crearPedido', () => {
  test('debe crear un pedido correctamente cuando los productos existen', async () => {
    // ARRANGE
    const mockProductos = [
      { id: 1, titulo: 'Seguro Auto', precio: 1000 },
      { id: 2, titulo: 'Seguro Hogar', precio: 500 }
    ];
    const mockData = {
      items: [
        { productId: 1, cantidad: 2 },
        { productId: 2, cantidad: 1 }
      ]
    };

    (prisma.producto.findMany as jest.Mock).mockResolvedValue(mockProductos);
    const mockPedidoCreado = {
      id: 10,
      idUsuario: 99,
      subtotal: 2500,
      total: 2500,
      moneda: 'ARS',
      items: [
        { idProducto: 1, titulo: 'Seguro Auto', precio: 1000, cantidad: 2 },
        { idProducto: 2, titulo: 'Seguro Hogar', precio: 500, cantidad: 1 }
      ],
      poliza: null
    };
    (prisma.pedido.create as jest.Mock).mockResolvedValue(mockPedidoCreado);

    // ACT
    const result = await crearPedido(99, mockData as any);

    // ASSERT
    expect(result.total).toBe(2500);
    expect(result.items).toHaveLength(2);
    expect(prisma.producto.findMany).toHaveBeenCalledWith({
      where: { id: { in: [1, 2] } }
    });
    expect(prisma.pedido.create).toHaveBeenCalled();
  });

  test('debe lanzar error si algún producto no existe', async () => {
    // ARRANGE
    const mockData = {
      items: [{ productId: 999, cantidad: 1 }]
    };
    (prisma.producto.findMany as jest.Mock).mockResolvedValue([]); // No encontró nada

    // ACT+ASSERT
    await expect(crearPedido(1, mockData as any))
      .rejects
      .toThrow('Productos inexistentes: 999');
  });
});
