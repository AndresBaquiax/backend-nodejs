import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import catergoriasRoutes from './routes/categorias.routes';
import rolesRoutes from './routes/roles.routes';
import usuariosRoutes from './routes/usuarios.routes';
import productosRoutes from './routes/productos.routes';
import pedidosRoutes from './routes/pedidos.routes';
import detallepedidoRoutes from './routes/detallepedido.routes';
import operacionesstockRoutes from './routes/operacionesstock.routes';
import authRoutes from './routes/auth.routes';
import { verifyToken } from './controllers/auth.controller';

dotenv.config();
const app = express();

//Settings
app.set('port', config.port);

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}));

//Routes
app.use(authRoutes);
app.use(verifyToken);
app.use(catergoriasRoutes);
app.use(rolesRoutes);
app.use(usuariosRoutes);
app.use(productosRoutes);
app.use(pedidosRoutes);
app.use(detallepedidoRoutes);
app.use(operacionesstockRoutes);

export default app;