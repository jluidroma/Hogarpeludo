import express from "express";
import {crearSolicitud,buscarSolicitud,buscarSolicitudId,actualizarSolicitud,eliminarSolicitud} from "../controladores/solicitudesController.js";

const routerSolicitud = express.Router();

//para agregar una solicitud
routerSolicitud.post("/crearsolicitud/:id_mascota",(req,res)=>{
     crearSolicitud(req,res);
});
//para buscar una solicitudes
routerSolicitud.get("/buscarsolicitudes",(req,res)=>{
     buscarSolicitud(req,res);
});
//para buscar una solicitud por id
routerSolicitud.get("/buscarsolicitudid/:id",(req,res)=>{
     buscarSolicitudId(req,res);
});
//para actualizar datos de una solicitud
routerSolicitud.put("/actualizarsolicitud/:id",(req,res)=>{
     actualizarSolicitud(req,res);
});
//para eliminar una solicitud
routerSolicitud.delete("/eliminarsolicitud/:id",(req,res)=>{
     eliminarSolicitud(req,res);
})

export {routerSolicitud}