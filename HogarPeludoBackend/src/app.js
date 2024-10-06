import express from "express";
import { routerMascotas } from "./rutas/mascotasRouter.js";
import { routerSolicitud } from "./rutas/SolicitudesRouter.js";
import {db} from "./database/conexion.js";
import cors from "cors";
//Crear instancia de Express
const app = express();

//Cors
app.use(cors());
//Middleware JSON
app.use(express.json());

//Verificar Conexion Base Datos
db.authenticate().then(()=>{
    console.log(`Conexion a Base de datos correcta`);
}).catch(err=>{
    console.log(`Conexion a Base de datos incorrecta ${err}`);
}); 


//Definir Rutas
//esto es un call back con un aarray function el req es lo que me llega del cliente y9 el res es lo que se envia desde el servidor al cliente
app.get('/', (req, res) => {
    res.send('Hola Sitio Principal');
});

//Llamar rutas de mascotas utlizando el midelware
app.use("/mascotas",routerMascotas);
app.use("/solicitud",routerSolicitud)

//Puerto de Servidor
const PORT=3000;

db.sync({force: true}).then(()=>{
    //Abri servicio e iniciar el Servidor
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en el puerto ${PORT}`);
    })

}).catch(err=>{
    console.log(`Error al Sincronizar base de datos ${err}`);
}); 




