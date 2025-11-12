
import { Request, Response, NextFunction} from 'express';
import {ProductResponse, ProductsListResponse, UpdateProductRequest, CreateProductRequest } from "../types/productos.types";
import * as productService from '../services/producto.service';
import fs from 'fs';
import prisma from "../config/prisma";
import { uploadLocalFile, deleteByPublicId } from '../services/cloudinary.service';

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
        let imagenUrl: string | undefined = body?.imagenUrl;
        let imagenPublicId: string | undefined;
        if (file) {
          if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            fs.unlink(file.path, () => {});
            res.status(500).json({ 
              message: 'Error: Cloudinary no está configurado. Por favor, configura las variables de entorno CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET.' 
            } as ProductResponse);
            return;
          }
          try {
            const { url, publicId } = await uploadLocalFile(file.path, 'productos', 'image');
            imagenUrl = url;
            imagenPublicId = publicId;
          } catch (uploadError: any) {
            fs.unlink(file.path, () => {});
            res.status(500).json({ 
              message: `Error al subir la imagen: ${uploadError.message || 'Error desconocido'}` 
            } as ProductResponse);
            return;
          }
          fs.unlink(file.path, () => {});
        }
        const product = await productService.createProduct({
          titulo: body.titulo,
          descripcion: body.descripcion,
          cobertura: body.cobertura,
          tipo: body.tipo,
          isActive: body.isActive !== undefined ? body.isActive === 'true' || body.isActive === true : true,
          imagenUrl,
          imagenPublicId,
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
        let imagenUrl: string | undefined = body?.imagenUrl;
        let imagenPublicId: string | undefined;
        let prevPublicId: string | undefined;
        try {
          const prev = await prisma.producto.findUnique({ where: { id: Number(req.params.id) }, select: { imagenPublicId: true } });
          prevPublicId = prev?.imagenPublicId || undefined;
        } catch {}
        if (file) {
          if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            fs.unlink(file.path, () => {});
            res.status(500).json({ 
              message: 'Error: Cloudinary no está configurado. Por favor, configura las variables de entorno CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET.' 
            } as ProductResponse);
            return;
          }
          try {
            const { url, publicId } = await uploadLocalFile(file.path, 'productos', 'image');
            imagenUrl = url;
            imagenPublicId = publicId;
          } catch (uploadError: any) {
            fs.unlink(file.path, () => {});
            res.status(500).json({ 
              message: `Error al subir la imagen: ${uploadError.message || 'Error desconocido'}` 
            } as ProductResponse);
            return;
          }
          fs.unlink(file.path, () => {});
        }

        const updateData = {
          titulo: body.titulo,
          descripcion: body.descripcion,
          cobertura: body.cobertura,
          tipo: body.tipo,
          isActive: body.isActive !== undefined ? body.isActive === 'true' || body.isActive === true : undefined,
          imagenUrl,
          imagenPublicId,
        };
        
        const filteredData = Object.fromEntries(
          Object.entries(updateData).filter(([_, v]) => v !== undefined)
        );

        const product = await productService.updateProduct(Number(req.params.id), filteredData as any);

        if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' } as ProductResponse);
        return;
        }

        if (imagenPublicId && prevPublicId && prevPublicId !== imagenPublicId) {
          try { await deleteByPublicId(prevPublicId); } catch {}
        }

        res.status(200).json({product, message: 'Producto actualizado exitosamente'});
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async(req: Request<{id: string}>, res: Response<ProductResponse>, next: NextFunction): Promise<void> => {
    try {
        const id = Number(req.params.id);
        let prevPublicId: string | undefined;
        try {
          const prev = await prisma.producto.findUnique({ where: { id }, select: { imagenPublicId: true } });
          prevPublicId = prev?.imagenPublicId || undefined;
        } catch {}
        const product = await productService.deleteProduct(id);
        res.status(204).json({product, message: 'Producto eliminado exitosamente'});
        if (prevPublicId) {
          try { await deleteByPublicId(prevPublicId); } catch {}
        }
    } catch (error) {
        next(error);
    }
}
