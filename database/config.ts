import { Error } from "mongoose";
import mongoose from "mongoose";

const dbConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN as string);
    } catch (error: unknown) {
        throw new Error(`Error al iniciar la base de datos: ${error}`);
    }

    console.log('Base de datos online')
}

export default dbConnection;