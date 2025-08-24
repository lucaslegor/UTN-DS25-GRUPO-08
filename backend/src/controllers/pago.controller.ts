import { Request, Response, NextFunction} from 'express';
import { CrearPagoRequest, CrearPagoResponse, UpdatePagoRequest, UpdatePagoEstadoRequest, PagoResponse, PagosListResponse } from "../types/pago.types";
import * as pagoService from '../services/pago.service';

export const getPagoById = async(req: Request<{id: string}>, res: Response<PagoResponse>, next: NextFunction): Promise<void> => {
    try {
        const pago = await pagoService.getPagoById(parseInt(req.params.id));

        if (!pago) {
        res.status(404).json({ message: 'Pago no encontrado' } as PagoResponse);
        return;
        }
        
        res.status(200).json({pago, message: 'Pago encontrado exitosamente'});
    } catch (error) {
        next(error);
    }
}

export const getAllPagos = async(req: Request, res: Response<PagosListResponse>, next: NextFunction): Promise<void> => {
    try {
        const pagos = await pagoService.getAllPagos();
        res.status(200).json({pagos, total: pagos.length})
    } catch (error) {
        next(error)
    }
}

export const getPagosByPedido = async(req: Request<{idPedido: string}>, res: Response<PagosListResponse>, next: NextFunction): Promise<void> => {
    try {
        const pagos = await pagoService.getPagosByPedido(parseInt(req.params.idPedido));
        res.status(200).json({pagos, total: pagos.length})
    } catch (error) {
        next(error)
    }
}

export const createPago = async(req: Request<{}, CrearPagoResponse, CrearPagoRequest>, res: Response<CrearPagoResponse>, next: NextFunction): Promise<void> => {
    try {
        const pago = await pagoService.createPago(req.body);
        res.status(201).json({pago, message: 'Pago creado exitosamente'});
    } catch (error) {
        next(error);
    }
}

export const updatePagoEstado = async(req: Request<{id: string}, PagoResponse, UpdatePagoEstadoRequest>, res: Response<PagoResponse>, next: NextFunction): Promise<void> => {
    try {
        const pago = await pagoService.updatePagoEstado(Number(req.params.id), req.body);

        if (!pago) {
        res.status(404).json({ message: 'Pago no encontrado' } as PagoResponse);
        return;
        }

        res.status(200).json({pago, message: 'Estado del pago actualizado exitosamente'});
    } catch (error) {
        next(error);
    }
}

export const updatePago = async(req: Request<{id: string}, PagoResponse, UpdatePagoRequest>, res: Response<PagoResponse>, next: NextFunction): Promise<void> => {
    try {
        const pago = await pagoService.updatePago(Number(req.params.id), req.body);

        if (!pago) {
        res.status(404).json({ message: 'Pago no encontrado' } as PagoResponse);
        return;
        }

        res.status(200).json({pago, message: 'Pago actualizado exitosamente'});
    } catch (error) {
        next(error);
    }
}

export const deletePago = async(req: Request<{id: string}>, res: Response<PagoResponse>, next: NextFunction): Promise<void> => {
    try {
        const pago = await pagoService.deletePago(Number(req.params.id));
        res.status(200).json({pago, message: 'Pago eliminado exitosamente'});
    } catch (error) {
        next(error);
    }
}

export const procesarWebhook = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await pagoService.procesarWebhookMercadoPago(req.body);
        res.status(200).json({message: 'Webhook procesado exitosamente'});
    } catch (error) {
        next(error);
    }
}
