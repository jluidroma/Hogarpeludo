# Título del Proyecto  
Hogar Peludo - Plataforma de Adopción de Mascotas 

# Descripción del Proyecto
Hogar Peludo es una plataforma web desarrollada para facilitar el proceso de adopción de mascotas, permitiendo a los usuarios encontrar animales en busca de un hogar, enviar solicitudes de adopción y gestionar la información de los refugios y visitas.

El sistema ofrece un conjunto completo de funcionalidades para la administración de mascotas, solicitudes de adopción y usuarios, permitiendo una interacción fluida entre adoptantes y refugios.


#  Tecnologías Utilizadas  
| **Área**       | **Tecnologías**                          
|                |  
| Backend        | Node.js, Express.js                      
| Base de Datos  | MySQL (ORM: Sequelize)                   
| Frontend       | Angular                                 
| Herramientas   | Nodemon (desarrollo), Postman (testing)  


**Flujo principal**:  
1. Usuarios registrados pueden explorar mascotas y enviar solicitudes.  
2. Administradores gestionan mascotas, refugios y aprobaciones.  
3. Sistema de donaciones para apoyar a los refugios.  

## Arquitectura del Sistema 
📁 Backend/  
├──  src/
│   ├── 📁 controllers    # Lógica CRUD (Mascotas, Usuarios, etc.)
│   ├── 📁 database       # configuracion de MySQl
│   ├── 📁 modelos        # Modelos de Sequelize                       Endpoints API
│   └── 📁 rutas          # Endpoints API
└── app.js                 # Punto de entrada

## Instrucciones de Despliegue
1. Clona el repositorio:  
   
   git clone https://github.com/jluidroma/Hogarpeludo
 
 **Requisitos Previos**
    -->Node.js .

    -->MySQL instalado y corriendo.

    -->Angular CLI (si se despliega el frontend).
## Instrucciones de creacion del proyecto 
   1. Lo primero que haremos será crear una carpeta para el BackEnd. Luego, accedemos a MySQL para crear la base de datos destinada a la empresa de adopción de mascotas, HogarPeludo, tal como se muestra en la imagen siguiente.
   ![imagen punto 1](Img_Readme\punto1.png)

   2. A continuación, abrimos Visual Studio Code y, desde la terminal, iniciamos un nuevo proyecto con Node.js y Express.js utilizando el siguiente comando: npm init -y.
     
      Luego, realizamos las configuraciones necesarias para el proyecto. Primero, instalamos Nodemon para que el servidor se reinicie automáticamente cada vez que se realicen cambios en el código. Para ello, ejecutamos: npm install nodemon -D, Esta dependencia solo será utilizada durante la etapa de desarrollo. También instalamos Express, el framework que nos permitirá gestionar las rutas y solicitudes del servidor con el comando: npm install express. A continuación, instalamos el módulo mysql2 para establecer la conexión con la base de datos MySQL con el comando: npm install mysql2.Finalmente, instalamos Sequelize, que nos facilitará la interacción con la base de datos a través de un ORM para esto ejecutamos: npm install sequelize.
    ![imagen punto 2](Img_Readme\punto2.png)
    ![imagen punto 2.1](Img_Readme\punto2.1.png)

    
    3. Después de configurar el entorno, procedemos a crear un usuario y establecer una contraseña en DBeaver para administrar la base de datos. Asignamos los privilegios necesarios al nuevo usuario para garantizar que tenga acceso adecuado a la base de datos y pueda realizar las operaciones requeridas. Una vez que el usuario está configurado, comenzamos a trabajar en el desarrollo del backend en VSC.
     
    4. Ya en Visual Studio Code (VSC), lo primero que hacemos es crear un archivo llamado app.js, donde inicializamos una instancia de Express. En este archivo configuramos el puerto en el que correrá el servidor (en este caso, el puerto 3000) y otros aspectos necesarios para el funcionamiento del backend. Además, modificamos el archivo package.json para integrar Nodemon
    
    5. A continuación, organizamos todo el código dentro de una carpeta llamada src, donde estructuraremos las diferentes partes del proyecto. Dentro de src, creamos las siguientes cuatro carpetas: database, modelos, controladores y rutas.

## Carpeta database:

En esta carpeta configuramos la conexión a la base de datos utilizando Sequelize. Aquí se define el archivo principal de conexión, donde se establecen los parámetros de la base de datos como el host, usuario, contraseña, y nombre de la base de datos.

## Carpeta modelos:
Después de configurar el entorno, procedemos a crear un usuario y establecer una contraseña en DBeaver para administrar la base de datos. Asignamos los privilegios necesarios al nuevo usuario para garantizar que tenga acceso adecuado a la base de datos y pueda realizar las operaciones requeridas. Una vez que el usuario está configurado, comenzamos a trabajar en el desarrollo del backend en VSC.
En la carpeta modelos, también utilizando Sequelize, se crean las tablas correspondientes a los datos. En este caso, tenemos dos modelos:

**MascotasModelo:** Representa las mascotas disponibles para adopción.
**SolicitudesModelo:** Registra las solicitudes de adopción de mascotas.
**UsuariosModelo:** Registra todos los usuarios tanto administradores como usuarios adoptantes.
**RefugiosModelo:** Registra los refugios de mascotas.
**VisitasModelo:Registra** las visitas realizadas a las mascotas adoptadas.

