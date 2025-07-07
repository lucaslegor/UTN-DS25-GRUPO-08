# UTN-DS25-GRUPO-08 · Proyecto Web de Aseguradora

Este es un proyecto de desarrollo web frontend funcional creado para una aseguradora ficticia, desarrollado como parte del curso de Desarrollo de Software (3er año - UTN). El sistema incluye una tienda con productos asegurables, un carrito de compras, panel de administración y páginas informativas.

## 🧩 Funcionalidades implementadas

- **🛒 Catálogo y Carrito de Compras**
  - Visualización de seguros (auto, hogar, vida, salud)
  - Filtro/buscador por título y descripción
  - Agregar productos al carrito (funcionalidad simulada)

- **🔐 Autenticación Simulada**
  - Sistema de **Login** y **Registro** (simulado, sin backend real)
  - Control de acceso al panel de administración mediante token local

- **🧑 Mi Perfil**
  - Vista de perfil de usuario con edición de datos y avatar
  - Guardado local (a mejorar con integración a backend)

- **⚙️ Panel de Administración**
  - Gestión de productos: agregar, editar, eliminar
  - Vista en tabla con imágenes, descripciones y precios
  - Persistencia local con `localStorage`

- **📄 Páginas Estáticas**
  - Página "Nosotros" con información institucional
  - Navegación fluida con React Router

## ⚠️ Pendientes / Mejoras a realizar

- 💰 **Formato de precio**: al editar productos en el panel admin, el precio puede quedar mal formateado (e.g., sin `$`, sin `/año`). Se requiere sanitizar y re-formatear el valor antes de guardar.
- 👤 **Mejora de Mi Perfil**: actualmente toma valores simulados. Se deberá mejorar la lógica de carga, edición y validación cuando esté conectado a un backend real.
- 🔗 **Integración con backend**: las funcionalidades actuales son simuladas. Se planea conectar a una API REST para autenticación, productos, carrito y perfil de usuario.

## 🛠️ Tecnologías utilizadas

- ReactJS + React Router
- Material UI 
- JavaScript (ES6+)
- LocalStorage (persistencia simulada)
