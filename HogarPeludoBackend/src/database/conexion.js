import Sequelize  from "sequelize";
//creamos la conexion, pasandole nombre de la DB, usuario y su contraseña
const db = new Sequelize("hogarpeludo","hogarpeludouser","hogarpeludo2024",{
     dialect: "mysql",
     host: "database",
     logging: console.log
});

export {db}