import mongoose from "mongoose";
import { MongoRole } from "../interfaces/role";

const RoleSchema = new mongoose.Schema<MongoRole>({
    roleName: {
        type: String,
        required: [true, 'Role is mandatory'],
    },
    state: {
        type: Boolean,
        default: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedAt: {
        type: Date,
    }
})

RoleSchema.index({ roleName: 1 }, { unique: true, collation: { locale: 'es', strength: 2 } });

export const Role = mongoose.model<MongoRole>('Role', RoleSchema);