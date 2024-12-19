import { request } from "express";
import { getConnection, sql, querysPedidos } from "../database";

export const getPedidos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querysPedidos.getPedidos);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const postPedidos = async (req, res) => {
    const { fecha_pedido, estado_pedido, id_usuario } = req.body;

    if (fecha_pedido == null || id_usuario == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    if (estado_pedido == null) estado = 'Pendiente';

    try {
        const pool = await getConnection()
        await pool.request()
            .input("fecha_pedido", sql.Date, fecha_pedido)
            .input("estado_pedido", sql.VarChar, estado_pedido)
            .input("id_usuario", sql.Int, id_usuario)
            .query(querysPedidos.postPedidos);

        res.json({ fecha_pedido, estado_pedido, id_usuario });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getPedidoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysPedidos.getPedidoById);

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

export const putPedidos = async (req, res) => {
    const { id } = req.params;
    const {fecha_pedido, estado_pedido, id_usuario } = req.body;

    if (fecha_pedido == null || estado_pedido == null || id_usuario == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input("id", sql.Int, id)
        .input("fecha_pedido", sql.Date, fecha_pedido)
        .input("estado_pedido", sql.VarChar, estado_pedido)
        .input("id_usuario", sql.Int, id_usuario)
        .query(querysPedidos.putPedidos);

        res.json({ fecha_pedido, estado_pedido, id_usuario });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
