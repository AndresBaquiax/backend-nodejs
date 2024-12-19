import { Router } from "express";
import { getPedidoById, getPedidos, postPedidos, putPedidos } from "../controllers/pedidos.controller";

const router = Router();

//Obtener un pedido
router.get("/pedidos/:id", getPedidoById);
//Obtener pedidos
router.get("/pedidos", getPedidos);
//Crear pedidos
router.post("/pedidos", postPedidos); 
//Actualizar pedidos
router.put("/pedidos/:id", putPedidos);


export default router;