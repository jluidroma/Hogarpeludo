import admin from 'firebase-admin';
import { usuario } from '../modelos/usuarioModelo.js';

// Crear usuario en Firebase + DB local
export const crearUsuario = async (req, res) => {
  const { uid, email, nombreCompleto, telefono, direccion, rol } = req.body;

  if (!uid || !email || !nombreCompleto || !rol) {
    return res.status(400).json({
      type: 'error',
      mensaje: 'Faltan campos obligatorios: uid, email, nombreCompleto, rol'
    });
  }

  try {
    // 1. Verificar si el UID ya existe en tu DB local
    const usuarioExistente = await usuario.findOne({ where: { uid } });
    if (usuarioExistente) {
      return res.status(400).json({
        type: 'error',
        mensaje: 'El usuario ya está registrado'
      });
    }
    await admin.auth().setCustomUserClaims(uid, { 
      role: rol 
    });
    // 2. Solo guardar en DB local (Firebase Auth ya hizo su parte)
    await usuario.create({
      uid,
      email,
      nombreCompleto,
      telefono: telefono || null,
      direccion: direccion || null,
      rol
    });

    res.status(201).json({
      type: 'success',
      mensaje: 'Usuario registrado exitosamente'
    });

  } catch (error) {
    console.error('Error en DB local:', error);
    res.status(500).json({
      type: 'error',
      mensaje: 'Error al guardar en DB local'
    });
  }
};

// Obtener todos los usuarios desde Firebase + local
export const listarUsuarios = async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers(1000);
    const usuarios = await usuario.findAll();

    const resultado = listUsersResult.users.map(user => {
      const localData = usuarios.find(u => u.uid === user.uid) || {};
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        customClaims: user.customClaims,
        disabled: user.disabled,
        ...localData?.dataValues,
      };
    });

    res.json(resultado);

  } catch (error) {
    console.error('Error listando usuarios:', error);
    res.status(500).json({ error: 'Error listando usuarios' });
  }
};

// Buscar usuario por UID
export const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const userRecord = await admin.auth().getUser(id);
    const usuarioLocal = await usuario.findByPk(id);

    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      phoneNumber: userRecord.phoneNumber,
      customClaims: userRecord.customClaims,
      disabled: userRecord.disabled,
      ...usuarioLocal?.dataValues,
    });
  } catch (error) {
    console.error('Error buscando usuario:', error);
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await admin.auth().deleteUser(id);
    await usuario.destroy({ where: { uid: id } });

    res.status(200).json({ 
      type: "success",
      mensaje: 'Usuario eliminado correctamente',
    });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ error: 'Error eliminando usuario' });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { email, displayName, phoneNumber, disabled, direccion, rol } = req.body;

  try {
    const userRecord = await admin.auth().updateUser(id, {
      email,
      displayName,
      phoneNumber,
      disabled,
    });

    await admin.auth().setCustomUserClaims(id, { role: rol });

    await usuario.update(
      { email, nombreCompleto: displayName, telefono: phoneNumber, direccion, rol },
      { where: { uid: id } }
    );

    res.status(200).json({
      type: "success",
      mensaje: 'usuario actualizado correctamente',
      usuario: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        phoneNumber: userRecord.phoneNumber,
        disabled: userRecord.disabled,
      },
    });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ error: 'Error actualizando usuario' });
  }
};
