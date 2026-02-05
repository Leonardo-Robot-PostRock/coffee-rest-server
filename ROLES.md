# Roles y Permisos

## 🔐 Roles del Sistema

Este proyecto utiliza un sistema de control de acceso basado en roles (RBAC). Los roles disponibles son:

### 1. **ADMIN_ROLE** - Administrador
- **Descripción:** Acceso completo al sistema
- **Permisos:**
  - ✅ Crear usuarios
  - ✅ Leer/Obtener todos los usuarios
  - ✅ Actualizar cualquier usuario
  - ✅ Eliminar usuarios
  - ✅ Gestionar roles
  - ✅ Acceso a todas las rutas

**Usado por:** Administradores del sistema

---

### 2. **USER_ROLE** - Usuario Regular
- **Descripción:** Acceso limitado a recursos propios
- **Permisos:**
  - ✅ Leer su propio perfil
  - ✅ Actualizar su propio perfil
  - ❌ Ver otros usuarios
  - ❌ Eliminar usuarios
  - ❌ Gestionar roles

**Usado por:** Usuarios registrados normales

---

### 3. **SALES_ROLE** - Vendedor
- **Descripción:** Acceso a funciones de ventas
- **Permisos:**
  - ✅ Crear órdenes de venta
  - ✅ Ver sus propias ventas
  - ✅ Actualizar estado de órdenes
  - ❌ Ver todas las ventas del sistema
  - ❌ Eliminar órdenes
  - ❌ Gestionar usuarios

**Usado por:** Vendedores/personal de ventas

---

## 🛡️ Middlewares de Validación de Roles

### `isAdminRole`
Valida que el usuario autenticado tenga el rol **ADMIN_ROLE**.

```typescript
// Uso en rutas
router.delete('/users/:id', [validateJWT, isAdminRole], usersDelete)
```

### `hasRole(...roles)`
Valida que el usuario autenticado tenga **alguno** de los roles especificados.

```typescript
// Uso en rutas
router.get('/users', [validateJWT, hasRole('ADMIN_ROLE', 'USER_ROLE')], usersGet)
```

---

## 📝 Datos de Prueba (Seed)

Al ejecutar `npm run seed`, se crean los siguientes usuarios de prueba:

| Email | Rol | Contraseña | Uso |
|-------|-----|------------|-----|
| leonardo@example.com | ADMIN_ROLE | Password123! | Admin del sistema |
| juan@example.com | USER_ROLE | Password123! | Usuario regular |
| maria@example.com | USER_ROLE | Password123! | Usuario regular |
| carlos@example.com | SALES_ROLE | Password123! | Vendedor |

---

## 🔄 Flujo de Autenticación y Autorización

```
1. Usuario inicia sesión (POST /api/auth/login)
   ↓
2. Servidor genera JWT con el rol del usuario
   ↓
3. Cliente envía request con header: Authorization: Bearer <token>
   ↓
4. Middleware validateJWT verifica el token
   ↓
5. Middleware isAdminRole/hasRole valida los permisos
   ↓
6. Si es válido → continúa al controlador
   Si no es válido → devuelve 401/403
```

---

## 🚀 Cómo Agregar Nuevos Roles

1. **Agregar el rol a la base de datos:**
   ```javascript
   await Role.create({ role: 'NUEVO_ROLE' })
   ```

2. **Usar en rutas:**
   ```typescript
   router.post('/ruta', [validateJWT, hasRole('NUEVO_ROLE', 'ADMIN_ROLE')], handler)
   ```

3. **Actualizar documentación:** Añadir a esta página

---

## ⚠️ Notas Importantes

- Los roles son **sensibles a mayúsculas/minúsculas** (ADMIN_ROLE ≠ admin_role)
- Siempre validar con `validateJWT` antes de validar roles
- Los permisos son verificados en middleware, no en controladores
- Las contraseñas están hasheadas con bcryptjs

