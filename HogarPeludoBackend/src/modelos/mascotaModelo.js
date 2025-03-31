import Sequelize  from "sequelize";
import {db} from "../database/conexion.js";
import { refugios } from "./refugioModelo.js";


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
     },
     id_refugio:{
          type:Sequelize.INTEGER,
          allowNul: false,
          references: {
               model: refugios, // Nombre del modelo que referencia
               key: 'id'       // Clave primaria en el modelo "refugio"
          }

     }

})

export {mascotas}
