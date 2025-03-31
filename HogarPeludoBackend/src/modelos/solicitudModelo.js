import  Sequelize  from "sequelize"
import {mascotas} from "./mascotaModelo.js"
import { usuarios } from "./usuarioModelo.js"
import {db} from "../database/conexion.js"

const solicitud = db.define("solicitud",{
     id_adopcion:{
          type:Sequelize.INTEGER,
          allowNul: false,
          autoIncrement: true,
          primaryKey: true
     },
     id_mascota:{
          type:Sequelize.INTEGER,
          allowNul: false,
          references: {
               model: mascotas, // Nombre del modelo que referencia
               key: 'id'       // Clave primaria en el modelo "Mascota"
          }

     },
     id_solicitante:{
          type:Sequelize.INTEGER,
          allowNul: false,
          references: {
               model: usuarios, // Nombre del modelo que referencia
               key: 'id'       // Clave primaria en el modelo "usuario"
          }

     },
     fecha_solicitud:{
          type:Sequelize.DATE,
          allowNull:true
     },
     estado:{
          type:Sequelize.STRING,
          defaultValue:"pendiente"
     },
     fecha_aprobacion:{
          type:Sequelize.DATE,
          allowNull:true
     }
})

export {solicitud};