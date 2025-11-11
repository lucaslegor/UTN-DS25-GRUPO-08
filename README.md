# 🛒 Plataforma E-Commerce - Maps Seguros

## 📋 Información General

| Detalle            | Información                                       |
|--------------------|-------------------------------------------------- |
| **Materia**        | Desarrollo de Software                            |
| **Profesor**       | Matías Corti                                      |

---

## 🚀 Breve Descripcion del Proyecto

Desarrollo de una plataforma **E-commerce** para la Empresa **Maps Seguros**, utilizando tecnologías como **React** para el frontend y **Node.js** para el backend.

La plataforma permitirá:
- La venta online de enlatados.
- Una experiencia de usuario ágil, moderna y segura.

El proyecto busca potenciar el alcance comercial de la Empresa MAPS, facilitando a los usuarios la compra desde cualquier dispositivo y lugar.

---

## 📦 Tecnologías Principales
- React
- Node.js
- Mercado Pago / Stripe (integración de pagos)
- Diseño Responsive (Mobile First)

## 👨‍💻👩‍💻 Miembros del Equipo

- Nombre Completo: Luca Giordani
- Legajo: 33382
- Alias del Slack: @LucaGiordani
- Perfil de Github: https://github.com/LucaGio04
---
- Nombre Completo: Lucas Legorburu
- Legajo: 33497
- Alias Slack: lucaslegor
- GitHub: https://github.com/lucaslegor
---
- Nombre completo: Tobias Domato
- Legajo: 33271
- Alias de Slack: @TobiasDomato
- Perfil de GitHub: https://github.com/tobidomato
---
- Nombre Completo: Agustín Manrique
- Legajo: 31976
- Alias Slack: agusmanri
- GitHub: https://github.com/AgustinManrique
---
- Nombre completo: Facundo Devida
- Legajo: 33539
- Alias de Slack: @Facudevida
- Perfil de GitHub: https://github.com/Facudevida
---
- Nombre Completo: Joaquin Rodriguez
- Legajo: 33402
- Alias de Slack: @Joaquin Rodriguez
- Perfil de github: https://github.com/Joacorodriguezz
---
## Objetivos del Proyecto

### Objetivos específicos

- **Objetivo principal**: Potenciar el aspecto comercial e innovador de la empresa mediante la implementación de una plataforma de venta online.

1. Desarrollar una tienda virtual moderna y accesible para la venta de seguros y enlatados de la empresa en el plazo de 8 meses.
2. Integrar medios de pago electrónicos confiables como Mercado Pago o Stripe.
3. Integrar un ChatBot con BotMaker.
4. Mejorar la experiencia de compra para los usuarios, ampliando el alcance a nivel nacional.
5. Automatizar el proceso de ventas para reducir la carga operativa.
6. Aumentar el número de ventas y la exposición de la empresa.

---

## 🧪 Testing

### Ejecutar Tests (Frontend)

Para ejecutar los tests del frontend, navega al directorio `frontend` y usa el siguiente comando:

```bash
cd frontend
npm test
```

### Qué se está testeando (Frontend)

Actualmente, los tests del frontend cubren las siguientes funcionalidades:

*   **`formatPrice` (src/utils/formatPrice.js)**:
    *   Verifica que la función formatea correctamente valores numéricos (enteros, decimales, cero, negativos) a un formato de moneda específico (`$X.XXX/año`).
    *   Asegura que retorna "Consultar" para entradas no numéricas o nulas/indefinidas.

*   **`CartContext` (src/context/CartContext.jsx)**:
    *   **`addToCart`**: Asegura que los productos se añaden correctamente al carrito y que la cantidad se incrementa si el producto ya existe.
    *   **`removeFromCart`**: Verifica que los productos se eliminan correctamente del carrito.
    *   **`clearCart`**: Confirma que el carrito se vacía por completo.
    *   **`getCartTotal`**: Comprueba que el total de ítems en el carrito se calcula correctamente.
    *   **`getCartPriceTotal`**: Verifica que el precio total del carrito (suma de precios * cantidades) se calcula correctamente.

*   **`ProductCard` (src/components/ProductCard.jsx)**:
    *   Verifica que el componente renderiza la información del producto (título, descripción, precio, imagen) de manera correcta.
    *   Confirma que el componente no renderiza un enlace internamente, esperando que la navegación sea manejada por un componente padre.

*   **`NavBar` (src/components/NavBar.jsx)**:
    *   Asegura que la barra de navegación muestra el botón "Iniciar sesión" cuando no hay un usuario autenticado.
    *   Verifica que muestra el icono del menú de usuario cuando hay un usuario autenticado.
    *   Comprueba que el enlace "Panel Admin" se muestra solo cuando el usuario autenticado tiene el rol de "ADMINISTRADOR".
    *   Confirma que el enlace "Panel Admin" no se muestra si el usuario es un "USUARIO" normal.

*   **`Componente de Login` (src/components/Login.jsx)**:
    *   Verifica que el componente renderiza correctamente los campos de "Usuario o Email" y "Contraseña", así como los botones de "Ingresar" y "Registrarse".
    *   Asegura que, al enviar el formulario con credenciales válidas (mockeadas), se llama a la función `loginApi` con los datos correctos y se navega a la página principal.
    *   Comprueba que al hacer clic en el botón "Registrarse" se navega a la ruta `/register`.
    *   Verifica que al hacer clic en el botón "¿Olvidaste tu contraseña?" se navega a la ruta `/forgot-password`.
 
### Ejecutar Tests (Backend)

Para ejecutar los tests del backend, navega al directorio `backend` y usa los siguientes comandos:

```bash
cd backend
npm install
npm test
``` 
*   **PedidosService (src/services/pedidos.service.ts)**:
    *   **crearPedido()**:
        *   Verifica que se cree correctamente un pedido cuando los productos existen en la base de datos simulada.
        *   Asegura que la función calcula correctamente el total del pedido en base a los ítems seleccionados.
        *   Comprueba que el pedido se guarda llamando al método `prisma.pedido.create`.
        *   Verifica que se lance un error si se intenta crear un pedido con productos inexistentes.
    *   Tests implementados siguiendo la estructura AAA (Arrange, Act, Assert) de la clase de *Introducción al Testing*:
        *   **ARRANGE:** Se preparan los mocks de productos y datos de entrada.
        *   **ACT:** Se ejecuta la función `crearPedido`.
        *   **ASSERT:** Se verifican los resultados esperados y las llamadas a Prisma.

