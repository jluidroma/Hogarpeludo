import { solicitud } from "../modelos/solicitudModelo.js";

//para crear una solicitud
const crearSolicitud = (req,res)=>{
     // Verificar si se proporcionaron los datos indispensables
     if(!req.params.id_mascota && !req.params.id_solicitante){
          res.status(500).json({mensaje: `El id de la solicitud y el id de solicitante no puede estar vacio`})
          return;
     }



     const dataset={
          id_mascota: req.params.id_mascota,
          id_solicitante: req.body.id_solicitante,
          fecha_solicitud: req.body.fecha_solicitud,
          estado: req.body.estado,
          fecha_aprobacion: req.body.fecha_aprobacion,
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
     if( !req.body.id_solicitante){
          res.status(400).json({
               mensaje: "No se encontraron Datos para Actualizar"
          });
          return;
     
     }
     else{

          const id_mascota = req.body.id_mascota
          const id_solicitante = req.body.id_solicitante
          const fecha_solicitud = req.body.fecha_solicitud
          const estado = req.body.estado
          const fecha_aprobacion = req.body.fecha_aprobacion
          //usar sequalize parac actualizar los datos
          solicitud.update({id_mascota,id_solicitante,fecha_solicitud,estado, fecha_aprobacion},{where:{id_adopcion:id}}).then((resultado)=>{
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
     solicitud.destroy({ where: { id_adopcion: id } })
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