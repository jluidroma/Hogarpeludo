import express from "express";
import { actualizar, buscar, buscarId, crear, eliminar } from "../controladores/visitasController.js";
import { verificarAdmin,verificarToken } from "../middlewares/auth.js";

const routerVisitas = express.Router();

/**
 * @swagger
 * /visitas:
 *   post:
 *     summary: Crea una nueva visita
 *     tags: [Visitas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visita creada exitosamente
 *       400:
 *         description: Datos incorrectos o incompletos
 */
routerVisitas.post("/",verificarToken,verificarAdmin,crear);

/**
 * @swagger
 * /visitas/:
 *   get:
 *     summary: Obtiene todas las visitas
 *     tags: [Visitas]
 *     responses:
 *       200:
 *         description: Lista de visitas obtenida correctamente
 */
routerVisitas.get("/",buscar);

/**
 * @swagger
 * /visitas/{id}:
 *   get:
 *     summary: Busca una visita por ID
 *     tags: [Visitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la visita
 *     responses:
 *       200:
 *         description: Datos de la visita encontrados
 *       404:
 *         description: Visita no encontrada
 */
routerVisitas.get("/:id",verificarToken,verificarAdmin,buscarId);

/**
 * @swagger
 * /visitas/{id}:
 *   put:
 *     summary: Actualiza una visita por ID
 *     tags: [Visitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la visita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Visita actualizada correctamente
 *       400:
 *         description: Error en la solicitud
 */
routerVisitas.put("/:id",verificarToken,verificarAdmin,actualizar);

/**
 * @swagger
 * /visitas/{id}:
 *   delete:
 *     summary: Elimina una visita por ID
 *     tags: [Visitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la visita
 *     responses:
 *       200:
 *         description: Visita eliminada correctamente
 *       404:
 *         description: Visita no encontrada
 */
routerVisitas.delete("/:id",verificarToken,verificarAdmin,eliminar);

export { routerVisitas };
