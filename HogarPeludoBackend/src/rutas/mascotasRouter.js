import express from "express";
import {actualizar,buscar,buscarId,crear,eliminar} from "../controladores/mascotasController.js";

const routerMascotas = express.Router();

//para agregar una mascota
routerMascotas.post("/crearmascota",(req,res)=>{
     crear(req,res);
});
//para buscar una mascota
routerMascotas.get("/buscarmascotas",(req,res)=>{
     buscar(req,res);
});
//para buscar una mascota por id
routerMascotas.get("/buscarmascotaid/:id",(req,res)=>{
     buscarId(req,res);
});
//para actualizar datos de una mascota
routerMascotas.put("/actualizarmascota/:id",(req,res)=>{
     actualizar(req,res);
});
//para eliminar una mascota
routerMascotas.delete("/eliminarmascota/:id",(req,res)=>{
     eliminar(req,res);
})

export {routerMascotas}