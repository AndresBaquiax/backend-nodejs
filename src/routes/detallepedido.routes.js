import { Router } from "express";
import { getDetallePedido, getDetallePedidoById, postDetallePedido, putDetallePedido } from "../controllers/detallepedido.controller";

const router = Router();

//Obtener un detalle pedido
router.get("/detallepedido/:id", getDetallePedidoById);
//Obtener detallepedido
router.get("/detallepedido", getDetallePedido);
//Crear detallepedido
router.post("/detallepedido", postDetallePedido); 
//Actualizar detallepedido
router.put("/detallepedido/:id", putDetallePedido);


export default router;