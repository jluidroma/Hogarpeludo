import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener ruta absoluta del archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.join(__dirname, 'src', 'config', 'hogarpeludo-71903-firebase-adminsdk-fbsvc-5f40218be4.json');


// Leer y parsear el JSON manualmente
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// UID del usuario al que quieres asignar el rol
const uid = '92ssSzaRdDScJsRIkKCoPXsjGnD2'; 

admin.auth().setCustomUserClaims(uid, { role: 'admin' })
  .then(() => {
    console.log(`Rol 'admin' asignado correctamente al usuario con UID: ${uid}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error al asignar el rol:', error);
    process.exit(1);
  });
