const ks = require('./knex_shelf');

const Hrana = ks.Model.extend({
    tableName: 'Hrana',
    idAttribute: 'id',
});

module.exports = Hrana