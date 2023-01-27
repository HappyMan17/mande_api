import express from "express";
import { addService, getAllServices, updateService, updateServiceStars, updateServiceState } from "../service/ServiceServices.js";

const router = express.Router();

/** 
 * Lista los servicios de la base
*/
router.get('/all', (req, res) => {
  getAllServices(res);
})

/** 
 * Lista los servicios de un determinado trabajo ofrecido
*/
router.get('/:job_offered_id', (req, res) => {
  getAllServicesByJobOfferedId(req, res);
})

/** 
 * Añade un servicio
*/
router.post('/add', (req, res) => {
  addService(req, res);
})

/** 
 * Actualiza la información de un servicio
*/
router.put('/update', (req, res) => {
  updateService(req, res);
})

/** 
 * Actualiza el estado de un servicio
*/
router.put('/status/:service_id/:status', (req, res) => {
  updateServiceState(req, res);
})

/** 
 * Actualiza las estrellas de un servicio
*/
router.put('/status/:service_id/:service_stars', (req, res) => {
  updateServiceStars(req, res);
})

export default router;