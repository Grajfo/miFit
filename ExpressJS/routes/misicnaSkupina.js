const express = require('express');
const router = express.Router();
const controller = require('../controller/misicnaSkupinaController');

router.get('/', controller.vseMisicna);
router.post('/', controller.dodajMisicno);
router.delete('/:id', controller.izbrisiMisicno);
router.put('/:id', controller.posodobiMisicno);


module.exports = router;