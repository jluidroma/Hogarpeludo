import express from "express";
import { crearSolicitud, buscarSolicitud, buscarSolicitudId, actualizarSolicitud, eliminarSolicitud } from "../controladores/solicitudesController.js";
import { verificarAdmin,verificarToken } from "../middlewares/auth.js";

const routerSolicitud = express.Router();

/**
 * @swagger
 * /solicitudes/{id_mascota}:
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
routerSolicitud.post("/:id_mascota",verificarToken,verificarAdmin, crearSolicitud);

/**
 * @swagger
 * /solicitudes:
 *   get:
 *     summary: Obtiene todas las solicitudes de adopción
 *     tags: [Solicitudes]
 *     responses:
 *       200:
 *         description: Lista de solicitudes obtenida correctamente
 */
routerSolicitud.get("/", buscarSolicitud);

/**
 * @swagger
 * /solicitudes/{id}:
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
routerSolicitud.get("/:id",verificarToken,verificarAdmin, buscarSolicitudId);

/**
 * @swagger
 * /solicitud/{id}:
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
routerSolicitud.put("/:id",verificarToken,verificarAdmin, actualizarSolicitud);

/**
 * @swagger
 * /solicitudes/{id}:
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
routerSolicitud.delete("/:id",verificarToken,verificarAdmin, eliminarSolicitud);

export { routerSolicitud };