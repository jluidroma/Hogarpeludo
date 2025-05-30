import express from "express";
import { actualizar, buscar, buscarId, crear, eliminar } from "../controladores/refugiosController.js";
import { verificarAdmin,verificarToken } from "../middlewares/auth.js";

const routerRefugios = express.Router();

/**
 * @swagger
 * /refugios:
 *   post:
 *     summary: Agrega un nuevo refugio
 *     tags: [Refugios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Refugio Esperanza"
 *               direccion:
 *                 type: string
 *                 example: "Calle 123, Ciudad X"
 *     responses:
 *       201:
 *         description: Refugio creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
routerRefugios.post("/",verificarToken,verificarAdmin,crear);

/**
 * @swagger
 * /refugios:
 *   get:
 *     summary: Obtiene la lista de refugios
 *     tags: [Refugios]
 *     responses:
 *       200:
 *         description: Lista de refugios obtenida exitosamente
 */
routerRefugios.get("/",buscar);

/**
 * @swagger
 * /refugios/{id}:
 *   get:
 *     summary: Busca un refugio por ID
 *     tags: [Refugios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Información del refugio
 *       404:
 *         description: Refugio no encontrado
 */
routerRefugios.get("/:id",buscarId);

/**
 * @swagger
 * /refugios/{id}:
 *   put:
 *     summary: Actualiza los datos de un refugio
 *     tags: [Refugios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Refugio actualizado correctamente
 *       400:
 *         description: Error en la solicitud
 */
routerRefugios.put("/:id",verificarToken,verificarAdmin,actualizar);

/**
 * @swagger
 * /refugios/{id}:
 *   delete:
 *     summary: Elimina un refugio por ID
 *     tags: [Refugios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Refugio eliminado correctamente
 *       404:
 *         description: Refugio no encontrado
 */
routerRefugios.delete("/:id",verificarToken,verificarAdmin, eliminar);

export { routerRefugios };
