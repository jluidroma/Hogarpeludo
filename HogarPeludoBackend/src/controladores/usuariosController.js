import { usuarios } from "../modelos/usuarioModelo.js";

//Crear un recurso usuario
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
     if(!req.body.contrasena){
          res.status(400).send({ mensaje: "El  campo contraseña no puede estar vacío."});
          return;
     }
     if (!req.body.direccion) {
          return res.status(400).send({ mensaje: "El campo dirección no puede estar vacío." });
     }    
     if (!req.body.rol) {
          return res.status(400).send({ mensaje: "El campo rol no puede estar vacío." });
     }
     const dataset={
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          contrasena: req.body.contrasena,
          telefono: req.body.direccion,
          direccion: req.body.direccion,
          rol: req.body.rol
     }

//Usuar Sequelize para crear el recurso en la base de datos
     usuarios.create(dataset).then((resultado)=>{
          res.status(200).json({
               mensaje: "Registro de usuario Creado con Exito"
          });
     }).catch((err)=>{
          res.status(500).json({
               mensaje: `Registro de usuario No creado ::: ${err}`
          });
     });
}

//Buscar Usuarios 
const buscar= (req,res)=>{
usuarios.findAll().then((resultado)=>{
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
     usuarios.findByPk(id).then((resultado)=>{
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
     const contrasena= req.body.contrasena;
     const telefono= req.body.telefono;
     const direccion= req.body.direccion;
     const rol= req.body.rol
     usuarios.update({nombre,apellido,email,contrasena,telefono,direccion,rol},{where:{id}}).then((resultado)=>{
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
usuarios.destroy({ where: { id: id } })
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