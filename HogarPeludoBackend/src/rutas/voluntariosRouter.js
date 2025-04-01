import express from "express";
import {actualizar,buscar,buscarId,crear,eliminar} from "../controladores/voluntariosController.js";

const routerVoluntarios = express.Router();

/**
 * @swagger
 * /voluntarios/crearvoluntario:
 *   post:
 *     summary: Agrega un nuevo voluntario
 *     tags: [Voluntarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Perez"
 *               telefono:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: Voluntario creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
routerVoluntarios.post("/crearvoluntario",(req,res)=>{
     crear(req,res);
});

/**
 * @swagger
 * /voluntarios/buscarvoluntario:
 *   get:
 *     summary: Obtiene la lista de voluntarios
 *     tags: [Voluntarios]
 *     responses:
 *       200:
 *         description: Lista de voluntarios
 */
routerVoluntarios.get("/buscarvoluntario",(req,res)=>{
     buscar(req,res);
});

/**
 * @swagger
 * /voluntarios/buscarvoluntarioid/{id}:
 *   get:
 *     summary: Busca un voluntario por ID
 *     tags: [Voluntarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Información del voluntario
 *       404:
 *         description: Voluntario no encontrado
 */
routerVoluntarios.get("/buscarvoluntarioid/:id",(req,res)=>{
     buscarId(req,res);
});

/**
 * @swagger
 * /voluntarios/actualizarvoluntario/{id}:
 *   put:
 *     summary: Actualiza los datos de un voluntario
 *     tags: [Voluntarios]
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
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Voluntario actualizado correctamente
 *       400:
 *         description: Error en la solicitud
 */
routerVoluntarios.put("/actualizarvoluntario/:id",(req,res)=>{
     actualizar(req,res);
});

/**
 * @swagger
 * /voluntarios/eliminarvoluntario/{id}:
 *   delete:
 *     summary: Elimina un voluntario por ID
 *     tags: [Voluntarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Voluntario eliminado correctamente
 *       404:
 *         description: Voluntario no encontrado
 */
routerVoluntarios.delete("/eliminarvoluntario/:id",(req,res)=>{
     eliminar(req,res);
})

export {routerVoluntarios};
