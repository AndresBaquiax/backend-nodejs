import { Router } from "express";
import { crearCategoria, getCategorias, getCategoriaById, putCategoria, alternarEstadoCategoria} from "../controllers/categorias.controller";

const router = Router();

//Obtener una categoria
router.get("/categorias/:id", getCategoriaById);
//Obtener categorias
router.get("/categorias", getCategorias);
//Crear categorias
router.post("/categorias", crearCategoria); 
//Actualizar categorias
router.put("/categorias/:id", putCategoria);
//Eliminar categorias
router.delete("/categorias/:id", alternarEstadoCategoria);


export default router;