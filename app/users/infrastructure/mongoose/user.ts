import mongoose from "mongoose";
import { MongoUser } from "./interfaces/user";

const UserSchema = new mongoose.Schema<MongoUser>({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String,
        required: [true, 'Email is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model<MongoUser>('User', UserSchema)
export default User;

