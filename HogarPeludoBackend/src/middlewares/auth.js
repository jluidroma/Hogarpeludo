import admin from 'firebase-admin';

// Verifica si el token de Firebase es válido
export const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Aquí queda el uid y el rol en customClaims
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

// Verifica si el usuario autenticado tiene rol admin
export const verificarAdmin = (req, res, next) => {
  const role = req.user?.role || req.user?.customClaims?.role;
  if (role !== 'admin') {
    return res.status(403).json({ error: 'Se requiere rol admin' });
  }
  next();
};
