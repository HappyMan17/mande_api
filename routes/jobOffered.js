import express from 'express';
import { getAllJobs, addJobOffered, updateJobOffered, deleteJobOffered, getJobsByWorkId } from '../service/jobOfferedService.js';

const router = express.Router();

router.get('/all', (req, res) => {
  getAllJobs(res);
})

router.get('/:work_id', (req, res) => {
  getJobsByWorkId(req, res);
})

router.post('/add', (req, res) => {
  addJobOffered(req, res);
})

router.put('/update', (req, res) => {
  updateJobOffered(req, res);
})

router.put('/delete', (req, res) => {
  deleteJobOffered(req, res);
})

export default router;