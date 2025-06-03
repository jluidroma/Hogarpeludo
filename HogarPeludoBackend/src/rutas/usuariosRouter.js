import express from 'express';
import {
  crearUsuario,
  listarUsuarios,
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuarioPorId
} from '../controladores/usuariosController.js'


import { verificarToken, verificarAdmin } from '../middlewares/auth.js';

const routerUsuarios = express.Router();

// Crear usuario (solo admins)
routerUsuarios.post('/',crearUsuario);

// Listar todos los usuarios (solo admins)
routerUsuarios.get('/', verificarToken, verificarAdmin, listarUsuarios);

// Obtener un usuario por UID (solo admins)
routerUsuarios.get('/:id', verificarToken, verificarAdmin, buscarUsuarioPorId);

// Actualizar usuario (solo admins)
routerUsuarios.put('/:id', verificarToken, verificarAdmin, actualizarUsuario);

// Eliminar usuario (solo admins)
routerUsuarios.delete('/:id', verificarToken, verificarAdmin, eliminarUsuario);

export { routerUsuarios };
