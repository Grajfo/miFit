const express = require('express');
const router = express.Router();

const controller = require('../controller/hranaController');

router.get('/', controller.vsaHrana);
router.get('/:idHrana', controller.enaHrana);
router.post('/', controller.dodajHrano);
router.put('/:idHrana', controller.posodobiHrano);
router.delete('/:idHrana', controller.izbrisiHrano);

module.exports = router;