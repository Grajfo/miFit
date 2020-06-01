const express = require('express');
const router = express.Router();


const controller = require('../controller/rezultatiControler');


router.get('/', controller.vsiRezultati);
router.get('/:idRezultati', controller.enRezultat);
router.get('/test/:id', controller.vsiRezultatiWhere);
router.post('/', controller.addRezultat);
router.put('/:idRezultati', controller.updateRezultat);
router.delete('/:idRezultati', controller.deleteRezultat);

module.exports = router;