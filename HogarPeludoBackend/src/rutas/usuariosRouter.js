import express from "express";
import { actualizar, buscar, buscarId, crear, eliminar } from "../controladores/usuariosController.js";

const routerUsuarios = express.Router();

/**
 * @swagger
 * /usuarios/crearusuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos incorrectos o incompletos
 */
routerUsuarios.post("/crearusuario", (req, res) => {
    crear(req, res);
});

/**
 * @swagger
 * /usuarios/buscarusuario:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */
routerUsuarios.get("/buscarusuario", (req, res) => {
    buscar(req, res);
});

/**
 * @swagger
 * /usuarios/buscarusuarioid/{id}:
 *   get:
 *     summary: Busca un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario encontrados
 *       404:
 *         description: Usuario no encontrado
 */
routerUsuarios.get("/buscarusuarioid/:id", (req, res) => {
    buscarId(req, res);
});

/**
 * @swagger
 * /usuarios/actualizarusuario/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error en la solicitud
 */
routerUsuarios.put("/actualizarusuario/:id", (req, res) => {
    actualizar(req, res);
});

/**
 * @swagger
 * /usuarios/eliminarusuario/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
routerUsuarios.delete("/eliminarusuario/:id", (req, res) => {
    eliminar(req, res);
});

export { routerUsuarios };
