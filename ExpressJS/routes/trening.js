const express = require('express');
const router = express.Router();


const controller = require('../controller/treningController');

router.get('/', controller.vsiTreningi);
router.get('/:id', controller.enTrening);
router.post('/', controller.dodajTrening);
router.delete('/:id', controller.izbrisiTrening);
router.put('/:id', controller.posodobiTrening);



module.exports = router;