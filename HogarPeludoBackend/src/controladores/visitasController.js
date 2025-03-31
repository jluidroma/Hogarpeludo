import { visitas } from "../modelos/visitasModelo.js";

//Crear un recurso visitas
const crear = (req,res)=>{

    //Validar 
     if(!req.body.id_adopcion){
          res.status(400).send({ mensaje: "Para crear la solicitud el campo id adopción no puede estar vacío."});
          return;
     }
     if (!req.body.fecha_visita) {
          return res.status(400).send({ mensaje: "El campo fecha de visita no puede estar vacío." });
     }    
     if (!req.body.observaciones) {
          return res.status(400).send({ mensaje: "El campo observaciones no puede estar vacío." });
     }
     if(!req.body.estado_mascota){
          res.status(400).send({ mensaje: "El  campo estado de mascota no puede estar vacío."});
          return;
     }
     const dataset={
          id_adopcion: req.body.id_adopcion,
          fecha_visita: req.body.fecha_visita,
          observaciones: req.body.observaciones,
          estado_mascota: req.body.estado_mascota,
     }

//Usuar Sequelize para crear el recurso en la base de datos
     visitas.create(dataset).then((resultado)=>{
          res.status(200).json({
               mensaje: "Registro de visita Creado con Exito"
          });
     }).catch((err)=>{
          res.status(500).json({
               mensaje: `Registro de visita No creado ::: ${err}`
          });
     });
}

//Buscar todas las visitas 
const buscar= (req,res)=>{
visitas.findAll().then((resultado)=>{
     res.status(200).json(resultado);
}).catch((err)=>{
     res.status(500).json({
          mensaje:`No se encontraron registros ::: ${err}`
     });
});
}


//buscar por ID
const buscarId= (req,res)=>{

const id=req.params.id;
if(id==null){
     res.status(400).json({
          mensaje: "El id no puede estar vacio"
     });
     return;
}
else{
     visitas.findByPk(id).then((resultado)=>{
          res.status(200).json(resultado);
     }).catch((err)=>{
          res.status(500).json({
               mensaje:`No se encontraron registros ::: ${err}`
          });
     });

}

}



//Actualizar usuario
const actualizar=(req,res)=>{
const id=req.params.id;
if(!req.body.id_adopcion){
     res.status(400).json({
          mensaje: "No se encontraron Datos para Actualizar"
     });
     return;

}
else{
     const id_adopcion= req.body.id_adopcion
     const fecha_visita= req.body.fecha_visita
     const observaciones= req.body.observaciones;
     const estado_mascota= req.body.estado_mascota;
     visitas.update({id_adopcion,fecha_visita,observaciones,estado_mascota},{where:{id}}).then((resultado)=>{
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

//Eliminar usuario
const eliminar = (req, res) => {
     const id = req.params.id;

// Verificar si se proporcionó un ID
if (!id) {
     return res.status(400).json({
          tipo: "error",
          mensaje: "Debe ingresar un ID válido",
     });
}

// Lógica para eliminar el registro de la base de datos
visitas.destroy({ where: { id: id } })
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
};



export {crear,buscar,buscarId,actualizar,eliminar}