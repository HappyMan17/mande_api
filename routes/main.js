/** Esta es la ruta principal */

import express from 'express';

const router = express.Router();

router.get('/',(req, res)=>{
    res.send('alo');
})

export default router;