import express from "express";
import { actualizar, buscar, buscarId, crear, eliminar } from "../controladores/mascotasController.js";

const routerMascotas = express.Router();

/**
 * @swagger
 * /mascotas:
 *   post:
 *     summary: Agrega una nueva mascota
 *     tags: [Mascotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Firulais"
 *               edad:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
routerMascotas.post("/", crear);

/**
 * @swagger
 * /mascotas/:
 *   get:
 *     summary: Obtiene la lista de mascotas
 *     tags: [Mascotas]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 */
routerMascotas.get("/", buscar);

/**
 * @swagger
 * /mascotas/{id}:
 *   get:
 *     summary: Busca una mascota por ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Información de la mascota
 *       404:
 *         description: Mascota no encontrada
 */
routerMascotas.get("/:id", buscarId);

/**
 * @swagger
 * /mascotas/{id}:
 *   put:
 *     summary: Actualiza los datos de una mascota
 *     tags: [Mascotas]
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
 *               edad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Mascota actualizada correctamente
 *       400:
 *         description: Error en la solicitud
 */
routerMascotas.put("/:id", actualizar);

/**
 * @swagger
 * /mascotas/{id}:
 *   delete:
 *     summary: Elimina una mascota por ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mascota eliminada correctamente
 *       404:
 *         description: Mascota no encontrada
 */
routerMascotas.delete("/:id", eliminar);

export { routerMascotas };