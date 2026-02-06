import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import Role from '../models/role';
import User from '../models/user';

const dbConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN as string);
        console.log('✅ Conectado a MongoDB');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        // Limpiar datos existentes
        await Role.deleteMany({});
        await User.deleteMany({});
        console.log('🗑️  Base de datos limpiada');

        // Crear roles
        const roles = await Role.insertMany([
            { role: 'ADMIN_ROLE' },
            { role: 'USER_ROLE' },
            { role: 'SALES_ROLE' }
        ]);
        console.log('✅ Roles creados:', roles.length);

        // Crear usuarios
        const salt = bcryptjs.genSaltSync();
        const users = await User.insertMany([
            {
                name: 'Leonardo Puebla',
                email: 'leonardo@example.com',
                password: bcryptjs.hashSync('Password123!', salt),
                role: 'ADMIN_ROLE',
                state: true,
                google: false
            },
            {
                name: 'Juan Pérez',
                email: 'juan@example.com',
                password: bcryptjs.hashSync('Password123!', salt),
                role: 'USER_ROLE',
                state: true,
                google: false
            },
            {
                name: 'María García',
                email: 'maria@example.com',
                password: bcryptjs.hashSync('Password123!', salt),
                role: 'USER_ROLE',
                state: true,
                google: false
            },
            {
                name: 'Carlos López',
                email: 'carlos@example.com',
                password: bcryptjs.hashSync('Password123!', salt),
                role: 'SALES_ROLE',
                state: true,
                google: false
            }
        ]);
        console.log('✅ Usuarios creados:', users.length);

        console.log('\n📊 Datos de prueba insertados exitosamente');
        console.log('\n👤 Usuarios de prueba:');
        console.log('   - Email: leonardo@example.com | Rol: ADMIN_ROLE | Contraseña: Password123!');
        console.log('   - Email: juan@example.com | Rol: USER_ROLE | Contraseña: Password123!');
        console.log('   - Email: maria@example.com | Rol: USER_ROLE | Contraseña: Password123!');
        console.log('   - Email: carlos@example.com | Rol: SALES_ROLE | Contraseña: Password123!\n');

    } catch (error) {
        console.error('❌ Error al hacer seed:', error);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

// Ejecutar seed
const runSeed = async () => {
    await dbConnection();
    await seedDatabase();
};

runSeed();
