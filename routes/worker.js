import express from "express";
import {getAllEmployees} from '../service/workerService.js'
import { Renderer2 } from "@angular/core";

const router = express.Router();

/**
 * Lista a todos los empleados
 */
router.get('/all', (req, res) => {
  getAllEmployees(res);
})

export default router;