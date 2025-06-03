import { DataTypes } from "sequelize";
import { db } from "../database/conexion.js";

const usuario = db.define("usuarios", {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true, // Usamos el UID de Firebase como clave primaria
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombreCompleto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
});

export { usuario };
