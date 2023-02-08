import express from "express";
import {getAllWorkers, addWorker, updateWorker, deleteWorker, updateWorkerIsActive,getWorkerKey} from '../service/workerService.js'
import multer from "multer";

const storage = multer.diskStorage({
  destination: './uploads/worker/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname+'_'+req.body.email+'_'+req.body.phone_number+'.jpg');
  },
})

const upload = multer({storage: storage});
const router = express.Router();

/**
 * Lista a todos los trabajadores
 */
router.get('/all', (req, res) => {
  getAllWorkers(res);
})

router.get('/byKey/:email/:phone_number', (req, res) => {
  getWorkerKey(req, res);
})

/**
 * Añade un nuevo trabajador
 */
const files = upload.fields([{ name: 'profile_image' }, { name: 'identification_image' }]);
router.post('/add', files, (req, res, next) => {
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