import express from "express";
import {actualizar,buscar,buscarId,crear,eliminar} from "../controladores/voluntariosController.js";

const routerVoluntarios = express.Router();

//para agregar un voluntario
routerVoluntarios.post("/crearvoluntario",(req,res)=>{
     crear(req,res);
});
//para buscar todos los voluntarios
routerVoluntarios.get("/buscarvoluntario",(req,res)=>{
     buscar(req,res);
});
//para buscar un voluntario por id
routerVoluntarios.get("/buscarvoluntarioid/:id",(req,res)=>{
     buscarId(req,res);
});
//para actualizar datos de un voluntario
routerVoluntarios.put("/actualizarvoluntario/:id",(req,res)=>{
     actualizar(req,res);
});
//para eliminar un voluntario
routerVoluntarios.delete("/eliminarvoluntario/:id",(req,res)=>{
     eliminar(req,res);
})

export {routerVoluntarios}