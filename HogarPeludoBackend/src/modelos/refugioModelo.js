import Sequelize  from "sequelize";
import {db} from "../database/conexion.js";


const refugios = db.define("refugios",{
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
     ubicacion:{
          type:Sequelize.STRING,
          allowNull: true
     },
     email:{
          type: Sequelize.STRING,
          allowNull:true
     },
     telefono:{
          type: Sequelize.INTEGER,
          allowNull:true
     }

})

export {refugios}
