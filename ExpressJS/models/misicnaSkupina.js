const ks = require('./knex_shelf');

const MisicnaSkupina = ks.Model.extend({
    tableName: 'MisicnaSkupina',
    idAttribute: 'id',
    vaja: function () {
    return this.hasMany(require('./vaja'), 'misicnaSkupina_id');
    }
   });

module.exports = MisicnaSkupina;