import { refugios } from "../modelos/refugioModelo.js";

//Crear un recurso refugios
const crear = (req,res)=>{

    //Validar 
     if(!req.body.nombre){
          res.status(400).send({ mensaje: "El nombre no puede estar vacio."});
          return;
     }
     if (!req.body.ubicacion) {
          return res.status(400).send({ mensaje: "El campo ubicación no puede estar vacío." });
     }    
     if (!req.body.email) {
          return res.status(400).send({ mensaje: "El campo email no puede estar vacío." });
     }
     if(!req.body.telefono){
          res.status(400).send({ mensaje: "El teléfono no puede estar vacio."});
          return;
     }

     const dataset={
          nombre: req.body.nombre,
          ubicacion: req.body.ubicacion,
          email: req.body.email,
          telefono: req.body.telefono
     }

//Usuar Sequelize para crear el recurso en la base de datos
     refugios.create(dataset).then((resultado)=>{
          res.status(200).json({
               mensaje: "Registro de refugio Creado con Exito"
          });
     }).catch((err)=>{
          res.status(500).json({
               mensaje: `Registro de refugio No creado ::: ${err}`
          });
     });
}

//Buscar refugios
const buscar= (req,res)=>{
refugios.findAll().then((resultado)=>{
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
     refugios.findByPk(id).then((resultado)=>{
          res.status(200).json(resultado);
     }).catch((err)=>{
          res.status(500).json({
               mensaje:`No se encontraron registros ::: ${err}`
          });
     });

}

}



//Actualizar refugios
const actualizar=(req,res)=>{
const id=req.params.id;
if(!req.body.nombre && !req.body.nombre){
     res.status(400).json({
          mensaje: "No se encontraron Datos para Actualizar"
     });
     return;

}
else{
     const nombre= req.body.nombre
     const ubicacion= req.body.ubicacion;
     const email= req.body.email;
     const telefono= req.body.telefono;
     refugios.update({nombre,ubicacion,email,telefono},{where:{id}}).then((resultado)=>{
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

//Eliminar refugios
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
refugios.destroy({ where: { id: id } })
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