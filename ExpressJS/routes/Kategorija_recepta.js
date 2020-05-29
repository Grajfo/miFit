const express = require('express');
const router = express.Router();

const controller = require('../controller/Kategorija_recepta');

router.get('/', controller.vsa_kategorija_recepta);
router.get('/:idKatergorija_recepta', controller.ena_kategorija_recepta);
router.post('/', controller.dodaj_Kategorija_recepta);
router.put('/:idKatergorija_recepta', controller.posodobi_Kategorija_recepta);
router.delete('/:idKatergorija_recepta', controller.izbrisi_kategorija_recepta);

module.exports = router;