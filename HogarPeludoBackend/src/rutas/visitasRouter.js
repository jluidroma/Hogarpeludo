import express from "express";
import { actualizar, buscar, buscarId, crear, eliminar } from "../controladores/visitasController.js";

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
routerVisitas.post("/", (req, res) => {
    crear(req, res);
});

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
routerVisitas.get("/", (req, res) => {
    buscar(req, res);
});

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
routerVisitas.get("/:id", (req, res) => {
    buscarId(req, res);
});

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
routerVisitas.put("/:id", (req, res) => {
    actualizar(req, res);
});

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
routerVisitas.delete("/:id", (req, res) => {
    eliminar(req, res);
});

export { routerVisitas };
