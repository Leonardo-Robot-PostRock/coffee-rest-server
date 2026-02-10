import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import Role from '../models/role';
import User from '../models/user';

interface SeedRole {
    role: string;
}

interface SeedUser {
    name: string;
    email: string;
    password: string;
    role: string;
    state?: boolean;
    google?: boolean;
}

interface SeedData {
    roles: SeedRole[];
    users: SeedUser[];
}

const dbConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN as string);
        console.log('✅ Conectado a MongoDB');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

const loadSeedData = (): SeedData => {
    const seedPath = path.join(process.cwd(), 'mock', 'seed-data.json');

    if (!fs.existsSync(seedPath)) {
        throw new Error(`No se encontró el archivo de seed en: ${seedPath}`);
    }

    const raw = fs.readFileSync(seedPath, { encoding: 'utf-8' });
    const parsed = JSON.parse(raw) as Partial<SeedData>;

    if (!Array.isArray(parsed.roles) || !Array.isArray(parsed.users)) {
        throw new Error('El archivo de seed debe contener arrays "roles" y "users"');
    }

    return {
        roles: parsed.roles,
        users: parsed.users
    } as SeedData;
};

const seedDatabase = async () => {
    try {
        // Limpiar datos existentes
        await Role.deleteMany({});
        await User.deleteMany({});
        console.log('🗑️  Base de datos limpiada');

        const { roles: rolesData, users: usersData } = loadSeedData();

        // Crear roles
        const roles = await Role.insertMany(rolesData);
        console.log('✅ Roles creados:', roles.length);

        // Crear usuarios
        const salt = bcryptjs.genSaltSync();
        const usersToInsert = usersData.map((user) => ({
            ...user,
            password: bcryptjs.hashSync(user.password, salt),
            state: user.state ?? true,
            google: user.google ?? false
        }));

        const users = await User.insertMany(usersToInsert);
        console.log('✅ Usuarios creados:', users.length);

        console.log('\n📊 Datos de prueba insertados exitosamente');
        console.log('\n👤 Usuarios de prueba (tomados desde mock/seed-data.json):');
        usersData.forEach((user) => {
            console.log(`   - Email: ${user.email} | Rol: ${user.role} | Contraseña: ${user.password}`);
        });

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
