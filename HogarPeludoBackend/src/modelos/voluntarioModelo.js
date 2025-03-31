import Sequelize  from "sequelize";
import {db} from "../database/conexion.js";
import {refugios} from "../modelos/refugioModelo.js"


const voluntarios = db.define("voluntarios",{
     id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true  
     },
     nombre:{
          type:Sequelize.STRING,
          allowNull: true
     },
     apellido:{
          type:Sequelize.STRING,
          allowNull: true
     },
     email:{
          type: Sequelize.STRING,
          allowNull:true
     },
     telefono:{
          type:Sequelize.BIGINT(10),
          allowNull:true
     },
     disponibilidad: {
          type: Sequelize.STRING, 
          allowNull: true
     },
     id_refugio:{
          type:Sequelize.INTEGER,
          allowNull: true,
          references: {
               model: refugios, // Nombre del modelo que referencia
               key: 'id'       // Clave primaria en el modelo "refugio"
          }
     }

})

export {voluntarios}