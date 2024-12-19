import { request } from "express";
import { getConnection, sql, querysOperacionesStock } from "../database";

export const getOperacionesStock = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querysOperacionesStock.getOperacionesStock);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const postOperacionesStock = async (req, res) => {
    const { cantidad, fecha_operacion, motivo, id_producto } = req.body;

    if (cantidad == null || fecha_operacion == null || motivo == null || id_producto == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    try {
        const pool = await getConnection()
        await pool.request()
            .input("cantidad", sql.Int, cantidad)
            .input("fecha_operacion", sql.Date, fecha_operacion)
            .input("motivo", sql.VarChar, motivo)
            .input("id_producto", sql.Int, id_producto)
            .query(querysOperacionesStock.postOperacionesStock);

        res.json({ cantidad, fecha_operacion, motivo, id_producto });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getOperacionesStockById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysOperacionesStock.getOperacionStockById);

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

export const putOperacionesStock = async (req, res) => {
    const { id } = req.params;
    const { cantidad, fecha_operacion, motivo, id_producto } = req.body;

    if (cantidad == null || fecha_operacion == null || motivo == null || id_producto == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input("id", sql.Int, id)
        .input("cantidad", sql.Int, cantidad)
        .input("fecha_operacion", sql.Date, fecha_operacion)
        .input("motivo", sql.VarChar, motivo)
        .input("id_producto", sql.Int, id_producto)
        .query(querysOperacionesStock.putOperacionesStock);

        res.json({ cantidad, fecha_operacion, motivo, id_producto });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
