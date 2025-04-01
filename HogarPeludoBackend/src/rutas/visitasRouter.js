import express from "express";
import { actualizar, buscar, buscarId, crear, eliminar } from "../controladores/visitasController.js";

const routerVisitas = express.Router();

/**
 * @swagger
 * /visitas/crearvisita:
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
routerVisitas.post("/crearvisita", (req, res) => {
    crear(req, res);
});

/**
 * @swagger
 * /visitas/buscarvisita:
 *   get:
 *     summary: Obtiene todas las visitas
 *     tags: [Visitas]
 *     responses:
 *       200:
 *         description: Lista de visitas obtenida correctamente
 */
routerVisitas.get("/buscarvisita", (req, res) => {
    buscar(req, res);
});

/**
 * @swagger
 * /visitas/buscarvisitaid/{id}:
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
routerVisitas.get("/buscarvisitaid/:id", (req, res) => {
    buscarId(req, res);
});

/**
 * @swagger
 * /visitas/actualizarvisita/{id}:
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
routerVisitas.put("/actualizarvisita/:id", (req, res) => {
    actualizar(req, res);
});

/**
 * @swagger
 * /visitas/eliminarvisita/{id}:
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
routerVisitas.delete("/eliminarvisita/:id", (req, res) => {
    eliminar(req, res);
});

export { routerVisitas };
