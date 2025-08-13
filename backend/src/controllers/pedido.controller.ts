import { Request, Response, NextFunction } from "express";
import { 
  Pedido, 
  EstadoPedido, 
  CrearPedidoRequest, 
  PedidoResponse, 
  PedidosListResponse 
} from "../types/pedidos.types";
import {
  listarPedidos,
  obtenerPedidoPorId,
  obtenerPedidosPorUsuario,
  crearPedido,
  actualizarEstadoPedido,
  agregarPolizaAPedido,
  eliminarPedido,
  obtenerPedidosPorEstado,
  obtenerEstadisticasPedidos
} from '../services/pedidos.service';

// GET /api/pedidos - Listar todos los pedidos
export const getPedidos = (req: Request, res: Response) => {
  try {
    const resultado: PedidosListResponse = listarPedidos();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ 
      pedidos: [], 
      total: 0, 
      message: "Error al obtener pedidos" 
    });
  }
};

// GET /api/pedidos/:id - Obtener pedido por ID
export const getPedidoById = (req: Request<{ id: string }>, res: Response) => {
  try {
    const idPedido = Number(req.params.id);
    if (isNaN(idPedido)) {
      return res.status(400).json({ 
        pedido: null, 
        message: "ID de pedido inválido" 
      });
    }

    const pedido = obtenerPedidoPorId(idPedido);
    if (!pedido) {
      return res.status(404).json({ 
        pedido: null, 
        message: "Pedido no encontrado" 
      });
    }

    res.json({ pedido });
  } catch (error) {
    res.status(500).json({ 
      pedido: null, 
      message: "Error al obtener pedido" 
    });
  }
};

// GET /api/pedidos/usuario/:idUsuario - Obtener pedidos por usuario
export const getPedidosByUsuario = (req: Request<{ idUsuario: string }>, res: Response) => {
  try {
    const idUsuario = Number(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ 
        pedidos: [], 
        message: "ID de usuario inválido" 
      });
    }

    const pedidos = obtenerPedidosPorUsuario(idUsuario);
    res.json({ 
      pedidos, 
      total: pedidos.length 
    });
  } catch (error) {
    res.status(500).json({ 
      pedidos: [], 
      message: "Error al obtener pedidos del usuario" 
    });
  }
};

// GET /api/pedidos/estado/:estado - Obtener pedidos por estado
export const getPedidosByEstado = (req: Request<{ estado: EstadoPedido }>, res: Response) => {
  try {
    const { estado } = req.params;
    
    // Validar que el estado sea válido
    const estadosValidos: EstadoPedido[] = [
      'CREADO', 'PENDIENTE_POLIZA', 'POLIZA_CARGADA', 
      'PAGO_PENDIENTE', 'PAGO_APROBADO', 'PAGO_RECHAZADO', 'CANCELADO'
    ];
    
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ 
        pedidos: [], 
        message: "Estado de pedido inválido" 
      });
    }

    const pedidos = obtenerPedidosPorEstado(estado);
    res.json({ 
      pedidos, 
      total: pedidos.length 
    });
  } catch (error) {
    res.status(500).json({ 
      pedidos: [], 
      message: "Error al obtener pedidos por estado" 
    });
  }
};

// POST /api/pedidos - Crear nuevo pedido
export const createPedido = async (
  req: Request<{}, {}, CrearPedidoRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { items, moneda } = req.body;
    const idUsuario = req.body.idUsuario; // En un caso real, esto vendría del token JWT

    // Validaciones básicas
    if (!items || items.length === 0) {
      return res.status(400).json({ 
        pedido: null, 
        message: "El pedido debe contener al menos un item" 
      });
    }

    if (!idUsuario) {
      return res.status(400).json({ 
        pedido: null, 
        message: "ID de usuario requerido" 
      });
    }

    if (moneda !== 'ARS') {
      return res.status(400).json({ 
        pedido: null, 
        message: "Solo se acepta moneda ARS" 
      });
    }

    const nuevoPedido = crearPedido(idUsuario, { items, moneda });
    
    res.status(201).json({ 
      pedido: nuevoPedido, 
      message: "Pedido creado exitosamente" 
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ 
        pedido: null, 
        message: error.message 
      });
    } else {
      next(error);
    }
  }
};

