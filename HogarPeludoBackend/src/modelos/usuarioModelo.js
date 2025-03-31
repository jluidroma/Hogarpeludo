import Sequelize  from "sequelize";
import {db} from "../database/conexion.js";


const usuarios = db.define("usuarios",{
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
     contrasena:{
          type: Sequelize.STRING,
          allowNull:true
     },
     telefono:{
          type:Sequelize.BIGINT(10),
          allowNull:true
     },
     direccion: {
          type: Sequelize.STRING, 
          allowNull: true
     },
     rol:{
          type:Sequelize.STRING,
          allowNull:true,
     }

})

export {usuarios}