import express from "express";
import { crearSolicitud, buscarSolicitud, buscarSolicitudId, actualizarSolicitud, eliminarSolicitud } from "../controladores/solicitudesController.js";

const routerSolicitud = express.Router();

/**
 * @swagger
 * /solicitud/crearsolicitud/{id_mascota}:
 *   post:
 *     summary: Crea una nueva solicitud de adopción
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id_mascota
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la mascota a adoptar
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
 *               telefono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 *       400:
 *         description: Datos incorrectos o incompletos
 */
routerSolicitud.post("/crearsolicitud/:id_mascota", (req, res) => {
    crearSolicitud(req, res);
});

/**
 * @swagger
 * /solicitud/buscarsolicitudes:
 *   get:
 *     summary: Obtiene todas las solicitudes de adopción
 *     tags: [Solicitudes]
 *     responses:
 *       200:
 *         description: Lista de solicitudes obtenida correctamente
 */
routerSolicitud.get("/buscarsolicitudes", (req, res) => {
    buscarSolicitud(req, res);
});

/**
 * @swagger
 * /solicitud/buscarsolicitudid/{id}:
 *   get:
 *     summary: Busca una solicitud de adopción por ID
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Datos de la solicitud encontrados
 *       404:
 *         description: Solicitud no encontrada
 */
routerSolicitud.get("/buscarsolicitudid/:id", (req, res) => {
    buscarSolicitudId(req, res);
});

/**
 * @swagger
 * /solicitud/actualizarsolicitud/{id}:
 *   put:
 *     summary: Actualiza una solicitud de adopción por ID
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
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
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitud actualizada correctamente
 *       400:
 *         description: Error en la solicitud
 */
routerSolicitud.put("/actualizarsolicitud/:id", (req, res) => {
    actualizarSolicitud(req, res);
});

/**
 * @swagger
 * /solicitud/eliminarsolicitud/{id}:
 *   delete:
 *     summary: Elimina una solicitud de adopción por ID
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Solicitud eliminada correctamente
 *       404:
 *         description: Solicitud no encontrada
 */
routerSolicitud.delete("/eliminarsolicitud/:id", (req, res) => {
    eliminarSolicitud(req, res);
});

export { routerSolicitud };