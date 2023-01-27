import express from 'express';
import { getAllWorks, addWork, updateWork, deleteWork } from '../service/workService.js';

const router = express.Router();

/**
 * Listar todos los trabajos
 */
router.get('/all', (req, res) => {
  getAllWorks(res);
})

/**
 * Añade un trabajo
 */
router.post('/add', (req, res) => {
  addWork(req, res);
})

/**
 * Actualiza un trabajo
 */
router.put('/update', (req, res) => {
  updateWork(req, res);
})

/**
 * Elimina un trabajo
 */
router.put('/delete/:work_id', (req, res) => {
  deleteWork(req, res);
})

export default router;