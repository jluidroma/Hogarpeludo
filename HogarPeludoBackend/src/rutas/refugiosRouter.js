import express from "express";
import {actualizar,buscar,buscarId,crear,eliminar} from "../controladores/refugiosController.js";

const routerRefugios = express.Router();

//para agregar un refugio
routerRefugios.post("/crearrefugio",(req,res)=>{
     crear(req,res);
});
//para buscar un refugio
routerRefugios.get("/buscarrefugios",(req,res)=>{
     buscar(req,res);
});
//para buscar un refugios por id
routerRefugios.get("/buscarrefugioid/:id",(req,res)=>{
     buscarId(req,res);
});
//para actualizar datos de un refugio
routerRefugios.put("/actualizarrefugio/:id",(req,res)=>{
     actualizar(req,res);
});
//para eliminar un refugio
routerRefugios.delete("/eliminarrefugio/:id",(req,res)=>{
     eliminar(req,res);
})

export {routerRefugios}