import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import fs from 'fs';
import { db } from "./database/conexion.js";
import path from 'path';
import { fileURLToPath } from 'url';

// 🧠 Rutas de tus módulos
import { routerUsuarios } from "./rutas/usuariosRouter.js";
import { routerMascotas } from "./rutas/mascotasRouter.js";
import { routerSolicitud } from "./rutas/SolicitudesRouter.js";
import { routerRefugios } from "./rutas/refugiosRouter.js";
import { routerVisitas } from "./rutas/visitasRouter.js";
import { routerVoluntarios } from "./rutas/voluntariosRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔐 Inicializar Firebase Admin
const serviceAccountPath = path.join(__dirname, 'config', 'hogarpeludo-71903-firebase-adminsdk-fbsvc-5f40218be4.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 🚦 Middlewares para autenticación y roles
const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🔐 Token recibido:', token); // <-- Aquí ves si el token llega

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('✅ Token decodificado:', decodedToken); // <-- Aquí ves si Firebase lo reconoce
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('❌ Error al verificar token:', error);
    return res.status(403).json({ error: 'Token inválido' });
  }
};


const verificarAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: Se requiere rol admin' });
  }
  next();
};

// 🚀 App setup
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Rutas protegidas según rol
app.use('/usuarios', verificarToken, verificarAdmin, routerUsuarios);
app.use('/voluntarios', verificarToken, verificarAdmin, routerVoluntarios);
app.use('/mascotas', verificarToken, verificarAdmin, routerMascotas);
app.use('/refugios', verificarToken, verificarAdmin,routerRefugios);

// 🟢 Ruta pública opcional
app.get('/', (req, res) => {
  res.send('API funcionando');
});



// 🚀 Inicializar DB y servidor
const PORT = 3000;
db.authenticate()
  .then(() => {
    console.log("✅ Conexión a la base de datos correcta");
    return db.sync({ force: true }); // Quita force:true en producción
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
      console.log(`📄 Documentación en http://localhost:${PORT}/api-docs`);
    });
  })
  


