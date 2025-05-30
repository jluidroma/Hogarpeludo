// src/app.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

import { db } from './database/conexion.js';

// 📦 Rutas
import { routerUsuarios } from './rutas/usuariosRouter.js';
import { routerMascotas } from './rutas/mascotasRouter.js';
import { routerSolicitud } from './rutas/SolicitudesRouter.js';
import { routerRefugios } from './rutas/refugiosRouter.js';
import { routerVisitas } from './rutas/visitasRouter.js';
import { routerVoluntarios } from './rutas/voluntariosRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔐 Inicializar Firebase Admin
const serviceAccountPath = path.join(__dirname, 'config', 'hogarpeludo-71903-firebase-adminsdk-fbsvc-5f40218be4.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// 🚀 Inicialización de Express
const app = express();
app.use(cors());
app.use(express.json());

// 📌 Rutas principales (los middlewares se aplican dentro de cada router)
app.use('/usuarios', routerUsuarios);
app.use('/voluntarios', routerVoluntarios);
app.use('/mascotas', routerMascotas);
app.use('/refugios', routerRefugios);
app.use('/solicitudes', routerSolicitud);
app.use('/visitas', routerVisitas);

// 🟢 Ruta pública
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// 🚀 Iniciar servidor y base de datos
const PORT = 3000;
db.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos correcta');
    return db.sync({ force: true }); // ❗ Quita esto en producción
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
      console.log(`📄 Documentación en http://localhost:${PORT}/api-docs`);
    });
  });
