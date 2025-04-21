import express from "express";
import session from "express-session";
import Keycloak from "keycloak-connect";
import { routerUsuarios } from "./rutas/usuariosRouter.js";
import { routerMascotas } from "./rutas/mascotasRouter.js";
import { routerSolicitud } from "./rutas/SolicitudesRouter.js";
import { routerRefugios } from "./rutas/refugiosRouter.js"; 
import { routerVisitas } from "./rutas/visitasRouter.js";
import { routerVoluntarios } from "./rutas/voluntariosRouter.js";
import { db } from "./database/conexion.js";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. Configuración de sesión y Keycloak
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'clave-super-secreta',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware()); // ⬅️ Activa el middleware

// 2. CORS y JSON
app.use(cors());
app.use(express.json());

// 3. Swagger
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

// 4. Ruta pública
app.get("/", (req, res) => {
  res.send("Hola Sitio Principal");
});

// 5. Rutas protegidas con Keycloak (puedes proteger solo algunas)
app.use("/usuarios", keycloak.protect(), routerUsuarios);
app.use("/solicitud", keycloak.protect(), routerSolicitud);

// 6. Rutas sin protección
app.use("/mascotas", routerMascotas);
app.use("/refugios", routerRefugios);
app.use("/visitas", routerVisitas);
app.use("/voluntarios", routerVoluntarios);

// 7. Iniciar DB y servidor
const PORT = 3000;
db.authenticate()
  .then(() => {
    console.log("✅ Conexión a la base de datos correcta");
    return db.sync({ force: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
      console.log(`📘 Documentación: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Error de conexión o sincronización:", err);
  });
