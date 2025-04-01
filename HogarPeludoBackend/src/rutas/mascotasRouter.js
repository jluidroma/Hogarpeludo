import express from "express";
import { actualizar, buscar, buscarId, crear, eliminar } from "../controladores/mascotasController.js";

const routerMascotas = express.Router();

/**
 * @swagger
 * /mascotas/crearmascota:
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
routerMascotas.post("/crearmascota", crear);

/**
 * @swagger
 * /mascotas/buscarmascotas:
 *   get:
 *     summary: Obtiene la lista de mascotas
 *     tags: [Mascotas]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 */
routerMascotas.get("/buscarmascotas", buscar);

/**
 * @swagger
 * /mascotas/buscarmascotaid/{id}:
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
routerMascotas.get("/buscarmascotaid/:id", buscarId);

/**
 * @swagger
 * /mascotas/actualizarmascota/{id}:
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
routerMascotas.put("/actualizarmascota/:id", actualizar);

/**
 * @swagger
 * /mascotas/eliminarmascota/{id}:
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
routerMascotas.delete("/eliminarmascota/:id", eliminar);

export { routerMascotas };