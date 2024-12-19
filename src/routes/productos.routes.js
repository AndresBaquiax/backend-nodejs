import { Router } from "express";
import { alternarEstadoProducto, getProductoById, getProductos, postProductos, putProductos } from "../controllers/productos.controller";

const router = Router();

//Obtener un producto
router.get("/productos/:id", getProductoById);
//Obtener productos
router.get("/productos", getProductos);
//Crear productos
router.post("/productos", postProductos); 
//Actualizar productos
router.put("/productos/:id", putProductos);
//Eliminar productos
router.delete("/productos/:id", alternarEstadoProducto);


export default router;