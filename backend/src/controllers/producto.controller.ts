
import { Request, Response, NextFunction} from 'express';
import {ProductResponse, ProductsListResponse, UpdateProductRequest, CreateProductRequest } from "../types/productos.types";
import * as productService from '../services/producto.service';

export const getProductById = async(req: Request<{id: string}>, res: Response<ProductResponse>, next: NextFunction): Promise<void> => {
    try {
        const product = await productService.getProductById(parseInt(req.params.id));

        if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' } as ProductResponse);
        return;
        }
        
        res.status(200).json({product, message: 'Producto encontrado exitosamente'});
    } catch (error) {
        next(error);
    }
}

export const getAllProducts = async(req: Request, res: Response<ProductsListResponse>, next: NextFunction): Promise<void> => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({products, total: products.length})
    } catch (error) {
        next(error)
    }
}

export const createProduct = async(req: Request, res: Response<ProductResponse>, next: NextFunction): Promise<void> => {
    try {
        const body = req.body as any;
        const file = (req as any).file as Express.Multer.File | undefined;
        const base = process.env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
        const imagenUrl = file ? `${base}/uploads/productos/${file.filename}` : undefined;
        const product = await productService.createProduct({
          titulo: body.titulo,
          descripcion: body.descripcion,
          cobertura: body.cobertura,
          tipo: body.tipo,
          isActive: body.isActive !== undefined ? body.isActive === 'true' || body.isActive === true : true,
          imagenUrl,
        } as any);
        res.status(201).json({product, message: 'Producto creado exitosamente'});
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async(req: Request<{id: string}, ProductResponse, UpdateProductRequest>, res: Response<ProductResponse>, next: NextFunction): Promise<void> => {
    try {
        const body = req.body as any;
        const file = (req as any).file as Express.Multer.File | undefined;
        const base = process.env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
        const imagenUrl = file ? `${base}/uploads/productos/${file.filename}` : undefined;
        
        const updateData = {
          titulo: body.titulo,
          descripcion: body.descripcion,
          cobertura: body.cobertura,
          tipo: body.tipo,
          isActive: body.isActive !== undefined ? body.isActive === 'true' || body.isActive === true : undefined,
          imagenUrl,
        };
        
        // Filtrar campos undefined
        const filteredData = Object.fromEntries(
          Object.entries(updateData).filter(([_, v]) => v !== undefined)
        );

        const product = await productService.updateProduct(Number(req.params.id), filteredData as any);

        if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' } as ProductResponse);
        return;
        }

        res.status(200).json({product, message: 'Producto actualizado exitosamente'});
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async(req: Request<{id: string}>, res: Response<ProductResponse>, next: NextFunction): Promise<void> => {
    try {
        const product = await productService.deleteProduct(Number(req.params.id));
        res.status(204).json({product, message: 'Producto eliminado exitosamente'});
    } catch (error) {
        next(error);
    }
}