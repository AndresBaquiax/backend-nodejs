import { request } from "express";
import { getConnection, sql, querysProductos } from "../database";

export const getProductos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querysProductos.getProductos);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const postProductos = async (req, res) => {
    const { nombre, descripcion, precio_venta, stock, imagenurl, id_categoria } = req.body;
    let { estado } = req.body;

    if (nombre == null || descripcion == null || precio_venta == null || stock == null || imagenurl == null || id_categoria == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    if (estado == null) estado = 'True';

    try {
        const pool = await getConnection()
        await pool.request()
            .input("nombre", sql.VarChar, nombre)
            .input("descripcion", sql.VarChar, descripcion)
            .input("precio_venta", sql.Decimal, precio_venta)
            .input("stock", sql.Int, stock)
            .input("imagenurl", sql.VarChar, imagenurl)
            .input("estado", sql.Bit, estado)
            .input("id_categoria", sql.Int, id_categoria)
            .query(querysProductos.postProductos);

        res.json({ nombre, descripcion, precio_venta, stock, imagenurl, estado, id_categoria });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysProductos.getProductoById);

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

export const putProductos = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio_venta, stock, imagenurl, estado, id_categoria } = req.body;

    if (nombre == null || descripcion == null || precio_venta == null || stock == null || imagenurl == null || id_categoria == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input("id", sql.Int, id)
        .input("nombre", sql.VarChar, nombre)
        .input("descripcion", sql.VarChar, descripcion)
        .input("precio_venta", sql.Decimal, precio_venta)
        .input("stock", sql.Int, stock)
        .input("imagenurl", sql.VarChar, imagenurl)
        .input("estado", sql.Bit, estado)
        .input("id_categoria", sql.Int, id_categoria)
        .query(querysProductos.putProductos);

        res.json({ nombre, descripcion, precio_venta, stock, imagenurl, estado, id_categoria });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const alternarEstadoProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysProductos.alternarEstadoProducto);
        res.sendStatus(204);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
