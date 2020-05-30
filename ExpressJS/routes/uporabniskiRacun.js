const express = require('express');
const router = express.Router();


const controller = require('../controller/uporabniskiRacunController');


router.get('/', controller.vsiUporabniskiRacuni);
router.get('/:iduporabniskiRacun', controller.enUporabniskiRacun);
router.post('/preveri/', controller.aliobstaja);
router.post('/', controller.addUporabniskiRacun);
router.put('/:iduporabniskiRacun', controller.updateUporabniskiRacun);
router.delete('/:iduporabniskiRacun', controller.deleteUporabniskiRacun);

module.exports = router;