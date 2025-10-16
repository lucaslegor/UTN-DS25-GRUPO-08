export type TipoSeguro = "auto" | "hogar" | "vida" | "salud";

export interface Product {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;      
  cobertura: string;
  tipo: TipoSeguro;
  isActive: boolean;
  createdAt: Date;
  imagenUrl?: string;
}

export interface CreateProductRequest {
  titulo: string;
  descripcion: string;
  precio: number;
  cobertura: string;
  tipo: TipoSeguro;
  isActive: boolean;
  imagenUrl?: string;
}

export interface UpdateProductRequest {
  titulo?: string;
  descripcion?: string;
  precio?: number;
  cobertura?: string;
  tipo?: TipoSeguro;
  isActive?: boolean;
  imagenUrl?: string;
}

export interface ProductResponse {
  product: Product;
  message: string;
}

export interface ProductsListResponse {
  products: Product[];
  total: number;
}
