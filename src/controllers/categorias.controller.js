import { request } from "express";
import { getConnection, sql, querysCategorias } from "../database";

export const getCategorias = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querysCategorias.getCategorias);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const crearCategoria = async (req, res) => {
    const { nombre_categoria } = req.body;
    let { estado } = req.body;

    if (nombre_categoria == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    if (estado == null) estado = 'True';

    try {
        const pool = await getConnection()
        await pool.request()
            .input("nombre_categoria", sql.VarChar, nombre_categoria)
            .input("estado", sql.Bit, estado)
            .query(querysCategorias.postCategorias);

        res.json({ nombre_categoria, estado });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getCategoriaById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysCategorias.getCategoriaById);

        if (result.recordset.length > 0) {
            res.send(result.recordset[0]); // Devuelve solo el primer registro
        } else {
            res.status(404).send('Categoria no encontrada');
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const putCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre_categoria, estado } = req.body;

    if (nombre_categoria == null || estado == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input("id", sql.Int, id)
        .input("nombre_categoria", sql.VarChar, nombre_categoria)
        .input("estado", sql.VarChar, estado)
        .query(querysCategorias.putCategorias);

        res.json({ nombre_categoria, estado });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const alternarEstadoCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysCategorias.alternarEstadoCategorias);
        res.sendStatus(204);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
