# Coffee REST Server

Un servidor REST construido con Node.js, TypeScript y Express que proporciona autenticación basada en JWT, gestión de usuarios y roles.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Autenticación](#autenticación)
- [Roles y Permisos](#roles-y-permisos)
- [Base de Datos](#base-de-datos)

## ✨ Características

- ✅ Autenticación basada en JWT
- ✅ Gestión de usuarios y roles
- ✅ Validación de campos con middleware personalizado
- ✅ Control de acceso basado en roles (RBAC)
- ✅ Conectado a MongoDB
- ✅ Código tipado con TypeScript
- ✅ Estructura modular y escalable

## 📦 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- MongoDB (local o en la nube)

## 🚀 Instalación

1. **Clonar el repositorio:**
```bash
git clone <URL_DEL_REPOSITORIO>
cd coffee-rest-server
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Crear archivo \`.env\`** en la raíz del proyecto:
```
MONGDB_CNN=mongodb://localhost:27017/coffee-db
JWT_SECRET=tu_clave_secreta_super_segura_aqui_2026
PORT=8000
NODE_ENV=development
```

4. **Compilar TypeScript:**
```bash
npm run build
```

5. **Iniciar el servidor en modo desarrollo:**
```bash
npm run dev
```

O para producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:8000`

> **Nota importante:** Asegúrate de agregar el archivo `.env` a tu `.gitignore` para no compartir credenciales en el repositorio.

## ⚙️ Configuración

### Archivo \`package.json\`

Define los scripts principales para desarrollo y producción.

### TypeScript (\`tsconfig.json\`)

Configuración del compilador TypeScript con opciones de strictitud y resolución de módulos.

### Base de Datos

La configuración de MongoDB se encuentra en database/config.ts

## 📂 Estructura del Proyecto

\`\`\`
coffee-rest-server/
├── app.ts                 # Configuración principal de Express
├── controllers/           # Controladores de las rutas
│   ├── auth.controller.ts
│   └── users.controller.ts
├── routes/               # Definición de rutas
│   ├── auth.routes.ts
│   └── users.routes.ts
├── middlewares/          # Middleware personalizado
│   ├── validate-jwt.ts
│   ├── validate-roles.ts
│   └── validate-fields.ts
├── models/              # Modelos de base de datos
│   ├── user.ts
│   ├── role.ts
│   └── server.ts
├── interfaces/          # Interfaces TypeScript
│   ├── user.ts
│   └── role.ts
├── database/            # Configuración de BD
│   └── config.ts
├── helpers/             # Funciones auxiliares
│   ├── generate-jwt.ts
│   └── db-validators.ts
├── types/               # Tipos personalizados
│   └── custom.d.ts
├── utils/               # Utilidades
│   └── keyGenerator.ts
├── public/              # Archivos estáticos
│   └── index.html
└── package.json
\`\`\`

## 🔌 API Endpoints

### Autenticación

- \`POST /api/auth/login\` - Iniciar sesión
- \`POST /api/auth/register\` - Registrarse
- \`POST /api/auth/refresh-token\` - Renovar token

### Usuarios

- \`GET /api/users\` - Obtener todos los usuarios (requiere autenticación)
- \`GET /api/users/:id\` - Obtener usuario por ID
- \`POST /api/users\` - Crear nuevo usuario
- \`PUT /api/users/:id\` - Actualizar usuario
- \`DELETE /api/users/:id\` - Eliminar usuario

### Roles

- \`GET /api/roles\` - Obtener todos los roles
- \`POST /api/roles\` - Crear rol
- \`PUT /api/roles/:id\` - Actualizar rol
- \`DELETE /api/roles/:id\` - Eliminar rol

## 🔐 Autenticación

Este proyecto utiliza JWT (JSON Web Tokens) para la autenticación:

1. El usuario proporciona credenciales (email/contraseña)
2. El servidor valida y genera un JWT
3. El cliente incluye el token en el header: \`Authorization: Bearer <token>\`
4. El middleware valida el token en cada solicitud

**Middleware de JWT:** middlewares/validate-jwt.ts

## 👥 Roles y Permisos

El sistema soporta control de acceso basado en roles:

- **Admin** - Acceso completo
- **User** - Acceso limitado a recursos propios
- **Guest** - Acceso de solo lectura

**Documentación detallada:** Ver [ROLES.md](ROLES.md) para información completa sobre roles y permisos

## 🗄️ Base de Datos

Se utiliza MongoDB con las siguientes colecciones:

### Users
\`\`\`json
{
  "_id": "ObjectId",
  "email": "string",
  "password": "string (hasheada)",
  "name": "string",
  "role": "ObjectId (referencia a Role)",
  "active": "boolean",
  "createdAt": "Date"
}
\`\`\`

### Roles
\`\`\`json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string"
}
\`\`\`

## 🛠️ Desarrollo

### Scripts disponibles

\`\`\`bash
# Desarrollo con reinicio automático
npm run dev

# Compilar TypeScript
npm run build

# Linting
npm run lint

# Ejecutar en producción
npm start
\`\`\`

### Variables de Entorno

| Variable | Descripción | Valor Actual |
|----------|-------------|---------||
| `MONGODB_CNN` | URL de conexión a MongoDB | `mongodb://localhost:27017/coffee-db` |
| `JWT_SECRET` | Clave secreta para JWT | `tu_clave_secreta_super_segura_aqui_2026` |
| `PORT` | Puerto del servidor | `8000` |
| `NODE_ENV` | Ambiente de ejecución | `development` |

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 👨‍💻 Autor

Leonardo Puebla

## 📧 Contacto

Para preguntas o sugerencias, contáctame en tu correo.