Estos modelos definen las propiedades de cada tabla, como los atributos, tipos de datos y relaciones entre las tablas.

## Carpeta controladores:

Aquí se crean los controladores que gestionan la lógica de las operaciones sobre las tablas. En concreto:

**mascotasController.js:** Se encarga de implementar las operaciones
CRUD para el modelo de Mascotas.
**solicitudesController.js:** Se implementa el CRUD para las Solicitudes
de adopción.
**usuariosController.js:** Se encarga de implementar las operaciones
CRUD para el modelo de Usuarios.
**refugiosController.js:** Se implementa el CRUD para los refugios
de mascotas.
**visitasController.js**:Se implementa el CRUD  para  las visitas realizadas a las mascotas adoptadas.



## Carpeta rutas:

En esta carpeta se crean dos archivos:

**mascotasRouter.js:** Aquí se definen las rutas para manejar las operaciones CRUD relacionadas con las mascotas.
**solicitudesRouter.js:** Se definen las rutas para las operaciones CRUD de solicitudes de adopción.
**usuariosRouter.js:** Aquí se definen las rutas para manejar las operaciones CRUD relacionadas con usuarios.
**refugiosRouter.js:** Se definen las rutas para las operaciones CRUD de los refugios.
**visitasRouter.js:** Se definen las rutas para las operaciones CRUD de los visitas a las mascotas adoptadas.

## Para correr el proyecto de forma local basta con ejecutar el comando npm run start

## Endpoints
   ----> utilizamos Postman para probar cada una de las rutas creadas. Se verificaron las operaciones de creación, lectura, actualización y eliminación  para las entidades: Mascotas,Solicitudes,Usuarios,Refugios confirmando que todo funciona correctamente como se muestra en las siguientes imágenes.

   ## CRUD MASCOTAS 
   
   1. ![endpoint crear mascota ](Img_Readme\endpointcrearmascota.png)

   2. ![endpoint buscar mascota](Img_Readme\buscarmascota.png) 

   3. ![endpoint buscar mascota por id](Img_Readme\buscar_mascota_id.png)

   4. ![endpoint actualizar mascota](Img_Readme\actualizar_mascota.png) 

   5. ![endpoint eliminar mascota](Img_Readme\eliminar_mascota.png)
   
   ## CRUD SOLICITUDES

   6. ![endpoint crear solicitud](Img_Readme\crear_solicitud.png)

   7. ![endpoint buscar solicitud](Img_Readme\endpoint_buscar_solicitud.png)

   8. ![endpoint buscar solicitud por id](Img_Readme\endpoint_buscar_solicitud_por_id.png)

   9. ![endpoint actualizar solicitud ](Img_Readme\actualizar_solicitud.png)

   10. ![endpoint eliminar solicitud ](Img_Readme\eliminas_solicitud.png)

   ## CRUD USUARIOS 

   11. ![endpoint crear usuario](Img_Readme\crear_usuario.png)
   
   12. ![endpoint buscar usuario](Img_Readme\buscar_usuario.png)

   13. ![endpoint buscar usuario id](Img_Readme\buscar_usuario_id.png)

   14. ![endpoint actualizar usuario](Img_Readme\actualizar_usuario.png)

   15. ![endpoint elimar usuario](Img_Readme\eliminiar_usuario.png)

   ## CRUD REFUGIOS
   16. ![crear refigio](Img_Readme\crear_refugio.png)
   
   17. ![buscar refugios](Img_Readme\buscar_refugio.png)

   18. ![buscar refugios por id](Img_Readme\buscar_refugio_id.png)

   19. ![actualizar refugio](Img_Readme\actualizar_refugio.png)

   20. ![eliminar refigio](Img_Readme\buscar_refugio_id.png)

   ## para vistas de adopcion

   21. ![crear visita](Img_Readme\crear_visita.png)
   
   22. ![buscar visita](Img_Readme\buscar_visita_id.png)

   23. ![buscar visita por id ](Img_Readme\buscar_visita_id.png)

   24. ![actualizar visita ](Img_Readme\actualizar_visita.png)

   25. ![eliminar visita ](Img_Readme\eliminar_visita.png)


## CRUD VOLUNTARIOS 
   26. ![crear voluntario](Img_Readme\crear_volintario.png)

   27. ![buscar voluntario](Img_Readme\buscar_voluntario.png)

   28. ![buscar voluntario id](Img_Readme\buscar_voluntario.png)

   29. ![actualizar voluntario](Img_Readme\actualizar_voluntario.png)

   30. ![eliminar voluntario](Img_Readme\eliminar_voluntario.png)


## Capturas con documentacion  swagger

31. ![capturas swagger](Img_Readme\swagger1.png)

32. ![capturas swagger](Img_Readme\swagger2.png)

33. ![captura swagger](Img_Readme\swagger3.png)

## Instruciones de despliegue con docker

1.para inicializar el despliegue usando docker se ejecuta el comando "docker-compose up --build"

## Documentación disponible en
http://localhost:3000/api-docs