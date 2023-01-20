import express from 'express';
import { getAllWorks, addWork, updateWork, deleteWork } from '../service/workService.js';

const router = express.Router();

/**
 * Listar todos los trabajos
 */

router.get('/all', (req, res) => {
  getAllWorks(res);
})

router.post('/add', (req, res) => {
  addWork(req, res);
})

router.put('/all', (req, res) => {
  updateWork(req, res);
})

router.put('/all', (req, res) => {
  deleteWork(req, res);
})

export default router;