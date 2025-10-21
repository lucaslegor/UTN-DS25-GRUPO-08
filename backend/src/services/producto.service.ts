import { Product, CreateProductRequest, UpdateProductRequest} from "../types/productos.types"; 
import { TipoSeguro } from '../types/productos.types'
import prisma from "../config/prisma";
import { Prisma } from "../generated/prisma";

const mockProducts: Product[] = [
  {
    id: 1,
    titulo: "Seguro de Auto Premium",
    descripcion: "Cobertura total contra todo riesgo, incluyendo robo, incendio y granizo.",
    cobertura: "Cobertura total hasta $5.000.000",
    tipo: "auto",
    isActive: true,
    createdAt: new Date("2025-01-15T10:00:00Z"),
  },
  {
    id: 2,
    titulo: "Seguro de Hogar Básico",
    descripcion: "Protección contra incendios y daños por agua en el hogar.",
    cobertura: "Cobertura hasta $2.000.000",
    tipo: "hogar",
    isActive: true,
    createdAt: new Date("2025-02-01T15:30:00Z"),
  },
  {
    id: 3,
    titulo: "Seguro de Vida Familiar",
    descripcion: "Protección económica para tu familia en caso de fallecimiento.",
    cobertura: "Beneficio de $3.000.000",
    tipo: "vida",
    isActive: true,
    createdAt: new Date("2025-02-10T09:15:00Z"),
  },
  {
    id: 4,
    titulo: "Seguro de Salud Premium",
    descripcion: "Cobertura médica completa en clínicas privadas de primer nivel.",
    cobertura: "Cobertura 100% en internaciones y cirugías",
    tipo: "salud",
    isActive: false,
    createdAt: new Date("2025-03-05T18:00:00Z"),
  },
  {
    id: 5,
    titulo: "Seguro de Auto Económico",
    descripcion: "Cobertura básica contra terceros y responsabilidad civil.",
    cobertura: "Cobertura hasta $1.000.000",
    tipo: "auto",
    isActive: true,
    createdAt: new Date("2025-04-20T12:45:00Z"),
  },
];

type DbProducto = Prisma.ProductoGetPayload<{}>;

function mapProducto(row: DbProducto): Product {
  return {
    id: row.id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    cobertura: row.cobertura,
    tipo: row.tipo as Product["tipo"],
    isActive: row.isActive,
    createdAt: row.createdAt,
    imagenUrl: (row as any).imagenUrl,
  };
}

const tipoSeguroToPrisma = (tipo: TipoSeguro) => {
  switch (tipo) {
    case "auto":  return "AUTO";
    case "hogar": return "HOGAR";
    case "vida":  return "VIDA";
    case "salud": return "SALUD";
  }
};

const tipoSeguroFromPrisma = (tipo: "AUTO" | "HOGAR" | "VIDA" | "SALUD"): TipoSeguro => {
  switch (tipo) {
    case "AUTO":  return "auto";
    case "HOGAR": return "hogar";
    case "VIDA":  return "vida";
    case "SALUD": return "salud";
  }
};

export const getAllProducts = async(): Promise<Product[]> => {
  const products = await prisma.producto.findMany({
    orderBy: { id: 'asc'},
  })
  return products.map(mapProducto);
}

export const getProductById = async(id: number): Promise<Product | null> => {
  const product = await prisma.producto.findUnique({ where: { id } });
  if(!product){
    const error = new Error('Producto no encontrado');
    (error as any).statusCode = 404;
    throw error;
  }
  return mapProducto(product);
}

export const createProduct = async(productData: CreateProductRequest & { imagenUrl?: string }): Promise<Product> => {
  const product = await prisma.producto.create({
    data: {
      titulo: productData.titulo,
      descripcion: productData.descripcion,
      cobertura: productData.cobertura,
      tipo: tipoSeguroToPrisma(productData.tipo),
      isActive: productData.isActive,
      imagenUrl: productData.imagenUrl,
    }
  })
  return mapProducto(product);
}

export const updateProduct = async (id: number, productData: UpdateProductRequest & { imagenUrl?: string }): Promise<Product | null> => {
  const dataSinFiltro = {
    titulo:      productData.titulo !== undefined ? productData.titulo : undefined,
    descripcion: productData.descripcion !== undefined ? productData.descripcion : undefined,
    cobertura:   productData.cobertura !== undefined ? productData.cobertura : undefined,
    isActive:    productData.isActive !== undefined ? productData.isActive : undefined,
    tipo:        productData.tipo !== undefined ? { set: tipoSeguroToPrisma(productData.tipo)! } : undefined,
    imagenUrl:   productData.imagenUrl !== undefined ? productData.imagenUrl : undefined,
  };

  const data = Object.fromEntries(
    Object.entries(dataSinFiltro).filter(([, v]) => v !== undefined)
  ) as Prisma.ProductoUpdateInput;

  try {
    const productUpdated = await prisma.producto.update({ where: { id }, data });
    return mapProducto(productUpdated);
  } catch (error: any) {
    if (error?.code === "P2025") return null;
    throw error;
  }
};

export const deleteProduct = async(id: number): Promise<Product> => {
  try {
    const productDeleted = await prisma.producto.delete({ where: { id } });
    return mapProducto(productDeleted)
  } catch (error: any) {
    if (error?.code === "P2025") {
      const e: any = new Error('Producto no encontrado');
      e.statusCode = 404;
      throw e;
    }
    if (error?.code === "P2003") {
      const e: any = new Error('No se puede eliminar: el producto está referenciado por pedidos');
      e.statusCode = 409;
      throw e;
    }
    throw error;
  };
}
