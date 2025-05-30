import admin from 'firebase-admin';

export const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
     console.log("token no proporcionado")
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  const token = authHeader.split(' ')[1];
  console.log('🔐 Token recibido:', token);

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('✅ Token decodificado:', decodedToken)
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

export const verificarAdmin = (req, res, next) => {
     console.log("verifica admin")
     console.log(req.user.role)
  if (req.user.role !== 'admin') {
     console.log("verifica admin 2")
    return res.status(403).json({ error: 'Se requiere rol admin' });
  }
  next();
};












