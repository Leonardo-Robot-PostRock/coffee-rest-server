"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RoleSchema = new mongoose_1.default.Schema({
    role: {
        type: String,
        required: [true, 'Role is mandatory']
    }
});
const role = mongoose_1.default.model('Role', RoleSchema);
exports.default = role;
//# sourceMappingURL=role.js.map