# Backend - Sistema de Seguros

## 📋 Descripción del Proyecto

Este es el backend de un sistema de gestión de seguros desarrollado con Node.js, Express, TypeScript y Prisma. El sistema permite la gestión de usuarios, productos de seguros, pedidos, pólizas, carritos de compra y pagos.

## 🏗️ Arquitectura del Sistema

### Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **TypeScript** - Superset tipado de JavaScript
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación con tokens
- **Zod** - Validación de esquemas
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Configuración de políticas de origen cruzado

### Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/     # Controladores de rutas
│   ├── services/        # Lógica de negocio
│   ├── routes/          # Definición de rutas
│   ├── middlewares/     # Middlewares personalizados
│   ├── types/           # Tipos TypeScript
│   ├── validations/     # Esquemas de validación Zod
│   ├── utils/           # Utilidades y mappers
│   └── config/          # Configuración de Prisma
├── prisma/
│   ├── migrations/      # Migraciones de base de datos
│   └── schema.prisma    # Esquema de base de datos
└── package.json
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- PostgreSQL
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd UTN-DS25-GRUPO-08/backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear archivo `.env` en la raíz del backend:
   ```env
   DATABASE_URL="postgresql://usuario:password@localhost:5432/seguros_db"
   JWT_SECRET="tu-jwt-secret-aqui"
   PORT=3000
   ```

4. **Configurar la base de datos**
   ```bash
   # Generar el cliente de Prisma
   npx prisma generate
   
   # Ejecutar migraciones
   npx prisma migrate dev
   
   # (Opcional) Sembrar datos iniciales
   npx prisma db seed
   ```

5. **Ejecutar el servidor**
   ```bash
   # Modo desarrollo
   npm run dev
   
   # Modo producción
   npm run build
   npm start
   ```

## 📊 Modelo de Datos

### Entidades Principales

- **Usuario**: Gestión de usuarios del sistema (ADMINISTRADOR/USUARIO)
- **Producto**: Catálogo de seguros (AUTO, HOGAR, VIDA, SALUD)
- **Pedido**: Órdenes de compra con items
- **Póliza**: Documentos de seguros vinculados a pedidos
- **Carrito**: Carrito de compras temporal
- **Pago**: Gestión de transacciones de pago

### Enums Utilizados

- `RolUsuario`: ADMINISTRADOR, USUARIO
- `TipoSeguro`: AUTO, HOGAR, VIDA, SALUD
- `EstadoPoliza`: PENDIENTE, CARGADA
- `EstadoPedido`: CREADO, PENDIENTE_POLIZA, POLIZA_CARGADA, PAGO_PENDIENTE, PAGO_APROBADO, PAGO_RECHAZADO, CANCELADO
- `EstadoPago`: CREADO, PENDIENTE, APROBADO, RECHAZADO, CANCELADO
- `Moneda`: ARS
- `PasarelaPago`: MERCADOPAGO

## 🔌 API Endpoints

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener usuario por ID
- `POST /api/usuarios` - Crear nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

### Productos
- `GET /api/productos` - Obtener catálogo de productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Pedidos
- `GET /api/pedidos` - Obtener todos los pedidos
- `GET /api/pedidos/:id` - Obtener pedido por ID
- `POST /api/pedidos` - Crear nuevo pedido
- `PUT /api/pedidos/:id` - Actualizar pedido
- `DELETE /api/pedidos/:id` - Eliminar pedido

### Pólizas
- `GET /api/polizas` - Obtener todas las pólizas
- `GET /api/polizas/:id` - Obtener póliza por ID
- `POST /api/polizas/:idPedido` - Crear póliza para un pedido
- `PUT /api/polizas/:id` - Actualizar póliza
- `DELETE /api/polizas/:id` - Eliminar póliza

### Carrito
- `GET /api/cart` - Obtener carrito actual
- `POST /api/cart/items` - Agregar item al carrito
- `PUT /api/cart/items/:id` - Actualizar cantidad de item
- `DELETE /api/cart/items/:id` - Eliminar item del carrito
- `DELETE /api/cart` - Vaciar carrito

### Pagos
- `GET /api/pagos` - Obtener todos los pagos
- `GET /api/pagos/:id` - Obtener pago por ID
- `POST /api/pagos` - Crear nuevo pago
- `PUT /api/pagos/:id` - Actualizar pago

## 📝 Ejemplos de Uso

### Crear Usuario
```json
POST /api/usuarios
{
  "username": "juan_perez",
  "mail": "juan@email.com",
  "password": "password123",
  "rol": "USUARIO"
}
```

### Crear Producto
```json
POST /api/productos
{
  "titulo": "Seguro de Auto Premium",
  "descripcion": "Cobertura completa para vehículos",
  "precio": 15000.00,
  "cobertura": "Total",
  "tipo": "AUTO",
  "isActive": true
}
```

### Crear Pedido
```json
POST /api/pedidos
{
  "idUsuario": 1,
  "items": [
    {
      "idProducto": 1,
      "cantidad": 1
    }
  ]
}
```

### Crear Póliza
```json
POST /api/polizas/1
{
  "archivoUrl": "https://ejemplo.com/polizas/poliza-123.pdf"
}
```

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo con hot reload
- `npm run build` - Compilar TypeScript a JavaScript
- `npm start` - Ejecutar versión compilada en producción

## 🛡️ Middlewares Implementados

- **Error Middleware**: Manejo centralizado de errores
- **Logger Middleware**: Logging de requests HTTP
- **Validation Middleware**: Validación de datos con Zod
- **CORS**: Configuración de políticas de origen cruzado

## 🔐 Autenticación y Seguridad

- Encriptación de contraseñas con bcryptjs
- Autenticación basada en JWT
- Validación de datos de entrada con Zod
- Middleware de manejo de errores

## 📋 Validaciones

Todas las entradas son validadas usando esquemas Zod:

- **Usuarios**: Validación de email, username único, contraseña segura
- **Productos**: Validación de precios, tipos de seguro válidos
- **Pedidos**: Validación de items, cantidades, totales
- **Pólizas**: Validación de URLs de archivos

## 🗄️ Base de Datos

### Configuración de Prisma

- **Provider**: PostgreSQL
- **Migraciones**: Automatizadas con Prisma Migrate
- **Cliente**: Generado automáticamente en `src/generated/prisma`

### Comandos de Base de Datos

```bash
# Ver estado de la base de datos
npx prisma db status

# Resetear base de datos
npx prisma migrate reset

# Ver datos en Prisma Studio
npx prisma studio
```

## 🚨 Consideraciones Importantes

1. **Variables de Entorno**: Asegúrate de configurar correctamente el archivo `.env`
2. **Base de Datos**: PostgreSQL debe estar ejecutándose antes de iniciar la aplicación
3. **Puerto**: El servidor corre en el puerto 3000 por defecto
4. **CORS**: Configurado para aceptar requests desde `http://localhost:5173` (frontend)
5. **Validaciones**: Todos los endpoints requieren validación de datos de entrada

## 📞 Soporte

Para consultas o problemas técnicos, contactar al equipo de desarrollo del Grupo 08 - UTN DS25.

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2025  
**Equipo**: UTN-DS25-GRUPO-08
