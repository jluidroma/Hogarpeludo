import Sequelize  from "sequelize";
import {db} from "../database/conexion.js";
import { solicitud } from "./solicitudModelo.js";


const visitas = db.define("visitas",{
     id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true  
     },
     id_adopcion:{
          type:Sequelize.INTEGER,
          allowNull: true,
          references: {
               model: solicitud, // Nombre del modelo que referencia
               key: 'id_adopcion'// Clave primaria en el modelo "solicitud"
          }
     },
     fecha_visita:{
          type:Sequelize.DATE,
          allowNull: true
     },
     observaciones:{
          type: Sequelize.STRING,
          allowNull:true
     },
     estado_mascota:{
          type: Sequelize.STRING,
          allowNull:true
     }
})

export {visitas}