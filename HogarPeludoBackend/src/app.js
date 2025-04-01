import express from "express";
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

// Crear instancia de Express
const app = express();

// Configuración de CORS
app.use(cors());

// Middleware para JSON
app.use(express.json());

// Verificar conexión a la base de datos
db.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos correcta");
  })
  .catch((err) => {
    console.log(`Conexión a la base de datos incorrecta: ${err}`);
  });

// Configuración de Swagger
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Hogar Peludo",
      version: "1.0.0",
      description: "Documentación de la API de gestión de adopciones, refugios y voluntarios",
    },
  },
  apis: [join(__dirname, "rutas/*.js")], // 🔹 Asegura una ruta correcta
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
console.log(JSON.stringify(swaggerDocs, null, 2)); // 👈 Imprime para verificar


// **Registra Swagger antes de las rutas**
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Definir rutas
app.get("/", (req, res) => {
  res.send("Hola Sitio Principal");
});

app.use("/mascotas", routerMascotas);
app.use("/usuarios", routerUsuarios);
app.use("/solicitud", routerSolicitud);
app.use("/refugios", routerRefugios);
app.use("/visitas", routerVisitas);
app.use("/voluntarios", routerVoluntarios);

// Configuración del puerto del servidor
const PORT = 3000;

db.sync({ force: true })
  .then(() => {
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor inicializado en el puerto ${PORT}`);
      console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.log(`Error al sincronizar la base de datos: ${err}`);
  });
