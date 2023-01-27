import express from 'express';
import { getAllJobs, addJobOffered, updateJobOffered, deleteJobOffered, getJobsByWorkId } from '../service/jobOfferedService.js';

const router = express.Router();

/**
 * Lista los trabajos ofrecidos
 */
router.get('/all', (req, res) => {
  getAllJobs(res);
})

/**
 * Lista los trabajos de un work id determinado
 */
router.get('/:work_id', (req, res) => {
  getJobsByWorkId(req, res);
})

/**
 * Lista los trabajos ofrecidos de un trabajador
 */
router.get('/forWorker', (req, res) => {
  getJobOfferedByWorker(req, res);
})

/**
 * Añade un trabajo a la oferta
 */
router.post('/add', (req, res) => {
  addJobOffered(req, res);
})

/**
 * Actualiza la información de un trabajo
 */
router.put('/update', (req, res) => {
  updateJobOffered(req, res);
})

/**
 * Elimina un trabajo cambiando su is_active a false
 */
router.put('/delete/:job_offered_id', (req, res) => {
  deleteJobOffered(req, res);
})

export default router;