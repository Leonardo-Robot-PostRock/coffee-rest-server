import mongoose from "mongoose";
import { IRole } from "../interfaces/role";

const RoleSchema = new mongoose.Schema<IRole>({
    role: {
        type: String,
        required: [true, 'Role is mandatory']
    }
})

const Role = mongoose.model<IRole>('Role', RoleSchema);

export default Role;