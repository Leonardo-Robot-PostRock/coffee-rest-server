"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const isRoleValid = ((...args_1) => __awaiter(void 0, [...args_1], void 0, function* (role = '') {
    const roleExists = yield role_1.default.findOne({ role });
    if (!roleExists) {
        throw new Error(`The ${role} is not in the database`);
    }
}));
const checkEmailExists = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (email = '') {
    const emailExists = yield user_1.default.findOne({ email });
    if (emailExists) {
        throw new Error(`The email: ${email} already exists.`);
    }
});
const checkUserByIdExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_1.default.findById(id);
    if (!userExists) {
        throw new Error(`The id, ${id} doesn't exist`);
    }
});
module.exports = {
    isRoleValid,
    checkEmailExists,
    checkUserByIdExists
};
//# sourceMappingURL=db-validators.js.map