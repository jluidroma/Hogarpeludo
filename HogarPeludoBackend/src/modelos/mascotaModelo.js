import Sequelize  from "sequelize";
import {db} from "../database/conexion.js";


const mascotas = db.define("mascotas",{
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
     sexo:{
          type:Sequelize.STRING,
          allowNull: true
     },
     raza:{
          type: Sequelize.STRING,
          allowNull:true
     },
     edad:{
          type: Sequelize.INTEGER,
          allowNull:true
     },
     talla:{
          type:Sequelize.STRING,
          allowNull:true
     },
     imagenUrl: {
          type: Sequelize.STRING, 
          allowNull: true,
          defaultValue:"../imagenes/prueba.jpeg" 
     },
     estado_adopcion:{
          type:Sequelize.STRING,
          allowNull:true,
          defaultValue:"no"
     }

})

export {mascotas}
