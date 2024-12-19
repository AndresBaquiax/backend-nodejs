import { request } from "express";
import { getConnection, sql, querysUsuarios } from "../database";
import bcrypt from "bcryptjs";

export const getUsuarios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querysUsuarios.getUsuarios);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const postUsuarios = async (req, res) => {
    const { contrasena, email, nombre_completo, direccion, telefono, id_rol } = req.body;
    let { estado, fecha_creacion } = req.body;

    if (contrasena == null || email == null || nombre_completo == null || direccion == null || telefono == null || id_rol == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    if (estado == null) estado = 'True';
    if (fecha_creacion == null) fecha_creacion = new Date();

    try {
        const pool = await getConnection()
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        await pool.request()
            .input("contrasena", sql.VarChar, hashedPassword)
            .input("email", sql.VarChar, email)
            .input("nombre_completo", sql.VarChar, nombre_completo)
            .input("direccion", sql.VarChar, direccion)
            .input("telefono", sql.VarChar, telefono)
            .input("fecha_creacion", sql.DateTime, fecha_creacion)
            .input("estado", sql.Bit, estado)
            .input("id_rol", sql.Int, id_rol)
            .query(querysUsuarios.postUsuarios);

        res.json({ hashedPassword, email, nombre_completo, direccion, telefono, fecha_creacion, estado, id_rol });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysUsuarios.getUsuarioById);

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

export const putUsuarios = async (req, res) => {
    const { id } = req.params;
    const { contrasena, email, nombre_completo, direccion, telefono, fecha_creacion, estado, id_rol } = req.body;

    if (contrasena == null || email == null || nombre_completo == null || direccion == null || telefono == null || fecha_creacion == null || estado == null || id_rol == null) {
        return res.status(400).json({ msg: 'Mala peticion. Porfavor llenar todos los campos' });
    }

    try {
        const pool = await getConnection();
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        await pool.request()
        .input("id", sql.Int, id)
        .input("contrasena", sql.VarChar, hashedPassword)
        .input("email", sql.VarChar, email)
        .input("nombre_completo", sql.VarChar, nombre_completo)
        .input("direccion", sql.VarChar, direccion)
        .input("telefono", sql.VarChar, telefono)
        .input("fecha_creacion", sql.DateTime, fecha_creacion)
        .input("estado", sql.Bit, estado)
        .input("id_rol", sql.Int, id_rol)
        .query(querysUsuarios.putUsuarios);

        res.json({ hashedPassword, email, nombre_completo, direccion, telefono, fecha_creacion, estado, id_rol });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const alternarEstadoUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("id", id)
        .query(querysUsuarios.alternarEstadoUsuario);
        res.sendStatus(204);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
