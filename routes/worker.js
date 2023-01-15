import express from "express";
import {getAllWorkers, addWorker, updateWorker, deleteWorker} from '../service/workerService.js'

const router = express.Router();

/**
 * Lista a todos los trabajadores
 */
router.get('/all', (req, res) => {
  getAllWorkers(res);
})

/**
 * Añade un nuevo trabajador
 */

router.post('/add', (req, res, next) => {
  addWorker(req, res);
})

/**
 * Actualiza un trabajador.
 */

router.put('/update', (req, res, next) => {
  updateWorker(req, res);
})

/**
 * Elimina un trabajador.
 */

router.put('/delete', (req, res, next) => {
  deleteWorker(res);
})

export default router;