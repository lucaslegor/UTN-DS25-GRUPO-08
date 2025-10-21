# 🔄 Sincronización de Base de Datos

## Problema Identificado
Tu amigo tiene una versión anterior de la base de datos que aún incluye la columna `precio` que ya no se usa en el código actual.

## Solución

### Opción 1: Reset completo de la base de datos (RECOMENDADO)
```bash
# 1. Ir al directorio backend
cd backend

# 2. Resetear la base de datos y aplicar el esquema actual
npx prisma db push --force-reset

# 3. Regenerar el cliente de Prisma
npx prisma generate

# 4. Reiniciar el servidor
npm run dev
```

### Opción 2: Aplicar migraciones (si las hay)
```bash
# 1. Ir al directorio backend
cd backend

# 2. Aplicar migraciones pendientes
npx prisma migrate deploy

# 3. Regenerar el cliente de Prisma
npx prisma generate

# 4. Reiniciar el servidor
npm run dev
```

**Si aparece error P3005 (base de datos no vacía):**
```bash
# 1. Marcar migraciones como aplicadas (baseline)
npx prisma migrate resolve --applied "20250824230133_init"
npx prisma migrate resolve --applied "20250831210206_add_mail_to_usuario"
npx prisma migrate resolve --applied "20250905172541_usuario_migration"

# 2. Aplicar migraciones restantes
npx prisma migrate deploy

# 3. Regenerar el cliente de Prisma
npx prisma generate

# 4. Reiniciar el servidor
npm run dev
```

### Opción 3: Sincronizar esquema sin reset (MÁS SIMPLE)
```bash
# 1. Ir al directorio backend
cd backend

# 2. Sincronizar esquema con la base de datos
npx prisma db push

# 3. Regenerar el cliente de Prisma
npx prisma generate

# 4. Reiniciar el servidor
npm run dev
```

### Opción 4: Reset completo (SI LAS OTRAS FALLAN)
```bash
# 1. Ir al directorio backend
cd backend

# 2. Resetear completamente la base de datos
npx prisma db push --force-reset

# 3. Regenerar el cliente de Prisma
npx prisma generate

# 4. Reiniciar el servidor
npm run dev
```

## ⚠️ Importante
- **Opción 1** eliminará todos los datos existentes
- **Opción 2** preserva los datos pero requiere migraciones (puede dar error P3005)
- **Opción 3** es la más simple y segura (RECOMENDADA)
- **Opción 4** elimina todos los datos pero garantiza funcionamiento

## 🎯 Recomendación
**Usa la Opción 3 primero** (`npx prisma db push`). Si falla, usa la Opción 4.

## Verificación
Después de ejecutar cualquiera de las opciones, verifica que:
1. El servidor backend inicie sin errores
2. La página de productos cargue correctamente
3. No aparezcan errores de columna `precio` en la consola

## Si el problema persiste
1. Verificar que el archivo `.env` tenga la `DATABASE_URL` correcta
2. Verificar que esté usando la misma base de datos (Supabase/PostgreSQL)
3. Verificar que el código esté actualizado (última versión del repositorio)
