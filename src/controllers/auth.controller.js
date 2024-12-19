import jwt from 'jsonwebtoken';
import { getConnection, sql, querysAuth} from '../database';
import bcrypt from 'bcryptjs';
import config from '../config'

const secretKey = config.secretKey; 

export const login = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('EXEC AutenticarUsuario @email');

        const user = result.recordset[0];

        if (user && user.Estado === 1) {
            const validPassword = await bcrypt.compare(contrasena, user.Hashed_Password);
            if (validPassword) {
                const token = jwt.sign({ id: user.ID_Usuario }, secretKey, { expiresIn: '24h' });
                res.json({ token, user });
            } else {
                res.status(401).json({ message: 'Contraseña incorrecta.' });
            }
        } else {
            res.status(401).json({ message: 'Email no encontrado.' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};