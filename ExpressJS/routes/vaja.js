const express = require('express');
const router = express.Router();

const controller = require('../controller/vajaController');


router.get('/', controller.vseVaje);
router.post('/', controller.dodajVajo);
router.delete('/:id', controller.izbrisiVajo);
router.put('/:id', controller.posodobiVajo);

module.exports = router;