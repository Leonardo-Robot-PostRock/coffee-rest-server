import { Request, Response } from "express";

import { RoleService } from "../../services/role.service";

export const buildRoleController = (roleService: RoleService) => ({
    getRoles: async (req: Request, res: Response) => {
        const roles = await roleService.getRolesService();
        
        res.status(200).json(roles);
    },

    getRoleById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const role = await roleService.getRoleByIdService(id);
        res.status(200).json(role);
    },

    createRole: async (req: Request, res: Response) => {
        const { roleName } = req.body;
        
        const addedBy = req.user!.uid;

        const createdRole = await roleService.createRoleService(roleName, addedBy);

        res.status(201).json({ role: createdRole });
    },

    updateRole: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { roleName } = req.body;
        const updatedBy = req.user!.uid;

        const updatedRole = await roleService.updateRoleService(id, roleName, updatedBy);

        res.status(200).json({ role: updatedRole });
    },

    deleteRole: async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedBy = req.user!.uid;

        const deletedRole = await roleService.deleteRoleService(id, updatedBy);

        res.status(200).json({ role: deletedRole });
    }
})