import { request } from "express";
import { getConnection, sql, querysRoles } from "../database";

export const getRoles = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querysRoles.getRoles);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const postRoles = async (req, res) => {
    const { nombre_rol, nivel_acceso_rol } = req.body;
    let { estado } = req.body;

    if (nombre_rol == null || nivel_acceso_rol == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    if (estado == null) estado = 'True';

    try {
        const pool = await getConnection()
        await pool.request()
            .input("nombre_rol", sql.VarChar, nombre_rol)
            .input("nivel_acceso_rol", sql.Int, nivel_acceso_rol)
            .input("estado", sql.Bit, estado)
            .query(querysRoles.postRoles);

        res.json({ nombre_rol, nivel_acceso_rol, estado });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getRolById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysRoles.getRolById);

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

export const putRoles = async (req, res) => {
    const { id } = req.params;
    const { nombre_rol, nivel_acceso_rol, estado } = req.body;

    if (nombre_rol == null || nivel_acceso_rol == null || estado == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input("id", sql.Int, id)
        .input("nombre_rol", sql.VarChar, nombre_rol)
        .input("nivel_acceso_rol", sql.Int, nivel_acceso_rol)
        .input("estado", sql.VarChar, estado)
        .query(querysRoles.putRoles);

        res.json({ nombre_rol, nivel_acceso_rol, estado });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const alternarEstadoRol = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysRoles.alternarEstadoRol);
        res.sendStatus(204);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
