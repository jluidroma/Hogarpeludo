
import { voluntarios } from "../modelos/voluntarioModelo.js";

//Crear un recurso voluntario
const crear = (req,res)=>{

    //Validar 
     if(!req.body.nombre){
          res.status(400).send({ mensaje: "El nombre no puede estar vacío."});
          return;
     }
     if (!req.body.apellido) {
          return res.status(400).send({ mensaje: "El campo apellido no puede estar vacío." });
     }    
     if (!req.body.email) {
          return res.status(400).send({ mensaje: "El campo email no puede estar vacío." });
     }
     if(!req.body.telefono){
          res.status(400).send({ mensaje: "El  campo teléfono no puede estar vacío."});
          return;
     }
     if (!req.body.disponibilidad) {
          return res.status(400).send({ mensaje: "El campo disponibilidad no puede estar vacío." });
     }    
     
     const dataset={
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          telefono: req.body.telefono,
          disponibilidad: req.body.disponibilidad,
          rol: req.body.id_refugio
     }

//Usuar Sequelize para crear el recurso en la base de datos
     voluntarios.create(dataset).then((resultado)=>{
          res.status(200).json({
               mensaje: "Registro de voluntario Creado con Exito"
          });
     }).catch((err)=>{
          res.status(500).json({
               mensaje: `Registro de voluntario No creado ::: ${err}`
          });
     });
}

//Buscar Voluntarios 
const buscar= (req,res)=>{
voluntarios.findAll().then((resultado)=>{
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
     voluntarios.findByPk(id).then((resultado)=>{
          res.status(200).json(resultado);
     }).catch((err)=>{
          res.status(500).json({
               mensaje:`No se encontraron registros ::: ${err}`
          });
     });

}

}



//Actualizar voluntario
const actualizar=(req,res)=>{
const id=req.params.id;
if(!req.body.nombre){
     res.status(400).json({
          mensaje: "No se encontraron Datos para Actualizar"
     });
     return;

}
else{
     const nombre= req.body.nombre
     const apellido= req.body.apellido;
     const email= req.body.email;
     const telefono= req.body.telefono;
     const disponibilidad= req.body.disponibilidad
     const id_refugio= req.body.id_refugio
     voluntarios.update({nombre,apellido,email,telefono,disponibilidad,id_refugio},{where:{id}}).then((resultado)=>{
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

//Eliminar voluntario
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
voluntarios.destroy({ where: { id: id } })
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