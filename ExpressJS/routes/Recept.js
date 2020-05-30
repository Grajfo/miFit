const express = require('express');
const router = express.Router();

const controller = require('../controller/ReceptController');

router.get('/', controller.vsiRecepti);
router.get('/:idRecept', controller.enRecept);
router.get('/poisciKategorijo/:imeKategorije', controller.poisciReceptKategorija)
router.get('/poiscibyTip/:tip', controller.poisciReceptTip)
router.post('/', controller.dodajRecept);
router.put('/:idRecept', controller.posodobiRecept);
router.delete('/:idRecept', controller.izbrisiRecept);

module.exports = router;