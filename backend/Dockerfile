# ---------- Backend Dockerfile ----------
    FROM node:20-slim

    WORKDIR /app
    
    # Copiamos package.json y package-lock.json primero
    COPY package*.json ./
    
    # Instalamos dependencias
    RUN npm install
    
    # Copiamos 
    COPY . .
    
    # Generamos el cliente de Prisma dentro del contenedor
    RUN npx prisma generate
    
    # Compilamos la aplicación
    RUN npm run build
    
    # Exponemos el puerto (ajustalo si usás otro)
    EXPOSE 3000
    
    # Comando de arranque para producción
    CMD ["npm", "start"]
    
