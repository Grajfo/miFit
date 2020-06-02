const express = require('express');
const router = express.Router();

const controller = require('../controller/uporabnikController');

router.get('/', controller.vsiUporabniki);
router.get('/:idUporabnik', controller.enUporabnik);
router.get('/pridobi/:idUporabnik', controller.pridobigledeNaidracuna);
router.post('/', controller.dodajUporabnika);
router.put('/:idUporabnik', controller.posodobiUporabnika);
router.delete('/:idUporabnik', controller.izbrisiUporabnika);

module.exports = router;