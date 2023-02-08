import express from "express";
import getImages from "../service/imagesService.js";

const router = express.Router();

router.get('/:folder/:name', (req, res) => {
  getImages(req, res);
})

export default router;