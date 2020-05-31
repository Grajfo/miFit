const express = require('express');
const router = express.Router();

const controller = require('../controller/ReceptController');

router.get('/', controller.vsiRecepti);
router.get('/:idRecept', controller.enRecept);
router.get('/poisciPoTipi/:tip', controller.poisciReceptePoTipu);
router.get('/poisciPoKategoriji/:kategorija', controller.poisciReceptePoKategoriji);
router.post('/', controller.dodajRecept);
router.put('/:idRecept', controller.posodobiRecept);
router.delete('/:idRecept', controller.izbrisiRecept);

module.exports = router;