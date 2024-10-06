import  Sequelize  from "sequelize"
import {mascotas} from "./mascotaModelo.js"
import {db} from "../database/conexion.js"

const solicitud = db.define("solicitud",{
     id_solicitud:{
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
     nombre_solicitante:{
          type:Sequelize.STRING,
          allowNull: false,
     },
     identificacion:{
          type:Sequelize.STRING,
          allowNull: false
     },
     telefono:{
          type:Sequelize.BIGINT(10),
          allowNull: false,
     },
     direccion:{
          type:Sequelize.STRING,
          allowNull:true,
     },
     fecha:{
          type:Sequelize.DATE,
          allowNull:true

     },
     estado:{
          type:Sequelize.STRING,
     }
})

export {solicitud};