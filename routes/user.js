/** Esta es la ruta para User y todos sus derivados */

import express from 'express';
import {getAllUsers, addUser, updateUser, deleteUser, getUserByEmailAndPhoneNumber, uploadFile} from "../service/userService.js";
import multer from 'multer';

const upload = multer({dest:'uploads/'});
const router = express.Router();

/**
 * Listar todos los usuarios
 */
router.get('/all', (req, res) => {
  getAllUsers(res);
})

/**
 * Obtiene el usuario por email y número de telefono
 * la información llega de un .json
 */
router.get('/:email/:phone',(req, res) => {
  getUserByEmailAndPhoneNumber(req, res);
})

/**
 * Añade un nuevo usuario
 */
router.post('/add', (req, res, next) => {
  addUser(req,res);
})

/**
 * Actualiza un usuario.
 */
router.put('/update', (req, res, next) => {
  updateUser(req, res);
})

/**
 * Elimina un usuario.
 */
router.put('/delete', (req, res, next) => {
  deleteUser(req, res);
})

/**
 * Guarda un archivo
 */
router.post('/upload', upload.single('Image'), (req, res, next) => {
  uploadFile(req, res);
})

export default router;