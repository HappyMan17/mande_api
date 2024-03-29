import express from 'express';
import { getAllJobs, addJobOffered, updateJobOffered, deleteJobOffered, getJobsByJobOfferedId, getAllJobOfferedByWorker, getJobsByWorkId, getJobOfferedByWorker, updateSignedByJobOfferedId } from '../service/jobOfferedService.js';

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
 * Lista los trabajos ofrecidos por el job_offered_id */
router.get('/byJobOfferedId/:job_offered_id', (req, res) => {
  getJobsByJobOfferedId(req, res);
})

/**
 * Lista los trabajos ofrecidos de un trabajador
 */
router.get('/worker/:worker_email/:worker_phone', (req, res) => {
  getJobOfferedByWorker(req, res);
})


router.get('/allJobOffered/:worker_email/:worker_phone', (req, res) => {
  getAllJobOfferedByWorker(req, res);
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
 * Actualiza el signed de un trabajo
 */
router.put('/signed/:job_offered_id/:signed', (req, res) => {
  updateSignedByJobOfferedId(req, res);
})


/**
 * Elimina un trabajo cambiando su is_active a false
 */
router.put('/delete/:job_offered_id', (req, res) => {
  deleteJobOffered(req, res);
})

export default router;