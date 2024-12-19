import { Router } from "express";
import { getOperacionesStock, getOperacionesStockById, postOperacionesStock, putOperacionesStock } from "../controllers/operacionesstock.controller";

const router = Router();

//Obtener una operacionesstock
router.get("/operacionesstock/:id", getOperacionesStockById);
//Obtener operacionesstock
router.get("/operacionesstock", getOperacionesStock);
//Crear operacionesstock
router.post("/operacionesstock", postOperacionesStock); 
//Actualizar operacionesstock
router.put("/operacionesstock/:id", putOperacionesStock);


export default router;