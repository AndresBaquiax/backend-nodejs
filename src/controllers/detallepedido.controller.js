import { request } from "express";
import { getConnection, sql, querysDetallePedido } from "../database";

export const getDetallePedido = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querysDetallePedido.getDetallePedido);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const postDetallePedido = async (req, res) => {
    const { cantidad, precio_unitario, id_producto, id_pedido } = req.body;

    if (cantidad == null || precio_unitario == null || id_producto == null || id_pedido == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    try {
        const pool = await getConnection()
        await pool.request()
            .input("cantidad", sql.Int, cantidad)
            .input("precio_unitario", sql.Decimal, precio_unitario)
            .input("id_producto", sql.Int, id_producto)
            .input("id_pedido", sql.Int, id_pedido)
            .query(querysDetallePedido.postDetallePedido);

        res.json({ cantidad, precio_unitario, id_producto, id_pedido });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getDetallePedidoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysDetallePedido.getDetallePedidoById);

        if (result.recordset.length > 0) {
            res.send(result.recordset[0]); // Devuelve solo el primer registro
        } else {
            res.status(404).send('Peticion no encontrada');
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const putDetallePedido = async (req, res) => {
    const { id } = req.params;
    const { cantidad, precio_unitario, id_producto, id_pedido } = req.body;

    if (cantidad == null || precio_unitario == null || id_producto == null || id_pedido == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input("id", sql.Int, id)
        .input("cantidad", sql.Int, cantidad)
        .input("precio_unitario", sql.Decimal, precio_unitario)
        .input("id_producto", sql.Int, id_producto)
        .input("id_pedido", sql.Int, id_pedido)
        .query(querysDetallePedido.putDetallePedido);

        res.json({ cantidad, precio_unitario, id_producto, id_pedido });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
