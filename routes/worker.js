import express from "express";
import {getAllWorkers, addWorker, updateWorker, deleteWorker, getWorkerByEmailAndPhoneNumber, updateWorkerIsActive} from '../service/workerService.js'

const router = express.Router();

/**
 * Lista a todos los trabajadores
 */
router.get('/all', (req, res) => {
  getAllWorkers(res);
})

router.get('/worker/:email/:phone_number', (req, res) => {
  getWorkerByEmailAndPhoneNumber(req, res);
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
 * Actualiza el is_active de un trabajador.
 */
router.put('/:email/:phone_number/:is_active', (req, res, next) => {
  updateWorkerIsActive(req, res);
})

/**
 * Elimina un trabajador actualizando su is_active
 */
router.put('/delete', (req, res, next) => {
  deleteWorker(req,res);
})

export default router;