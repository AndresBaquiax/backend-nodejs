import { Router } from "express";
import { alternarEstadoUsuario, getUsuarioById, getUsuarios, postUsuarios, putUsuarios } from "../controllers/usuarios.controller";

const router = Router();

//Obtener un usuario
router.get("/usuarios/:id", getUsuarioById);
//Obtener usuarios
router.get("/usuarios", getUsuarios);
//Crear usuarios
router.post("/usuarios", postUsuarios); 
//Actualizar usuarios
router.put("/usuarios/:id", putUsuarios);
//Eliminar usuarios
router.delete("/usuarios/:id", alternarEstadoUsuario);


export default router;