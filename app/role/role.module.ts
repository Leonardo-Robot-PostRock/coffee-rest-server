// Repository (Data Access Layer - infrastructure)
import { MongooseRoleRepository } from "../infrastructure/persistence/mongoose/role/repository/mongo-role.repository";

// Application Service Layer
import { RoleService } from "./services/role.service";

// Controller (Presentation Layer)
import { buildRoleController } from "./presentation/api/role.controller";


// Module Assembler
const roleRepository = new MongooseRoleRepository();
const roleService = new RoleService(roleRepository);

// Controller already built with the service
export const roleController = buildRoleController(roleService);