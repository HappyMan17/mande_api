import express from 'express';
import connect from './pool.js';
import {getAllUsers, addUser, updateUser, deleteUser} from "../service/userService";

const router = express.Router();

/**
 * Listar todos los usuarios
 */

router.get('/all', (req, res) => {
  getAllUsers(res);
})

/**
 * Añade un nuevo usuario
 */

router.post('/add', (req, res, next) => {
  addUser(res);
})

/**
 * Actualiza un usuario.
 */

router.put('/update', (req, res, next) => {
  updateUser(res);
})

/**
 * Elimina un usuario.
 */

router.put('/delete', (req, res, next) => {
  deleteUser(res);
})

export default router;