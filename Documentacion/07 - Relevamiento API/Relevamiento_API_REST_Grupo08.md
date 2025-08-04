
# 📄 Relevamiento de API REST – Grupo 08

## 1. Pantallas del Frontend y Endpoints Necesarios

| Pantalla             | Endpoints necesarios                                               |
|----------------------|--------------------------------------------------------------------|
| `Home.jsx`           | `GET /products`                                                   |
| `Login.jsx`          | `POST /auth/login`                                                |
| `Register.jsx`       | `POST /auth/register`                                             |
| `UserProfile.jsx`    | `GET /users/:id`, `PUT /users/:id`                                |
| `AdminPanelPage.jsx` | `GET /products`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id` |

---

## 2. Detalle por Endpoint

### 🔹 `GET /products`

- **Método**: `GET`  
- **URL**: `/products`  
- **Reglas de negocio**:
  - Devuelve la lista de productos (seguros).
  - Se muestra en la pantalla de inicio (`Home.jsx`).
- **Autenticación**: ❌ No
- **Interfaces**:
  ```ts
  interface Product {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
  }
  ```

---

### 🔹 `POST /auth/login`

- **Método**: `POST`  
- **URL**: `/auth/login`  
- **Reglas de negocio**:
  - El usuario debe ingresar email y contraseña.
  - Devuelve un token si las credenciales son válidas.
- **Autenticación**: ❌ No
- **Interfaces**:
  ```ts
  interface LoginRequest {
    email: string;
    password: string;
  }

  interface LoginResponse {
    token: string;
    userId: number;
  }
  ```

---

### 🔹 `POST /auth/register`

- **Método**: `POST`  
- **URL**: `/auth/register`  
- **Reglas de negocio**:
  - Se registra un nuevo usuario con nombre, email y contraseña.
- **Autenticación**: ❌ No
- **Interfaces**:
  ```ts
  interface RegisterRequest {
    name: string;
    email: string;
    password: string;
  }

  interface RegisterResponse {
    message: string;
    userId: number;
  }
  ```

---

### 🔹 `GET /users/:id`

- **Método**: `GET`  
- **URL**: `/users/:id`  
- **Reglas de negocio**:
  - Obtiene los datos del perfil del usuario.
  - Se usa para visualizar en `UserProfile`.
- **Autenticación**: ✅ Sí (token)
- **Interfaces**:
  ```ts
  interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
  }
  ```

---

### 🔹 `PUT /users/:id`

- **Método**: `PUT`  
- **URL**: `/users/:id`  
- **Reglas de negocio**:
  - Actualiza los datos del perfil del usuario.
- **Autenticación**: ✅ Sí
- **Interfaces**:
  ```ts
  interface UpdateUserRequest {
    name?: string;
    email?: string;
    phone?: string;
  }

  interface UpdateUserResponse {
    message: string;
  }
  ```

---

### 🔹 `POST /products`

- **Método**: `POST`  
- **URL**: `/products`  
- **Reglas de negocio**:
  - Admin puede crear un nuevo producto (seguro).
- **Autenticación**: ✅ Sí (admin)
- **Interfaces**:
  ```ts
  interface CreateProductRequest {
    title: string;
    description: string;
    price: string;
    image: File;
  }

  interface CreateProductResponse {
    message: string;
    productId: number;
  }
  ```

---

### 🔹 `PUT /products/:id`

- **Método**: `PUT`  
- **URL**: `/products/:id`  
- **Reglas de negocio**:
  - Admin edita un producto existente.
- **Autenticación**: ✅ Sí
- **Interfaces**:
  ```ts
  interface UpdateProductRequest {
    title?: string;
    description?: string;
    price?: string;
    image?: File;
  }

  interface UpdateProductResponse {
    message: string;
  }
  ```

---

### 🔹 `DELETE /products/:id`

- **Método**: `DELETE`  
- **URL**: `/products/:id`  
- **Reglas de negocio**:
  - Elimina un producto (visible en el panel admin).
- **Autenticación**: ✅ Sí
- **Interfaces**:
  ```ts
  interface DeleteProductResponse {
    message: string;
  }
  ```
