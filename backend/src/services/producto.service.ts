
import { Product, CreateProductRequest, UpdateProductRequest} from "../types/productos.types"; 

const mockProducts: Product[] = [
  {
    id: 1,
    titulo: "Seguro de Auto Premium",
    descripcion: "Cobertura total contra todo riesgo, incluyendo robo, incendio y granizo.",
    precio: 15000,
    cobertura: "Cobertura total hasta $5.000.000",
    tipo: "auto",
    isActive: true,
    createdAt: new Date("2025-01-15T10:00:00Z"),
  },
  {
    id: 2,
    titulo: "Seguro de Hogar Básico",
    descripcion: "Protección contra incendios y daños por agua en el hogar.",
    precio: 8000,
    cobertura: "Cobertura hasta $2.000.000",
    tipo: "hogar",
    isActive: true,
    createdAt: new Date("2025-02-01T15:30:00Z"),
  },
  {
    id: 3,
    titulo: "Seguro de Vida Familiar",
    descripcion: "Protección económica para tu familia en caso de fallecimiento.",
    precio: 12000,
    cobertura: "Beneficio de $3.000.000",
    tipo: "vida",
    isActive: true,
    createdAt: new Date("2025-02-10T09:15:00Z"),
  },
  {
    id: 4,
    titulo: "Seguro de Salud Premium",
    descripcion: "Cobertura médica completa en clínicas privadas de primer nivel.",
    precio: 20000,
    cobertura: "Cobertura 100% en internaciones y cirugías",
    tipo: "salud",
    isActive: false,
    createdAt: new Date("2025-03-05T18:00:00Z"),
  },
  {
    id: 5,
    titulo: "Seguro de Auto Económico",
    descripcion: "Cobertura básica contra terceros y responsabilidad civil.",
    precio: 5000,
    cobertura: "Cobertura hasta $1.000.000",
    tipo: "auto",
    isActive: true,
    createdAt: new Date("2025-04-20T12:45:00Z"),
  },
];

export const getAllProducts = async(): Promise<Product[]> => {
    return mockProducts;
}

export const getProductById = async(id: number): Promise<Product | null> => {
    const product = mockProducts.find( p => p.id === id);
    if(product === undefined){
        const error = new Error('Producto no encontrado');
        (error as any).statusCode = 404;
        throw error;
    }
    return product;

}

export const createProduct = async(productData: CreateProductRequest): Promise<Product> => {
    if(productData.precio <= 0 ){
        const error = new Error('El precio debe ser mayor a 0');
        (error as any).statusCode = 400;
        throw error;
    }
    const product: Product = { 
        id:mockProducts.length ? Math.max(...mockProducts.map( i => i.id)) + 1: 1,
        ...productData,
        createdAt: new Date()
    }
    mockProducts.push(product);
    return product;
}

export const updateProduct = async(id: number, productData: UpdateProductRequest): Promise<Product | null> => {
    const productIndex = mockProducts.findIndex( p => p.id === id);
    if(productIndex === -1){
        const error = new Error('Producto no encontrado');
        (error as any).statusCode = 404;
        throw error;
    }

    if(productData.precio !== undefined && productData.precio <= 0){
        const error = new Error('El precio debe ser mayor a 0');
        (error as any).statusCode = 400;
        throw error;
    }
    mockProducts[productIndex] = {...mockProducts[productIndex], ...productData};
    return mockProducts[productIndex];
}

export const deleteProduct = async(id: number): Promise<Product> => {
    const productIndex = mockProducts.findIndex( p => p.id === id);
    if(productIndex === -1){
        const error = new Error('Producto no encontrado');
        (error as any).statusCode = 404;
        throw error;
    }
    const [product] = mockProducts.splice(productIndex,1);
    return product;
}