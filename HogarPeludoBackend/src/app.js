import express from "express";
import session from "express-session";
import Keycloak from "keycloak-connect";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { db } from "./database/conexion.js";
import { routerUsuarios } from "./rutas/usuariosRouter.js";
import { routerMascotas } from "./rutas/mascotasRouter.js";
import { routerSolicitud } from "./rutas/SolicitudesRouter.js";
import { routerRefugios } from "./rutas/refugiosRouter.js"; 
import { routerVisitas } from "./rutas/visitasRouter.js";
import { routerVoluntarios } from "./rutas/voluntariosRouter.js";

// 📂 Rutas de archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🚀 App Express
const app = express();

// 🔐 Configurar sesión y Keycloak
const keycloakConfig = JSON.parse(
  fs.readFileSync(join(__dirname, "keycloak.json"), "utf-8")
);
const memoryStore = new session.MemoryStore();

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'clave-super-secreta',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
app.use(keycloak.middleware());

// 📄 Swagger Docs
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Hogar Peludo",
      version: "1.0.0",
      description: "Documentación de la API de gestión de adopciones, refugios y voluntarios",
    },
  },
  apis: [join(__dirname, "rutas/*.js")],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 🌐 Ruta pública
app.get("/", (req, res) => {
  res.send("Hola Sitio Principal");
});

function verificarTokenBearer(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado o inválido" });
  }


  keycloak.grantManager
    .validateAccessToken(token)
    .then((isValid) => {
      if (!isValid) {
        return res.status(401).json({ error: "Token inválido" });
      }
      // También puedes decodificar si quieres saber quién es
      return keycloak.grantManager.userInfo(token).then((userInfo) => {
        req.user = userInfo;
        next();
      });
    })
    .catch((err) => {
      console.error("Error al validar token:", err);
      return res.status(401).json({ error: "Error al validar token" });
    });
}
// 🔐 Ruta protegida
app.use("/usuarios",verificarTokenBearer, routerUsuarios);

// 🌐 Rutas sin protección
app.use("/mascotas", routerMascotas);
app.use("/refugios", routerRefugios);
app.use("/visitas", routerVisitas);
app.use("/voluntarios", routerVoluntarios);
app.use("/solicitud", routerSolicitud);

// ⚠️ Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error("❌ Error capturado por middleware:", err);
  if (err.name === "AccessDeniedError") {
    return res.status(403).json({ error: "Acceso denegado (403) - No autorizado" });
  }
  return res.status(500).json({ error: "Error interno del servidor" });
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
  .catch((err) => {
    console.error("❌ Error de conexión o sincronización:", err);
  });
  app.get("/check-token", keycloak.protect(), (req, res) => {
  res.json({
    message: "Token válido",
    user: req.kauth.grant.access_token.content
  });
});