// PUT /api/pedidos/:id/estado - Actualizar estado del pedido
export const updatePedidoEstado = async (
  req: Request<{ id: string }, {}, { estado: EstadoPedido }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const idPedido = Number(req.params.id);
    const { estado } = req.body;

    if (isNaN(idPedido)) {
      return res.status(400).json({ 
        pedido: null, 
        message: "ID de pedido inválido" 
      });
    }

    if (!estado) {
      return res.status(400).json({ 
        pedido: null, 
        message: "Estado requerido" 
      });
    }

    const pedidoActualizado = actualizarEstadoPedido(idPedido, estado);
    if (!pedidoActualizado) {
      return res.status(404).json({ 
        pedido: null, 
        message: "Pedido no encontrado" 
      });
    }

    res.json({ 
      pedido: pedidoActualizado, 
      message: "Estado del pedido actualizado" 
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ 
        pedido: null, 
        message: error.message 
      });
    } else {
      next(error);
    }
  }
};

// PUT /api/pedidos/:id/poliza - Agregar póliza al pedido
export const addPolizaToPedido = async (
  req: Request<{ id: string }, {}, { poliza: any }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const idPedido = Number(req.params.id);
    const { poliza } = req.body;

    if (isNaN(idPedido)) {
      return res.status(400).json({ 
        pedido: null, 
        message: "ID de pedido inválido" 
      });
    }

    if (!poliza) {
      return res.status(400).json({ 
        pedido: null, 
        message: "Datos de póliza requeridos" 
      });
    }

    const pedidoActualizado = agregarPolizaAPedido(idPedido, poliza);
    if (!pedidoActualizado) {
      return res.status(404).json({ 
        pedido: null, 
        message: "Pedido no encontrado" 
      });
    }

    res.json({ 
      pedido: pedidoActualizado, 
      message: "Póliza agregada al pedido" 
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ 
        pedido: null, 
        message: error.message 
      });
    } else {
      next(error);
    }
  }
};

// DELETE /api/pedidos/:id - Eliminar pedido
export const deletePedido = (req: Request<{ id: string }>, res: Response) => {
  try {
    const idPedido = Number(req.params.id);
    
    if (isNaN(idPedido)) {
      return res.status(400).json({ 
        message: "ID de pedido inválido" 
      });
    }

    const pedidoEliminado = eliminarPedido(idPedido);
    if (!pedidoEliminado) {
      return res.status(404).json({ 
        message: "Pedido no encontrado" 
      });
    }

    res.json({ 
      pedido: pedidoEliminado, 
      message: "Pedido eliminado exitosamente" 
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ 
        message: error.message 
      });
    } else {
      res.status(500).json({ 
        message: "Error al eliminar pedido" 
      });
    }
  }
};

// GET /api/pedidos/estadisticas - Obtener estadísticas de pedidos
export const getEstadisticasPedidos = (req: Request, res: Response) => {
  try {
    const estadisticas = obtenerEstadisticasPedidos();
    res.json(estadisticas);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener estadísticas" 
    });
  }
};

// PUT /api/pedidos/:id - Actualizar pedido completo (opcional)
export const updatePedido = async (
  req: Request<{ id: string }, {}, Partial<CrearPedidoRequest>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const idPedido = Number(req.params.id);
    const { items, moneda } = req.body;

    if (isNaN(idPedido)) {
      return res.status(400).json({ 
        pedido: null, 
        message: "ID de pedido inválido" 
      });
    }

    // Verificar que el pedido existe
    const pedidoExistente = obtenerPedidoPorId(idPedido);
    if (!pedidoExistente) {
      return res.status(404).json({ 
        pedido: null, 
        message: "Pedido no encontrado" 
      });
    }

    // Solo permitir actualizar pedidos en estado CREADO
    if (pedidoExistente.estado !== 'CREADO') {
      return res.status(400).json({ 
        pedido: null, 
        message: "Solo se pueden actualizar pedidos en estado CREADO" 
      });
    }

    // Crear un nuevo pedido con los datos actualizados
    const idUsuario = pedidoExistente.idUsuario;
    const nuevoPedido = crearPedido(idUsuario, { 
      items: items || pedidoExistente.items.map(item => ({ 
        productId: item.productId, 
        cantidad: item.cantidad 
      })), 
      moneda: moneda || pedidoExistente.moneda 
    });

    // Eliminar el pedido anterior
    eliminarPedido(idPedido);

    res.json({ 
      pedido: nuevoPedido, 
      message: "Pedido actualizado exitosamente" 
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ 
        pedido: null, 
        message: error.message 
      });
    } else {
      next(error);
    }
  }
};
