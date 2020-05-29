const ks = require('./knex_shelf');
const Uporabnik = require('../models/uporabnik');

const uporebniskiRacun = ks.Model.extend({
    tableName: 'UporabniskiRacun',
    idAttribute: 'id',
   });


module.exports = uporebniskiRacun;