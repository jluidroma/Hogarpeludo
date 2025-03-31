import express from "express";
import {actualizar,buscar,buscarId,crear,eliminar} from "../controladores/visitasController.js";

const routerVisitas = express.Router();

//para agregar una visita
routerVisitas.post("/crearvisita",(req,res)=>{
     crear(req,res);
});
//para buscar todas las visitas
routerVisitas.get("/buscarvisita",(req,res)=>{
     buscar(req,res);
});
//para buscar una visita por id
routerVisitas.get("/buscarvisitaid/:id",(req,res)=>{
     buscarId(req,res);
});
//para actualizar datos de una visita
routerVisitas.put("/actualizarvisita/:id",(req,res)=>{
     actualizar(req,res);
});
//para eliminar una visita
routerVisitas.delete("/eliminarvisita/:id",(req,res)=>{
     eliminar(req,res);
})

export {routerVisitas}