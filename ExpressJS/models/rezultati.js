const ks = require('./knex_shelf');

const rezultati = ks.Model.extend({
    tableName: 'Rezultati',
    idAttribute: 'id',
    uporabnik: function () {
    return this.belongsTo(require('./uporabnik'), 'uporabnik_id');
    }
   });

module.exports = rezultati;