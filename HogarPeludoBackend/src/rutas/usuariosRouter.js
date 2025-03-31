import express from "express";
import {actualizar,buscar,buscarId,crear,eliminar} from "../controladores/usuariosController.js";

const routerUsuarios = express.Router();

//para agregar una usuario
routerUsuarios.post("/crearusuario",(req,res)=>{
     crear(req,res);
});
//para buscar una usuario
routerUsuarios.get("/buscarusuario",(req,res)=>{
     buscar(req,res);
});
//para buscar una usuario por id
routerUsuarios.get("/buscarusuarioid/:id",(req,res)=>{
     buscarId(req,res);
});
//para actualizar datos de una usuario
routerUsuarios.put("/actualizarusuario/:id",(req,res)=>{
     actualizar(req,res);
});
//para eliminar una usuario
routerUsuarios.delete("/eliminarusuario/:id",(req,res)=>{
     eliminar(req,res);
})

export {routerUsuarios}