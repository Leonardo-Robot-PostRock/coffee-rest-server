# Script de Seed de Desarrollo

Este proyecto incluye un script opcional para poblar rápidamente la base de datos con usuarios y categorías de prueba.

> ⚠️ **Importante:** Este script es **solo para desarrollo**. Borra usuarios y categorías existentes.

## Archivo

- Script: `scripts/seedDev.ts`

```
    import dotenv from 'dotenv';
    dotenv.config();

    import dbConnection from '../database/config';
    import User from '../models/user';
    import Category from '../models/category';
    import bcrypt from 'bcryptjs';

    async function seed() {
    await dbConnection();

    // Limpia colecciones (solo en dev!)
    await User.deleteMany({});
    await Category.deleteMany({});

    const password = bcrypt.hashSync('123456', 10);

    const users = await User.insertMany([
        { name: 'Admin',    email: 'admin@test.com',    password, role: 'ADMIN_ROLE', state: true },
        { name: 'User One', email: 'user1@test.com',    password, role: 'USER_ROLE',  state: true },
        { name: 'User Two', email: 'user2@test.com',    password, role: 'USER_ROLE',  state: true },
        { name: 'User Three', email: 'user3@test.com',    password, role: 'USER_ROLE',  state: true },
        { name: 'User Four', email: 'user4@test.com',    password, role: 'USER_ROLE',  state: true },
        { name: 'Carlos',    email: 'carlos@test.com',    password, role: 'SALES_ROLE', state: true },
        { name: 'Juan',    email: 'juan@test.com',    password, role: 'SALES_ROLE', state: true },
        { name: 'María',    email: 'maria@test.com',    password, role: 'SALES_ROLE', state: true },
        { name: 'Ana',    email: 'ana@test.com',    password, role: 'SALES_ROLE', state: true },
    ]);

    const adminId = users[0]._id;

    await Category.insertMany([
        { name: 'CAFÉS',   state: true, addedBy: adminId },
        { name: 'JUGOS',   state: true, addedBy: adminId },
        { name: 'POSTRES', state: true, addedBy: adminId },
    ]);

    console.log('Seed dev completo');
    process.exit(0);
    }

    seed().catch(err => { console.error(err); process.exit(1); });

```

## Qué hace

- Conecta a la base de datos usando tu configuración actual (`database/config.ts`).
- Elimina TODO el contenido de las colecciones:
	- `users`
	- `categories`
- Crea usuarios de prueba:
	- `admin@test.com` → `ADMIN_ROLE`
	- `user1@test.com` → `USER_ROLE`
	- `user2@test.com` → `USER_ROLE`
	- `sales@test.com` → `SALES_ROLE`
- Crea categorías de prueba (asociadas al Admin como `addedBy`):
	- `CAFÉS`
	- `JUGOS`
	- `POSTRES`

## Requisitos previos

- Tener las variables de entorno configuradas (`.env`), especialmente `MONGODB_CNN` (cadena de conexión).
- Tener dependencias instaladas:

```bash
npm install
```

## Cómo ejecutar el seed

1. Compilar TypeScript a JavaScript:

```bash
npx tsc
```

2. Ejecutar el script compilado:

```bash
node dist/scripts/seedDev.js
```

Si todo va bien, deberías ver en la consola algo como:

```text
Seed dev completo
```

## Uso típico

Este script es útil cuando:

- Cambiaste el esquema de `Category` o `User` (por ejemplo, índices únicos) y quieres empezar con datos limpios.
- Quieres tener siempre un admin y usuarios de prueba para probar autenticación y roles.

En caso de no querer que este script llegue a `master`, puedes mantenerlo sin trackear o en ramas de desarrollo, y usar este archivo como referencia para recrearlo cuando sea necesario.

