export const querysAuth = {
    //TABLA USUARIOS
    login: 'EXEC AutenticarUsuario @email'
};

export const querysCategorias = {
    //TABLA CATEGORIAS
    getCategorias: 'SELECT * FROM vista_categorias_activas;',
    getCategoriaById: 'EXEC ObtenerCategoriaPorID @id',
    postCategorias: 'EXEC InsertarCategoria @nombre_categoria, @estado',
    putCategorias: 'EXEC ActualizarCategoria @id, @nombre_categoria, @estado',
    alternarEstadoCategorias: 'EXEC AlternarEstadoCategoria @id',
};

export const querysRoles = {
    //TABLA ROLES
    getRoles: 'SELECT * FROM vista_roles_activos', 
    getRolById: 'EXEC ObtenerRolPorID @id',
    postRoles: 'EXEC InsertarRol @nombre_rol, @nivel_acceso_rol, @estado',
    putRoles: 'EXEC ActualizarRol @id, @nombre_rol, @nivel_acceso_rol, @estado',
    alternarEstadoRol: 'EXEC AlternarEstadoRoles @id;',
};

export const querysProductos = {
    //TABLA PRODUCTOS
    getProductos: 'SELECT * FROM vista_productos_activos',
    getProductoById: 'EXEC ObtenerProductoPorID @id',
    postProductos: 'EXEC InsertarProducto @nombre, @descripcion, @precio_venta, @stock, @imagenurl, @estado, @id_categoria',
    putProductos: 'EXEC ActualizarProducto @id, @nombre, @descripcion, @precio_venta, @stock, @imagenurl, @estado, @id_categoria',
    alternarEstadoProducto: 'EXEC AlternarEstadoProductos @id',
};

export const querysUsuarios = {
    //TABLA USUARIOS
    getUsuarios: 'SELECT * FROM vista_usuarios_activos',
    getUsuarioById: 'EXEC ObtenerUsuarioPorID @id',
    postUsuarios: 'EXEC InsertarUsuario @contrasena, @email, @nombre_completo, @direccion, @telefono, @fecha_creacion, @estado, @id_rol',
    putUsuarios: 'EXEC ActualizarUsuario @id, @contrasena, @email, @nombre_completo, @direccion, @telefono, @fecha_creacion, @estado, @id_rol',
    alternarEstadoUsuario: 'EXEC AlternarEstadoUsuarios @id;',
};

export const querysPedidos = {
    //TABLA PEDIDOS
    getPedidos: 'SELECT * FROM vista_pedidos',
    getPedidoById: 'EXEC ObtenerPedidoPorID @id',
    postPedidos: 'EXEC InsertarPedido @fecha_pedido, @estado_pedido, @id_usuario',
    putPedidos: 'EXEC ActualizarPedido @id, @fecha_pedido, @estado_pedido, @id_usuario'
};

export const querysDetallePedido = {
    //TABLA DETALLE_PEDIDO
    getDetallePedido: 'SELECT * FROM vista_detalle_pedido',
    getDetallePedidoById: 'EXEC ObtenerDetallePedidoPorID @id',
    postDetallePedido: 'EXEC InsertarDetallePedido @cantidad, @precio_unitario, @id_producto, @id_pedido',
    putDetallePedido: 'EXEC ActualizarDetallePedido @id, @cantidad, @precio_unitario, @id_producto, @id_pedido'
};

export const querysOperacionesStock = {
    //TABLA OPERACIONES_STOCK
    getOperacionesStock: 'SELECT * FROM vista_operaciones_stock',
    getOperacionStockById: 'EXEC ObtenerOperacionStockPorID @id',
    postOperacionesStock: 'EXEC InsertarOperacionStock @cantidad, @fecha_operacion, @motivo, @id_producto',
    putOperacionesStock: 'EXEC ActualizarOperacionStock @id, @cantidad, @fecha_operacion, @motivo, @id_producto'
};

