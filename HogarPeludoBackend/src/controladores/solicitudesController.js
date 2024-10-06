import { solicitud } from "../modelos/solicitudModelo.js";

//para crear una solicitud
const crearSolicitud = (req,res)=>{
     // Verificar si se proporcionaron los datos indispensables
     if(!req.params.id_mascota){
          res.status(500).json({mensaje: `El id de la solicitud no puede estar vacio`})
          return;
     }

     if(!req.body.nombre_solicitante && !req.body.telefono  && req.body.identificacion){
          res.status(400).send({ mensaje: "El nombre del solicitante, identificación o su teléfono son indispensables, no pueden estar vacios."});
          return;
     }

     const dataset={
          id_mascota: req.params.id_mascota,
          nombre_solicitante: req.body.nombre_solicitante,
          identificacion: req.body.identificacion,
          telefono: req.body.telefono,
          direccion: req.body.direccion,
          fecha: req.body.fecha,
          estado: req.body.estado
     }

     //Usuar Sequelize para crear el recurso en la base de datos
     solicitud.create(dataset).then((resultado)=>{
          res.status(200).json({
               mensaje: "Registro de Solicitud Creado Con Exito"
          });
     }).catch((err)=>{
          res.status(500).json({
               mensaje: `Registro de Solicitud No creado ::: ${err}`
          });
     });
}
//para buscar y traer las solicitudes
const buscarSolicitud = (req,res)=>{
     //Usuar Sequelize para buscar todas las solicitudes en la base de datos
     solicitud.findAll().then((resultado)=>{
          res.status(200).json(resultado)
     }
     ).catch((err)=>{
          res.status(500).json({
               mensaje:`No se encontraron registros ::: ${err}`
          })
     })
}
//para buscar una solicitud por id de solicitud
const buscarSolicitudId = (req,res)=>{
     const id = req.params.id
     // Verificar si se proporcionó un id
     if(!id){
          res.status(500).json({mensaje: `El id de la solicitud no puede estar vacio`})
          return;
     }else{
          //Usuar Sequelize para buscar por id el registro de la solicitud en la base de datos
          solicitud.findByPk(id).then((resultado)=>{
               res.status(200).json(resultado);
          }).catch((err)=>{
               res.status(500).json({
                    mensaje:`No se encontraron registros ::: ${err}`
               });
          });
     
     }
}
//para actualizar los datos de una solicitud
const actualizarSolicitud = (req,res)=>{
     const id=req.params.id;
     // Verificar si se proporcionaron los datos para actualizar
     if(!req.body.nombre_solicitante && !req.body.id_mascota){
          res.status(400).json({
               mensaje: "No se encontraron Datos para Actualizar"
          });
          return;
     
     }
     else{

          const id_mascota = req.body.id_mascota
          const nombre_solicitante = req.body.nombre_solicitante    
          const identificacion = req.body.identificacion
          const telefono = req.body.telefono
          const direccion = req.body.direccion
          const fecha = req.body.fecha
          const estado = req.body.estado
          //usar sequalize parac actualizar los datos
          solicitud.update({id_mascota,nombre_solicitante,identificacion,telefono,direccion,fecha,estado},{where:{id_solicitud:id}}).then((resultado)=>{
               res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro Actualizado"
               });
          }).catch((err)=>{
               res.status(500).json({
                    tipo: 'error',
                    mensaje: `Error al actualizar Registro ::: ${err}`
               });
          });
     }
}
//Para eliminar una solicitud
const eliminarSolicitud = (req,res)=>{
     const id = req.params.id;
     console.log(id)
// Verificar si se proporcionó un ID
     if (!id) {
          return res.status(400).json({
               tipo: "error",
               mensaje: "Debe ingresar un ID válido",
          });
     }

//  eliminar el registro de la base de datos, utilizando sequalize
     solicitud.destroy({ where: { id_solicitud: id } })
          .then((result) => {
               if (result === 0) {
                    return res.status(404).json({
                         tipo: 'error',
                         mensaje: `No se encontró un registro con id ${id}`
                    });
               }

               res.status(200).json({
                    tipo: 'success',
                    mensaje: `Registro con id ${id} eliminado correctamente`,
               });
          })
          .catch((err) => {
               res.status(500).json({
                    tipo: 'error',
                    mensaje: `Error al eliminar el registro: ${err.message}`,
               });
          });
}
export {crearSolicitud,buscarSolicitud,buscarSolicitudId,actualizarSolicitud,eliminarSolicitud}