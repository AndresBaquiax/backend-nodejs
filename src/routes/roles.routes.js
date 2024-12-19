import { Router } from "express";
import { alternarEstadoRol, getRolById, getRoles, postRoles, putRoles } from "../controllers/roles.controller";

const router = Router();

//Obtener un rol
router.get("/roles/:id", getRolById);
//Obtener roles
router.get("/roles", getRoles);
//Crear roles
router.post("/roles", postRoles); 
//Actualizar roles
router.put("/roles/:id", putRoles);
//Eliminar roles
router.delete("/roles/:id", alternarEstadoRol);


export default router;