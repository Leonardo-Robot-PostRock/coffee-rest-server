import mongoose from "mongoose";
import { IUser } from '../interfaces/user';

const UserSchema = new mongoose.Schema<IUser>({
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
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();

    return user;
}

const user = mongoose.model<IUser>('User', UserSchema)
export default user;

