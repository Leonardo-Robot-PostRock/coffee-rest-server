import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Role is mandatory']
    }
})

const role = mongoose.model('Role', RoleSchema);

export default role;